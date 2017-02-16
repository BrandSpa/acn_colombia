<?php

function bs_accordion_sc($atts, $content = null) {
	$attributes = [
		'content_acc' => ''
	];

  $at = shortcode_atts( $attributes , $atts );
	$props = [
		'content' => $at['content_acc']
	];
	
  ob_start();
?>

<div
	class="bs-accordion" 
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_accordion', 'bs_accordion_sc' );
add_action( 'vc_before_init', 'bs_accordion_vc' );

  function bs_accordion_vc() {
		$params = [
			[
        "type" => "textarea_html",
        "heading" => "Content",
        "param_name" => "content_acc",
        "value" => ''
			]
		];

  	vc_map(
      array(
        "name" =>  "BS Accordion",
        "base" => "bs_accordion",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

