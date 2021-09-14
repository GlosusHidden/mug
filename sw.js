const staticCacheName="static-cache-v1",imageCacheName="image-cache-v1",dynamicCacheName="dynamic-cache-v1",staticAssets=["./","./index.html","./style.css","./icon.png","./image-placeholder.png","./favicon.ico","./index.min.js","./manifest.json"];async function networkFirst(e){const a=await caches.open(dynamicCacheName);try{const t=await fetch(e);return await a.put(e,t.clone()),t}catch(t){return a.match(e)}}async function imageCache(e){const a=await caches.open(imageCacheName),t=await a.match(e);if(t)return t;try{const t=await fetch(e);return await a.put(e,t.clone()),t}catch(a){console.error(`Failed to fetch ${e.url}`)}}async function cacheFirst(e){return await caches.match(e)||checkOnline(e)}async function checkOnline(e){try{return await fetch(e)}catch(a){console.error(`Failed to fetch ${e.url}`)}}self.addEventListener("install",(async()=>{const e=await caches.open(staticCacheName);await e.addAll(staticAssets),console.log("Service worker has been installed")})),self.addEventListener("activate",(async()=>{const e=(await caches.keys()).map((async e=>{[staticCacheName].includes(e)||await caches.delete(e)}));await Promise.all(e),console.log("Service worker has been activated")})),self.addEventListener("fetch",(e=>{"image"===e.request.destination&&e.request.url.includes("userapi.com")?e.respondWith(imageCache(e.request)):e.request.url.includes("api.vk.com/method/")?e.respondWith(networkFirst(e.request)):e.respondWith(cacheFirst(e.request))}));