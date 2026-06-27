/*==========================================================
 JK ENTERPRISES
 APPLICATION ENTRY
==========================================================*/

import { initializeProducts } from "./api.js";
import router from "./router.js";
import {
    initializeUI,
    renderFeatured,
    renderLatest
} from "./ui.js";

import {

    loader,

    toast

} from "./utils.js";


/*==========================================================
 APPLICATION
==========================================================*/

class JKStore{

    constructor(){

        this.ready=false;

    }

    async start(){

        try{

            loader(true);

            console.log(

                "Loading JK Enterprises..."

            );

            /*----------------------------------
              Products
            -----------------------------------*/

            await initializeProducts();

            /*----------------------------------
              Router
            -----------------------------------*/

            await router();

            /*----------------------------------
              Homepage Sections
            -----------------------------------*/

            renderFeatured();

            renderLatest();

            /*----------------------------------
              UI
            -----------------------------------*/

            initializeUI();

            this.ready=true;

            console.log(

                "Application Ready"

            );

        }

        catch(error){

            console.error(error);

            toast(

                "Unable to load website."

            );

        }

        finally{

            loader(false);

        }

    }

}


/*==========================================================
 INSTANCE
==========================================================*/

const app=new JKStore();


/*==========================================================
 DOM READY
==========================================================*/

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        app.start();

    }

);


/*==========================================================
 NETWORK
==========================================================*/

window.addEventListener(

    "online",

    ()=>{

        toast(

            "Internet Connected"

        );

    }

);


window.addEventListener(

    "offline",

    ()=>{

        toast(

            "Internet Disconnected"

        );

    }

);


/*==========================================================
 CART EVENTS
==========================================================*/

document.addEventListener(

    "cart-updated",

    ()=>{

        initializeUI();

    }

);


/*==========================================================
 GLOBAL ERROR
==========================================================*/

window.addEventListener(

    "error",

    event=>{

        console.error(

            event.error

        );

    }

);


/*==========================================================
 UNHANDLED PROMISES
==========================================================*/

window.addEventListener(

    "unhandledrejection",

    event=>{

        console.error(

            event.reason

        );

    }

);


export default app;
