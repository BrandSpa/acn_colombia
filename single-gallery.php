<?php
/**
 * Template Name: Gallery Header
 *
 * @package WordPress
 * @since acn_int 1.0
 */

?>

<?php get_header() ?>

<div id="acn_int" class="bs-post--gallery" >

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php
$images = get_post_meta($post->ID, 'type_gallery_images_key', true);
$excerpts = get_post_meta($post->ID, 'type_gallery_excerpts_key', true);
$props = ["images" => $images, "excerpts" => $excerpts];
?>

<div class="bs-gallery-header" data-props='<?php echo cleanQuote(json_encode($props)) ?>'></div>

<div class="l-wrap">
	<div class="breadcrumbs" style="margin-top: 20px; text-align: center; color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
    <?php if(function_exists('bcn_display'))
    {
        bcn_display();
    }?>
</div>

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
