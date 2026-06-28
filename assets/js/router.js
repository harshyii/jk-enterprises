/*==========================================================
 JK ENTERPRISES
 ROUTER
==========================================================*/

import { param } from "./utils.js";

import {

    renderHome,

    renderProduct,

    renderSearch,

    renderCart,

    renderCheckout,

    renderContact,

    renderTerms,

    renderReturns,

    renderSuccess,

    render404

} from "./ui.js";


/*==========================================================
 CURRENT ROUTE
==========================================================*/

export function currentRoute(){

    const url=new URL(location);

    if(url.hash){

        return url.hash.replace("#","");

    }

    if(param("id")){

        return "product";

    }

    if(param("search")){

        return "search";

    }

    return "home";

}


/*==========================================================
 ROUTER
==========================================================*/

export async function router(){

    const route = currentRoute();

    switch(route){

        case "home":
            renderHome();
            break;

        case "product":
            renderProduct(param("id"));
            break;

        case "search":
            renderSearch(param("search"));
            break;

        case "cart":
            renderCart();
            break;

        case "checkout":
            renderCheckout();
            break;

        case "contact":
            renderContact();
            break;

        case "terms":
            renderTerms();
            break;

        case "returns":
            renderReturns();
            break;

        case "success":
            renderSuccess();
            break;

        default:
            render404();

    }

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/*==========================================================
 NAVIGATE
==========================================================*/

export function navigate(route=""){

    if(route==="home"){

        history.pushState(

            {},

            "",

            "./"

        );

    }

    else{

        location.hash=route;

    }

}


/*==========================================================
 PRODUCT PAGE
==========================================================*/

export function product(id){

    history.pushState(

        {},

        "",

        "?id="+id

    );

    router();

}


/*==========================================================
 SEARCH
==========================================================*/

export function search(keyword){

    history.pushState(

        {},

        "",

        "?search="+

        encodeURIComponent(keyword)

    );

    router();

}


/*==========================================================
 EVENTS
==========================================================*/

window.addEventListener(

    "hashchange",

    router

);

window.addEventListener(

    "popstate",

    router

);

export default router;