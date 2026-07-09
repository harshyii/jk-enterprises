/*==========================================================
 JK Enterprises
 app.js
 Version : 2.0
 Application Bootstrap
==========================================================*/

"use strict";

/*==========================================================
 IMPORTS
==========================================================*/

import Router from "./router.js";
import SEO from "./seo.js";

import Product from "./product.js";
import Blog from "./blog.js";
import Brand from "./brand.js";
import Cart from "./cart.js";
import Home from "./home.js";

import Checkout from "./checkout.js";
import Search from "./search.js";


/*==========================================================
 APPLICATION
==========================================================*/

const App = {

    /*======================================================
     Initialize
    ======================================================*/

    async init(){

        try{

            document.documentElement.classList.remove("no-js");

            this.events();

            // Initialize cart globally
            Cart.init();
        Cart.render();

            // Load current page
            await this.page();
            await Home.init();

            // Initialize SEO
            SEO.init();

            console.log("JK Enterprises Loaded");

        }

        catch(error){

            console.error(error);

        }

    },



    /*======================================================
     Current Page
    ======================================================*/

    async page(){

        if(Router.isProducts()){

            await Product.catalog();

            return;

        }

        if(Router.isProduct()){

            await Product.details();

            return;

        }

        if(Router.isBlogs()){

            if(typeof Blog.catalog==="function")

                await Blog.catalog();

            return;

        }

        if(Router.isBlog()){

            if(typeof Blog.details==="function")

                await Blog.details();

            return;

        }

        if(Router.isBrands()){

    if(typeof Brand.list==="function")

        await Brand.list();

    return;

}

        if(Router.isBrand()){

            if(typeof Brand.details==="function")

                await Brand.details();

            return;

        }

        if(Router.isSearch()){

            if(typeof Search.init==="function")

                await Search.init();

            return;

        }

        if(Router.isCart()){

            if(typeof Cart.init==="function")

                await Cart.init();
        Cart.render();

            return;

        }

        if(Router.isCheckout()){

            if(typeof Checkout.init==="function")

                await Checkout.init();

            return;

        }

    },



    /*======================================================
     Global Events
    ======================================================*/

    events(){

        window.addEventListener("online",()=>{

            console.log("Online");

        });

        window.addEventListener("offline",()=>{

            console.log("Offline");

        });

        document.addEventListener("visibilitychange",()=>{

            if(document.hidden) return;

        });

        window.addEventListener("resize",()=>{});

        window.addEventListener("scroll",()=>{});

    }

};



/*==========================================================
 DOM READY
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>App.init()

);



/*==========================================================
 SERVICE WORKER
==========================================================*/

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        const base = location.pathname.startsWith("/jk-enterprises/")
            ? "/jk-enterprises/"
            : "/";

        navigator.serviceWorker

            .register(base + "assets/js/sw.js")

            .then(reg=>{

                console.log("Service Worker registered",reg);

            })

            .catch(err=>{

                console.error(err);

            });

    });

    /*======================================================
 Auto Close Mobile Menu
======================================================*/

document.addEventListener("click",(e)=>{

    const nav = document.getElementById("mainNav");

    const button = document.querySelector(".navbar-toggler");

    if(
        !nav ||
        !button ||
        !nav.classList.contains("show")
    ) return;

    if(
        nav.contains(e.target) ||
        button.contains(e.target)
    ) return;

    bootstrap.Collapse
        .getOrCreateInstance(nav)
        .hide();

});

document
.querySelectorAll("#mainNav .nav-link")
.forEach(link=>{

    link.addEventListener("click",()=>{

        const nav = document.getElementById("mainNav");

        if(
            nav &&
            nav.classList.contains("show")
        ){

            bootstrap.Collapse
                .getOrCreateInstance(nav)
                .hide();

        }

    });

});

}



export default App;