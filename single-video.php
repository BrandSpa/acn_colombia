<?php get_header() ?>

<div id="acn_int" class="bs-post--video" >
<!--video template-->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php if(get_post_meta($post->ID, 'video_url_key', true)): ?>

<?php echo do_shortcode('[bs_section_video image="'. get_post_thumbnail_id($post->ID, 'full')  .'" video_url="'.get_post_meta($post->ID, 'video_url_key', true).'"]') ?>

	<!--<iframe class="video__header" src="<?php echo get_post_meta($post->ID, 'video_url_key', true) ?>?modestbranding=1&autohide=1&showinfo=0&controls=0" width="100%" frameborder="0"></iframe>-->
	<div class="l-wrap" style="height: 0">

	<div class="video__header-title" style="background: #fff; text-align: center; min-height: 100px; float: left; width: 100%">
		<span class="metadata"><?php echo get_the_date( 'MM YYYY', $post->ID ); ?></span>
		<div class="breadcrumbs" style="margin-top: 20px; text-align: center; color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php if(function_exists('bcn_display'))
    {
        bcn_display();
    }?>
</div>
		<h3 style="padding-bottom: 20px;"><?php the_title() ?></h3>
		<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
			<?php require(__DIR__. '/templates/down_arrow.php')?>
		</a>
	</div>

</div>

	<script>
	onLoad(function() {
		var h = window.innerHeight;
		var navH = $('.nav').height() + 20;
		var titleH = $('.video__header-title').height();
		$('.video__header').height((h - navH));
		$('.video__header-title').css({position: 'relative', top: '-' + titleH + 'px'});
	})
	</script>
<?php endif; ?>

<div class="l-wrap">
		<div class="bs-post__content col-8-l col-12-s" id="post-content">
			<?php the_content() ?>
		</div>
	</div>

	<?php require('templates/post_donate.php') ?>

	<div class="l-wrap" style="margin: 40px auto">
		<h3 style="font-size: 28px; font-weight: normal; display: block; margin: 40px 0;color: #3C515F"><?php echo gett('Latest news'); ?></h3>
		<?php require('templates/post_latest.php') ?>
	</div>

  <?php endwhile; else : ?>
    <h2> <?php echo gett('404') ?> </h2>
  <?php endif; ?>
</div>

<?php get_footer() ?>
