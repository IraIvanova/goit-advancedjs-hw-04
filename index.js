import{a as b,S as v,i as a}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const L="57978423-e1008c624701cdcff1b93f2bb",S="https://pixabay.com/api/",w=15;async function d(r,t=1){const n={key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:w,page:t};return(await b.get(S,{params:n})).data}const u=document.querySelector(".loader"),m=document.querySelector(".gallery"),f=document.querySelector(".load-more-btn"),P=({webformatURL:r,largeImageURL:t,tags:n,likes:s,views:e,comments:o,downloads:i})=>`<li class="gallery-item">
      <div class="gallery-img">
        <a class="gallery-link" href="${t}">
          <img class="gallery-image"
               src="${r}"
               alt="${n}" />
        </a>
      </div>
      <div class="gallery-img-info">
        <div>
          <b>Likes</b>
          <span>${s}</span>
        </div>
        <div>
          <b>Views</b>
          <span>${e}</span>
        </div>
        <div>
          <b>Comments</b>
          <span>${o}</span>
        </div>
        <div>
          <b>Downloads</b>
          <span>${i}</span>
        </div>
      </div>
    </li>`,M=new v(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function p(r){const t=r.map(P).join("");m.insertAdjacentHTML("beforeend",t),M.refresh()}function q(){m.innerHTML=""}function y(){u.classList.add("is-visible")}function g(){u.classList.remove("is-visible")}function $(){f.classList.remove("is-hidden")}function E(){f.classList.add("is-hidden")}let c="",l=1;const h=document.querySelector(".form"),B=document.querySelector(".load-more-btn");h.addEventListener("submit",I);B.addEventListener("click",O);async function I(r){if(r.preventDefault(),c=h.elements["search-text"].value.trim(),c.length===0){a.error({title:"Error",message:"Query can not be empty!",position:"center"});return}q(),y();try{const t=await d(c,l);if(t.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}p(t.hits),$()}catch(t){a.error({message:`Something went wrong: ${t.message}`,position:"topRight"})}finally{g()}}async function O(){y();try{const r=await d(c,l+1);l+=1,p(r.hits),x()}catch{E(),a.error({message:"We're sorry, but you've reached the end of search results.",position:"center"})}finally{g()}}function x(){const r=document.querySelector(".gallery-item");if(r.length===0)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
