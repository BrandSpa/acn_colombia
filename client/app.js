"use strict";
import "babel-polyfill";
import WebFont from "webfontloader";
import multipleRender from "react-multiple-render";
import qs from "qs";

//React components :)
import ContactForm from "./components/contactForm";
import HeaderSlider from "./components/headerSlider";
import sectionVideo from "./components/sectionVideo";
import sectionVideoContent from "./components/sectionVideoContent";
import Projects from "./components/projects";
import ProjectsInfo from "./components/projectsInfo";
import Accordion from "./components/accordion";
import Posts from "./components/posts";
import Donate from "./components/donate/single";
import DonateInline from "./components/donate/inline";
import DonateInlineSection from "./components/donate/inline_section";
import DonateSection from "./components/donate/section";
import CampaignsSlider from "./components/campaignsSlider";
import DownloadPdf from "./components/downloadPdf";
import GalleryHeader from "./components/galleryHeader";
import ProjectsAbout from "./components/projectsAbout";
import VideoHeader from "./components/videoHeader";
import Carousel from "./components/carousel";

//jquery stuff :(
import setMenu from "./lib/set_menu";
import setMenuMobile from "./lib/set_menu_mobile";
import donateRedirect from "./lib/donate_redirect";
import smoothScroll from "./lib/smoothScroll";
import scrollViaCrucisNav from "./lib/scrollViaCrucisNav";
import toggleViaCrucisNav from "./lib/toggleViaCrucisNav";
import toggleMenu from "./lib/toggleMenu";
import stickyMenu from "./lib/stickMenu";

WebFont.load({
  google: {families: ["Source Sans Pro:400,600,700"]},
  custom: {families: ["Ionicons"], testStrings: {Ionicons: "\uf10c\uf109"}},
  fontinactive: (familyName, fvd) => {
    console.error(familyName + " failed to load");
  }
});

//react renders
multipleRender(HeaderSlider, ".header-slider");
multipleRender(ContactForm, ".contact-form");
multipleRender(Posts, ".bs-posts");
multipleRender(Donate, ".bs-donate-react");
multipleRender(DonateInline, ".bs-donate-inline");
multipleRender(DonateInlineSection, ".bs-donate-inline-section");
multipleRender(DonateSection, ".bs-donate-section");
multipleRender(Projects, ".projects-container");
multipleRender(ProjectsInfo, ".bs-projects-info");
multipleRender(Accordion, ".bs-accordion", );
multipleRender(sectionVideo, ".section-video");
multipleRender(sectionVideoContent, ".section-video-content");
multipleRender(CampaignsSlider, ".bs-campaings-slider", );
multipleRender(DownloadPdf, ".bs-download-pdf");
multipleRender(GalleryHeader, ".bs-gallery-header");
multipleRender(ProjectsAbout, ".bs-projects-about");
multipleRender(VideoHeader, ".bs-video-header");
multipleRender(Carousel, ".bs-carousel");

//jquery calls
setMenu();
setMenuMobile();
donateRedirect();
smoothScroll();
toggleViaCrucisNav();
scrollViaCrucisNav();
stickyMenu();
toggleMenu();
let cookies = {};

document.cookie.split(";").forEach(function(l) {
  cookies[l.split("=")[0].trim()] = l.split("=")[1];
});

if(document.querySelector(".bs-donate")) {
  document.querySelector(".bs-donate").addEventListener("click", () => {
   _dp("track", "donate_click");
    console.log("click", _dp);
  });
}
