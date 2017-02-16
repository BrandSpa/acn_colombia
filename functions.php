<?php
/*
 * BrandSpa (http://brandspa.com)
 * Alejandro Sanabria <alejandro@brandspa.com>
 * Copyright 2016 BrandSpa
 */
 
register_nav_menus(
  array(
    'header' => __('Header nav'),
  )
);

function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1', true); 
		wp_enqueue_script('jquery');
	}
}

add_action('init', 'modify_jquery');
//libs
require('lib/clean_menu.php');
//apis
require('apis/index.php');
//shortcodes
require('shortcodes/contact_form.php');
require('shortcodes/header_slider.php');
require('shortcodes/projects.php');
require('shortcodes/section_video.php');
