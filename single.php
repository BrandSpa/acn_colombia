<?php get_header() ?>

<div id="acn_int" class="bs-post" >
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		
<?php if(get_the_post_thumbnail_url($post->ID, 'full')): ?>
	<?php require('templates/post_header_image.php') ?>
<?php else: ?>
	<?php require('templates/post_header.php') ?>
<?php endif; ?>

	<div class="l-wrap">
		<div class="bs-post__content col-8-l col-12-s">
			<?php the_content() ?>
		</div>
	</div>
	<div class="l-wrap">
		<?php require('templates/post_latest.php') ?>
	</div>
  <?php endwhile; else : ?>
    <h2> <?php echo gett('404') ?> </h2>
  <?php endif; ?>
</div>

<?php get_footer() ?>
