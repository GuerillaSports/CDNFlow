(function(){"use strict";function n(t){const o=getComputedStyle(t).getPropertyValue("--blue"),e=t.querySelector(".title-on-color");if(e&&e.style.color==="white"){const i=t.querySelector(".title-blue");i.style.color=o}}const r={articles:!0};function c(t){const o=t.split("/"),e=o[o.length-1];return r[e]&&console.log("page requires scoped functions!",e),r[e]}document.addEventListener("DOMContentLoaded",function(){console.log("[gs-cdnflow]: managing title color contrast...");const t=document.querySelectorAll(".card-label");for(let e of t)n(e);const o=document.URL;c(o)&&console.log("[gs-cdnflow]: page requires scoped functions")});const l=document.querySelector(".dynam-list"),s={childList:!0,subtree:!0};new MutationObserver(t=>{for(let o of t)if(o.addedNodes.length)for(let e of o.addedNodes)console.log("[gs-cdnflow]: MutationObeserver detected new content. Managing title color contrast..."),n(e)}).observe(l,s)})();
