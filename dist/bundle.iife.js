(function(){"use strict";const m=getComputedStyle(document.body).getPropertyValue("--blue");getComputedStyle(document.body).getPropertyValue("--pink");function u(t){if(!t)return;const e=t.querySelectorAll(".title-on-color"),o=t.querySelectorAll(".title-blue");e.length!==o.length&&console.warn("[gs-cdnflow/global]: SHOUD NOT HAPPEN! number of on_color and title-blue are different");for(let n=0;n<Math.max(e.length,o.length);n++){const r=e[n],c=o[n];y(c,r)}}function y(t,e){!t||!e||e.style.color==="white"&&(t.style.color=m)}function h(){console.log("[gs-cdnflow/global]: managing title color contrast...");const t=document.querySelectorAll(".card-label");for(let e of t)u(e)}function _(){console.log("[gs-cdnflow/global]: set navbar active icon");const t=document.querySelector(".navbar__link-block.w--current");if(!t)return;const e={filled:t.querySelector(".navbar__icon--filled"),outlined:t.querySelector(".navbar__icon--outline")};!e.filled||!e.outlined||(console.log("[gs-cdnflow/global]: setting active icon"),e.filled.classList.remove("hidden"),e.outlined.classList.add("hidden"))}function b(t){let e=document.querySelectorAll(".story-titles__custom");if(t){const o=t.querySelector(".story-titles__custom");if(!o)return;s(o);return}for(let o of e)o&&s(o)}function s(t){console.log("[gs-cdnflow/global]: formatting custom story title");const e=t.dataset.customTitle;if(!e)return;const o=t.querySelector(".title-blue"),n=t.querySelector(".title-outline"),r=e;if(!o||!n)return;if(!r.includes(" ")){n.textContent="",o.textContent=r;return}const c=r.split(" "),l={b:c.splice(0,c.length/2+1).join(" "),o:c.join(" ")};if(!l.o||!l.b){console.warn("[gs-cdnflow/global]: error formatting custom title: ",o.textContent);return}o.textContent=l.b,n.textContent=l.o}function w(){const t=document.querySelector(".dynam-list");if(!t)return;const e={childList:!0,subtree:!0};new MutationObserver(n=>{for(let r of n)if(r.addedNodes.length)for(let c of r.addedNodes)console.log("[gs-cdnflow/global]: MutationObeserver detected new content. Managing..."),c&&(s(c),u(c))}).observe(t,e)}const f={DOMContentLoaded:{manage_custom_story_title_instances:b,manageColorContrast:h,setNavBarActiveIcon:_},load:{mange_dynamic_list_content:w}};function p(t){function e(o,n){if(o&&o[n])for(let r in o[n])o[n][r]()}document.addEventListener("DOMContentLoaded",function(){e(f,"DOMContentLoaded"),e(t,"DOMContentLoaded")}),window.addEventListener("load",function(){e(f,"load"),e(t,"load")})}function C(){console.log("[gs-cdnflow/articles]: check sub featured header");const t=!!document.querySelector(".cl-top-articles-list"),e=document.querySelector(".articles__top-stories--header");e&&(t||(e.style.display="none"))}const v={DOMContentLoaded:{checkSubFeaturedHeader:C}};function S(){console.log("[gs-cdnflow/home]: Aggregating homepage content...");const t=x();if(t instanceof Error){console.warn("[gs-cdnflow/home]: Error filtering featured content: ",t.message);return}console.log("[gs-cdnflow/home]: filtered featured content");let e=q(t);if(e instanceof Error){console.warn("[gs-cdnflow/home]: Error removing featured content from body: ",e.message);return}if(console.log("[gs-cdnflow/home]: removed extra featured content from body"),e=D(),e instanceof Error){console.warn("[gs-cdnflow/home]: Error error grouping body content: ",e.message);return}console.log("[gs-cdnflow/home]: organized body content by date. Success.")}function E(t){let e=null;return t.classList.forEach(o=>{o&&o.includes("home__feat--")&&(e=o.split("--")[1])}),e||new Error("Error: failed to parse content type from class list")}function q(t){const e=document.querySelector(`.home__content--${t}`);if(!e||e.children.length<=1)return new Error("Error cleaning up featured content from body: list could not be found.");const o=e.children;e.removeChild(o[0])}function x(){const t=document.querySelectorAll(".home__feat");if(t.length<=1)return new Error("Error: Home Feat is either not an array or is an array of less then 2 elements.");let e=0;const o=new Map;for(let r of t){const c=r.querySelector(".date-feat");if(!c||!c.textContent)return new Error("Error: no date element found in parent: either null or empty");const l=new Date(c.textContent).valueOf();e=Math.max(l,e),o.set(l,r),r.classList.add("hidden")}const n=o.get(e);return n?(n.classList.remove("hidden"),E(n)):new Error("Error: failed to select newest element from map")}function D(){const t=document.querySelector(".home__content--videos"),e=document.querySelector(".home__content--articles"),o=document.querySelector(".home__content--podcasts");if(!t||!e||!o)return new Error("Error: failed to find videos, articles, or podcasts list");const n=[...t.children,...e.children,...o.children],r=document.querySelector(".home__content");n.sort((c,l)=>{const a=c.querySelector(".date"),d=l.querySelector(".date");if(!a||!d||!a.textContent||!d.textContent)return 0;const O=new Date(a.textContent).valueOf();return new Date(d.textContent).valueOf()-O});for(let c of n)r==null||r.appendChild(c)}const L={DOMContentLoaded:{aggregateHomeContent:S}},g=window.location.pathname.split("/")[1];let i={};switch(g){case"articles":i=v;break;case"":i=L;break;default:console.log(`[gs-cdnflow]: no local functions to execute on page ${g}...`)}p(i)})();
