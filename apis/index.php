<?php
header('Access-Control-Allow-Origin: *');
$main_dir = str_replace('apis', '', __DIR__);
include_once $main_dir . '/lib/countries.php';
include_once $main_dir . '/lib/offices_countries.php';
// include_once $main_dir . '/lib/country_lang.php';
include_once $main_dir . '/lib/get_geoip.php';
include_once $main_dir . '/lib/location.php';
include_once 'mailchimp.php';
include_once 'stripe.php';
include_once 'infusion.php';
include_once 'posts.php';
include_once 'cl.php';

function responseJson($res = []) {
  header('Content-type: application/json');  
  echo json_encode($res);
}

/**
** API
** endpoint base: wp-admin/admin-ajax.php
**/

/**
** action: update_geo
**/
add_action( 'wp_ajax_nopriv_update_geo', 'update_geo' );
add_action( 'wp_ajax_update_geo', 'update_geo' );

function update_geo() {
  $res = geoip_db(); 
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_office_countries', 'office_countries' );
add_action( 'wp_ajax_office_countries', 'office_countries' );

function office_countries() {
  $res = getOfficesCountries(); 
  responseJson($res);
  die();
}

/**
** endpoint
** action: get_posts
**/
add_action( 'wp_ajax_nopriv_get_posts', 'wp_get_posts' );
add_action( 'wp_ajax_get_posts', 'wp_get_posts' );

function wp_get_posts() {
  $paged = $_POST['paged'];
  $post_type = isset($_POST['post_type']) ? $_POST['post_type'] : array('video','gallery','featured','post');//'post';
  $category = isset($_POST['post_category']) ? $_POST['post_category'] : '';
  $perpage = isset($_POST['post_perpage']) ? $_POST['post_perpage'] : '6';

  $res = bs_get_posts($post_type, $paged, $category, $perpage);
  responseJson($res);
  die();
}

/**
** action: get_menu
**/
add_action( 'wp_ajax_nopriv_get_menu', 'wp_get_menu' );
add_action( 'wp_ajax_get_menu', 'wp_get_menu' );

function wp_get_menu() {
  $name = $_POST['name'];
  $res = wp_get_nav_menu_items($name);
  responseJson($res);
  die();
}

/**
** action: donate_redirect
**/
add_action( 'wp_ajax_nopriv_donate_redirect', 'donate_redirect' );
add_action( 'wp_ajax_donate_redirect', 'donate_redirect' );

function donate_redirect() {
  $country = getCountry();
  
  if(in_array($country, getOfficesCountries())) {
    $res = get_option('donate_url_'. str_replace(' ', '_', $country));
  } else {
    $res = '#donate';
  }

  responseJson($res);
  die();
}

// mailchimp_subscribe
add_action( 'wp_ajax_nopriv_mailchimp_subscribe', 'mailchimp_subscribe' );
add_action( 'wp_ajax_mailchimp_subscribe', 'mailchimp_subscribe' );

function mailchimp_subscribe() {
  $data = json_encode($_POST['data']);
  $listId = get_option('mailchimp_list_id');
  $apiKey = get_option('mailchimp_api');
  $res = mc_subscribe($data, $listId, $apiKey);
  echo $res;
  die();
}

add_action( 'wp_ajax_nopriv_stripe_token', 'stripe_token' );
add_action( 'wp_ajax_stripe_token', 'stripe_token' );

function stripe_token() {
  $card = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = stripe_create_token( $apiKey, $card);
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_get_plan', 'get_plan' );
add_action( 'wp_ajax_stripe_get_plan', 'get_plan' );

function get_plan() {
  $card = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = stripe_get_plan($apiKey, 'donation-2');
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_charge', 'stripe_charge' );
add_action( 'wp_ajax_stripe_charge', 'stripe_charge' );

function stripe_charge() {
  $data = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = array('donation_type fail');

  if($data['donation_type'] == 'monthly') {
    $res = stripe_monthly($apiKey, $data);
  }
  
  if($data['donation_type'] == 'once') {
    $res = stripe_once($apiKey, $data);
  }
  
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_update_plan', 'stripe_plan' );
add_action( 'wp_ajax_stripe_update_plan', 'stripe_plan' );

function stripe_plan() {
  $data = $_POST['data'];
  $api_key =  get_option('stripe_key_private');

  $res = stripe_update_plan($api_key, $data);
  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_convertloop_contact', 'convertloop_contact' );
add_action( 'wp_ajax_convertloop_contact', 'convertloop_contact' );

function convertloop_contact() {
  $data = $_POST['data'];
  $data['add_tags'][] = 'SPANISH';
  $data['country'] = 'Colombia';
  $appId = get_option('convertloop_app_default');
  $apiKey = get_option('convertloop_api_default');

  $res = cl_create_person($appId, $apiKey, $data);
  header('Content-type: application/json');  
  echo $res;
  die();
}

add_action( 'wp_ajax_nopriv_convertloop_event', 'convertloop_event' );
add_action( 'wp_ajax_convertloop_event', 'convertloop_event' );

function convertloop_event() {
  $data = $_POST['data'];
  $appId = get_option('convertloop_app_default');
  $apiKey = get_option('convertloop_api_default');
  header('Content-type: application/json');  
  echo cl_create_event($appId, $apiKey, $data);
  die();
}

add_action( 'wp_ajax_nopriv_infusion_contact', 'infusion_contact' );
add_action( 'wp_ajax_infusion_contact', 'infusion_contact' );

function infusion_contact() {
  $data = $_POST['data'];
  $lang = getCountryLang($data['country']);
  $tagLangs = $lang == 'es' ? ['874'] : ['876'];

  try {
    $key = get_option('infusionsoft_key');
    $subdomain = get_option('infusionsoft_subdomain');
    $tags = get_option('infusionsoft_tags') ? explode(',', str_replace(' ', '', get_option('infusionsoft_tags') )) : [];
    $data['tags'] = array_merge($tags, $tagLangs, $data['tags']);
    $res = infusion_createContact($subdomain, $key, $data);
    responseJson(["success" => $res, "data" => $data]);
  } catch(Exception $e) {
    responseJson(['error' => $e]);
  }

  die();
}

add_action( 'wp_ajax_nopriv_countries', 'countries' );
add_action( 'wp_ajax_countries', 'countries' );

function countries() {
  $res = getCountries();
  header('Access-Control-Allow-Origin: *');
  header('Content-type: application/json');  
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_location', 'location' );
add_action( 'wp_ajax_location', 'location' );

function location() {
  $res = get_user_location();
  header('Content-type: application/json');  
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_user_location', 'user_location' );
add_action( 'wp_ajax_user_location', 'user_location' );

function user_location() {
  $res = get_user_location();
  header('Content-type: application/json');  
  echo json_encode($res);
  die();
}
