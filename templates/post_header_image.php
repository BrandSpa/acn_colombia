<?php 
	$style = "background-image: url(" . get_the_post_thumbnail_url($post->ID, 'full') . ");"; 
?>

	<div class="bs-post__header--image" style="<?php echo $style ?>">
		<div class="l-wrap">
			<div class="bs-post__header--image__title">
				<h2><?php the_title() ?></h2>
			</div>
		</div>
	</div>
