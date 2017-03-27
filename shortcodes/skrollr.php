<?php
/**
** 	
**/

add_shortcode( 'bs_skrollr', 'bs_skrollr_sc' );

function bs_skrollr_sc($atts, $content = null) {
	$attributes = [
		'titulo1' => '',
		'titulo2' => '',
        'titulo3' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>


<div class="skrollr_container">
    <?php foreach($at as $titulo){ ?>
        <h1><?php echo($titulo)?></h1><br />
    }

</div>

<script>
	onload(function() {
		//jquery stuff iría acá

	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_example_vc' );

  function bs_example_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "Title1",
        "param_name" => "titulo1",
        "value" => ''
			],
      [
        "type" => "textfield",
        "heading" => "Title2",
        "param_name" => "titulo2",
        "value" => ''
			],
			[
        "type" => "textfield",
        "heading" => "Title3",
        "param_name" => "titulo3",
        "value" => ''
      ]
		];

  	vc_map(
      array(
        "name" =>  "BS Skrollr",
        "base" => "bs_skrollr",
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

