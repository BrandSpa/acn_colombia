'use strict';
//get sass file and compiled to css
import './scss/index.scss';
import 'babel-polyfill';
import WebFont from 'webfontloader';
import multipleRender from 'react-multiple-render';
//React components :)
import ContactForm from './components/contactForm';
import HeaderSlider from './components/headerSlider';
import sectionVideo from './components/sectionVideo';
import Projects from './components/projects';
import Accordion from './components/accordion';
import Posts from './components/posts';
import Donate from './components/donate';
import CampaignsSlider from './components/campaignsSlider';
import DownloadPdf from './components/downloadPdf';
import GalleryHeader from './components/galleryHeader';
import ProjectsAbout from './components/projectsAbout';
//jquery stuff :(
import setMenu from './lib/set_menu';
import setMenuMobile from './lib/set_menu_mobile';
import donateRedirect from './lib/donate_redirect';
import smoothScroll from './lib/smoothScroll';
import scrollViaCrucisNav from './lib/scrollViaCrucisNav';
import toggleViaCrucisNav from './lib/toggleViaCrucisNav';
import toggleMenu from './lib/toggleMenu';
import stickyMenu from './lib/stickMenu';

WebFont.load({
  google: {families: ['Source Sans Pro:400,600,700']},
  custom: {families: ['Ionicons'], testStrings: {Ionicons: '\uf10c\uf109'}},
  fontinactive: (familyName, fvd) => {
    console.error(familyName + ' failed to load');
  }
});

//react renders
multipleRender(HeaderSlider, '.header-slider');
multipleRender(ContactForm, '.contact-form');
multipleRender(Posts, '.bs-posts');
multipleRender(Donate, '.bs-donate-react');
multipleRender(Projects, '.projects-container');
multipleRender(Accordion, '.bs-accordion', );
multipleRender(sectionVideo, '.section-video');
multipleRender(CampaignsSlider, '.bs-campaings-slider', );
multipleRender(DownloadPdf, '.bs-download-pdf');
multipleRender(GalleryHeader, '.bs-gallery-header');
multipleRender(ProjectsAbout, '.bs-projects-about');

//jquery calls
setMenu();
setMenuMobile();
donateRedirect();
smoothScroll();
toggleViaCrucisNav();
scrollViaCrucisNav();
stickyMenu();
toggleMenu();