<?php

function bs_accordion_sc($atts, $content = null) {
	$attributes = [
		'content' => '',
    'btn_title' => '',
    'background' => '#687f87',
    'btn_title_color' => '#fff'
  ];

  $at = shortcode_atts( $attributes , $atts );

	$props = [
		'content' => $content,
    'btnTitle' => $at['btn_title'],
    'background' => $at['background'],
    'titleColor' => $at['btn_title_color']
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
        "param_name" => "content",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Title",
        "param_name" => "btn_title",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Background",
        "param_name" => "background",
        "value" => '#687f87'
			],
      [
        "type" => "textfield",
        "heading" => "Title color",
        "param_name" => 'btn_title_color',
        "value" => '#fff'
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

