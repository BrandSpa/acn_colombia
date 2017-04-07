<?php
add_shortcode( 'bs_modal_gallery', 'bs_modal_gallery_sc' );

function bs_example_sc($atts, $content = null) {
	$attributes = [
    'images' => ''
  ];

  $at = shortcode_atts( $attributes , $atts );

  ob_start();
?>

<!-- Place somewhere in the <body> of your page -->
<div class="flexslider">
  <ul class="slides">
		<?php foreach(explode(',', $at['images']) as $image): ?>
		 <li>
     	 <img src="<?php echo wp_get_attachment_url($image)  ?>" />
    </li>
		<?php
		endforeach;
		?>
  </ul>
</div>

<script>
	onLoad(function() {
		//jquery stuff iría acá
		 $('.flexslider').flexslider();
	});
</script>
<?php

  return ob_get_clean();
}


add_action( 'vc_before_init', 'bs_modal_gallery_vc' );

  function bs_modal_gallery_vc() {
		$params = [

			[
        "type" => "attach_images",
        "heading" => "Images",
        "param_name" => "images",
        "value" => ''
			],
 
		];

  	vc_map(
      array(
        "name" =>  "BS Modal_gallery",
        "base" => "bs_modal_gallery",// igual a add_shortcode( 'bs_flexslider', 'bs_example_sc' );
        "category" =>  "BS",
        "params" => $params
      ) 
    );
  }

