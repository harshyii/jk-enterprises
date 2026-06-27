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

    const route=currentRoute();

    switch(route){

        case "home":

            return renderHome();

        case "product":

            return renderProduct(

                param("id")

            );

        case "search":

            return renderSearch(

                param("search")

            );

        case "cart":

            return renderCart();

        case "checkout":

            return renderCheckout();

        case "contact":

            return renderContact();

        case "terms":

            return renderTerms();

        case "returns":

            return renderReturns();

        case "success":

            return renderSuccess();

        default:

            return render404();

    }

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