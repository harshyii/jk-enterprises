/*==========================================================
 JK Enterprises
 sw.js
 Version : 1.0
 Service Worker
==========================================================*/

"use strict";

/*==========================================================
 Cache
==========================================================*/

const CACHE_VERSION="jk-v1";

const STATIC_CACHE=`${CACHE_VERSION}-static`;

const DYNAMIC_CACHE=`${CACHE_VERSION}-dynamic`;


const BASE="/jk-enterprises";

const STATIC_FILES=[

BASE + "/",
BASE + "/index.html",
BASE + "/about.html",
BASE + "/contact.html",
BASE + "/products.html",
BASE + "/product.html",
BASE + "/brands.html",
BASE + "/brand.html",
BASE + "/blogs.html",
BASE + "/blog.html",
BASE + "/cart.html",
BASE + "/checkout.html",
BASE + "/search.html",
BASE + "/faq.html",
BASE + "/privacy.html",
BASE + "/returns.html",
BASE + "/shipping.html",
BASE + "/terms.html",
BASE + "/404.html",

BASE + "/assets/css/app.css",

BASE + "/assets/js/app.js",

BASE + "/assets/images/icons/logo.svg",

BASE + "/manifest.json"

];
/*==========================================================
 Install
==========================================================*/

self.addEventListener(

"install",

event=>{

event.waitUntil(

caches.open(STATIC_CACHE)

.then(cache=>cache.addAll(STATIC_FILES))

);

self.skipWaiting();

}

);


/*==========================================================
 Activate
==========================================================*/

self.addEventListener(

"activate",

event=>{

event.waitUntil(

caches.keys()

.then(keys=>Promise.all(

keys

.filter(

key=>!key.startsWith(CACHE_VERSION)

)

.map(

key=>caches.delete(key)

)

))

);

self.clients.claim();

}

);


/*==========================================================
 Fetch
==========================================================*/

self.addEventListener(

"fetch",

event=>{

if(event.request.method!=="GET") return;

event.respondWith(

caches.match(event.request)

.then(cache=>{

if(cache)

return cache;

return fetch(event.request)

.then(response=>{

if(

!response||

response.status!==200||

response.type!=="basic"

)

return response;

const copy=response.clone();

caches.open(DYNAMIC_CACHE)

.then(cache=>{

cache.put(

event.request,

copy

);

});

return response;

})

.catch(()=>{

return caches.match(

"/404.html"

);

});

})

);

}

);


/*==========================================================
 Messages
==========================================================*/

self.addEventListener(

"message",

event=>{

if(

event.data==="skipWaiting"

)

self.skipWaiting();

});