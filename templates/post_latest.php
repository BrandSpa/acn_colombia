<?php
	$args = array( 'posts_per_page' => 4, 'exclude' => $post->ID );
  $recent_posts = get_posts( $args );
?>

<?php foreach($recent_posts as $recent): ?>
<div class="bs-post__recent">
	<?php if(get_the_post_thumbnail_url($recent->ID, 'full')): ?>
		<img src="<?php echo get_the_post_thumbnail_url($recent->ID, 'full') ?>" />
	<?php endif; ?>

	<div class="bs-post__recent__content">
		<h4><?php echo substr($recent->post_title, 0, 40) ?>...</h4>
		<p><?php echo substr(wp_strip_all_tags($recent->post_content), 0, 80) ?>...</p>
		<a href="<?php echo get_permalink($recent->ID) ?>"><?php echo gett('Read more')?>...</a>
	</div>
</div>
<?php endforeach; ?>
<div class="l-wrap" style="text-align:center">
 <a href="<?php echo gett('https://acninternational.org/news/') ?>" class='btn bs-see-more' > <?php echo gett('See more') ?> </a>
 </div>
