import{a as S,S as M,i as c}from"./assets/vendor-C1DvvBV_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const P="57978423-e1008c624701cdcff1b93f2bb",q="https://pixabay.com/api/",d=15;async function u(e,r=1){const s={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:d,page:r};return(await S.get(q,{params:s})).data}const m=document.querySelector(".loader"),f=document.querySelector(".gallery"),y=document.querySelector(".load-more-btn"),E=({webformatURL:e,largeImageURL:r,tags:s,likes:n,views:t,comments:o,downloads:i})=>`<li class="gallery-item">
      <div class="gallery-img">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image"
               src="${e}"
               alt="${s}" />
        </a>
      </div>
      <div class="gallery-img-info">
        <div>
          <b>Likes</b>
          <span>${n}</span>
        </div>
        <div>
          <b>Views</b>
          <span>${t}</span>
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
    </li>`,$=new M(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});function p(e){const r=e.map(E).join("");f.insertAdjacentHTML("beforeend",r),$.refresh()}function B(){f.innerHTML=""}function g(){m.classList.add("is-visible")}function h(){m.classList.remove("is-visible")}function I(){y.classList.add("is-visible")}function b(){y.classList.remove("is-visible")}let l="",a=1;const v=document.querySelector(".form"),O=document.querySelector(".load-more-btn");v.addEventListener("submit",x);O.addEventListener("click",A);async function x(e){e.preventDefault();const r=v.elements["search-text"].value.trim();if(r.length===0){c.error({title:"Error",message:"Query can not be empty!",position:"center"});return}l=r,a=1,B(),g(),b();try{const s=await u(l,a);if(s.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}p(s.hits),L(s.totalHits)}catch(s){w(s)}finally{h()}}async function A(){g();try{const e=await u(l,a+1);a+=1,p(e.hits),G(),L(e.totalHits)}catch(e){w(e)}finally{h()}}function L(e){d*a>=e?(b(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"center"})):I()}function G(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}function w(e){c.error({message:`Something went wrong: ${e.message}`,position:"center"})}
//# sourceMappingURL=index.js.map
