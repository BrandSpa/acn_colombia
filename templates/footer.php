<div class="learn-more">
	<a class="learn-more-link" href="#learnmore">LEARN MORE ABOUT AID TO THE CHURCH IN NEED</a>
</div>

<div class="bs-about">
	<div class="col-3-l bs-about__left">
		<img width="76" height="103" src="//acninternational.org/wp-content/uploads/2016/11/logoACNwhy2.png" class="vc_single_image-img attachment-full" alt="logoacnwhy2">
	</div>
	<div class="col-9-l bs-about__right">
		<h3><?php echo gett('ABOUT US') ?></h3>
		<p><?php echo gett('Founded in 1947 as a Catholic aid organization for war refugees and recognized as a papal foundation since 2011, ACN is dedicated to the service of Christians around the world, through information, prayer and action, wherever they are persecuted or oppressed or suffering material need. ACN supports every year an average of 6000 projects in close to 150 countries, thanks to private donations, as the foundation receives no public funding.') ?></p>
	</div>

</div>

<div class="bs-footer">
	<div class="bs-footer__left col-3-l">
		<img width="86" height="86" src="//acninternational.org/wp-content/uploads/2017/02/pope.png" class="vc_single_image-img attachment-medium" alt="pope">
			<p><?php echo gett('“I invite you all, together with ACN, to do everywhere in the world, a work of mercy.”'); ?></p>
			<img width="122" height="23" src="//acninternational.org/wp-content/uploads/2017/02/SignPope.png" class="vc_single_image-img attachment-thumbnail" alt="signpope">
	</div>
	<div class="bs-footer__right col-9-l">
		<div class="bs-footer__right--top">
			<ul class="bs-footer__menu">
				<?php
					$args = array(
						'theme_location' => 'footer',
						'container' => false,
						'echo' => false
					);

					$menu = wp_nav_menu( $args);
					echo clean_menu($menu);
				?>
			</ul>
		</div>
		<div class="bs-footer__right--bottom">
		<div>
			<h5>Contact</h5>
			<h6>ACN International</h6>
			<h6>Aid to the Church in Need gGmbH</h6>
			<h6>Westerbachstraße 23</h6>
			<h6>61476 Kronberg</h6>
			<h6>Ph.: +49-6174-291-0</h6>
		</div>
		<div>
			<?php echo do_shortcode('[bs_contact_info]') ?>
		</div>
		<div>
			<h6><a href="#">PRIVACY POLICY</a></h6>
			<h6><a href="#">TERMS & CONDITIONS</a></h6>
			<h6><a href="#">KPMG</a></h6>
		</div>

		</div>
	</div>
	<div class="bs-footer__bottom--top">
		<h6><?php echo gett('ACN – Aid to the Church in Need gGmbH, HRB 8446 is non-profit organization officially registered in Germany and audited internationally by KPMG.') ?></h6>
	</div>
	<div class="bs-footer__bottom--bottom">
			<img width="173" height="84" src="//acninternational.org/wp-content/uploads/2016/11/llaves-4.png" class="vc_single_image-img attachment-full" alt="llaves">
	</div>
</div>
