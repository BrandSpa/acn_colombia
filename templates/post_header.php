<!--<div class="l-wrap">
	<div class="bs-post__header col-12-l">
		<div class="bs-post__header__title col-10-l col-12-s">
			<h2><?php //the_title() ?></h2>
		</div>
	</div>
</div>-->

<div class="l-wrap">
		<div class="video__header-title">
			<span class="video__header__metadata" style="font-size: 1.1em; color: #4A4A4A">
				<?php foreach(get_the_category($post->ID) as $ind => $category): ?>
					<span style="font-weight: 600">
						<?php echo $category->name ?> <?php echo $ind >= 0 && $ind + 1 != count(get_the_category($post->ID)) ?  '|' : '' ?>
					</span>
				<?php endforeach; ?>
				<?php echo '/ ' . get_the_date( 'm - Y', $post->ID ); ?>
			</span>
			<div class="breadcrumbs" style="margin: 3px 0 10px 0;  color: #b9b9b9" typeof="BreadcrumbList" vocab="https://schema.org/">
			<?php if(function_exists('bcn_display')) { bcn_display(); }?>
		</div>

		<h3 style="padding-bottom: 10px;color: #3C515F"><?php the_title() ?></h3>
		<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
			<?php require(__DIR__. '/templates/down_arrow.php')?>
		</a>
	</div>