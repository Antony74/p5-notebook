/*! coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, licensed under MIT */let e=!1;"undefined"==typeof window?(self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",e=>e.waitUntil(self.clients.claim())),self.addEventListener("message",r=>{r.data&&("deregister"===r.data.type?self.registration.unregister().then(()=>self.clients.matchAll()).then(e=>{e.forEach(e=>e.navigate(e.url))}):"coepCredentialless"===r.data.type&&(e=r.data.value))}),self.addEventListener("fetch",function(r){let t=r.request;if("only-if-cached"===t.cache&&"same-origin"!==t.mode)return;let s=e&&"no-cors"===t.mode?new Request(t,{credentials:"omit"}):t;r.respondWith(fetch(s).then(r=>{if(0===r.status)return r;let t=new Headers(r.headers);return t.set("Cross-Origin-Embedder-Policy",e?"credentialless":"require-corp"),e||t.set("Cross-Origin-Resource-Policy","cross-origin"),t.set("Cross-Origin-Opener-Policy","same-origin"),new Response(r.body,{status:r.status,statusText:r.statusText,headers:t})}).catch(e=>console.error(e)))})):(()=>{// You can customize the behavior of this script through a global `coi` variable.
let e={shouldRegister:()=>!0,shouldDeregister:()=>!1,coepCredentialless:()=>!(window.chrome||window.netscape),doReload:()=>window.location.reload(),quiet:!1,...window.coi},r=navigator;// If we're already coi: do nothing. Perhaps it's due to this script doing its job, or COOP/COEP are
// already set from the origin server. Also if the browser has no notion of crossOriginIsolated, just give up here.
if(r.serviceWorker&&r.serviceWorker.controller&&(r.serviceWorker.controller.postMessage({type:"coepCredentialless",value:e.coepCredentialless()}),e.shouldDeregister()&&r.serviceWorker.controller.postMessage({type:"deregister"})),!1===window.crossOriginIsolated&&e.shouldRegister()){if(!window.isSecureContext){e.quiet||console.log("COOP/COEP Service Worker not registered, a secure context is required.");return}// In some environments (e.g. Chrome incognito mode) this won't be available
r.serviceWorker&&r.serviceWorker.register(window.document.currentScript.src).then(t=>{e.quiet||console.log("COOP/COEP Service Worker registered",t.scope),t.addEventListener("updatefound",()=>{e.quiet||console.log("Reloading page to make use of updated COOP/COEP Service Worker."),e.doReload()}),t.active&&!r.serviceWorker.controller&&(e.quiet||console.log("Reloading page to make use of COOP/COEP Service Worker."),e.doReload())},r=>{e.quiet||console.error("COOP/COEP Service Worker failed to register:",r)})}})();//# sourceMappingURL=fractal-curves.dac0849f.js.map

//# sourceMappingURL=fractal-curves.dac0849f.js.map