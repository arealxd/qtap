if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),a={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>a[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/images/android-chrome-192x192.png",revision:"a9b31e2a4904eee2e30a9d7de4c77543"},{url:"assets/images/android-chrome-512x512.png",revision:"a82afbf196e985f60249270c85597c1a"},{url:"manifest.webmanifest",revision:"d41e0bea5e9e8933f311badddb848aab"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
