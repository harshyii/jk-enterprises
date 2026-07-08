/*==========================================================
 JK Enterprises
 api.js
 Version : 1.0
 Google Apps Script API
==========================================================*/

"use strict";

import CONFIG from "./config.js";
import Utils from "./utils.js";

const API = {

    /*======================================================
     Base Request
    ======================================================*/

    async request(action="",params={}){

        try{

            const url=new URL(CONFIG.API.BASE_URL);

            url.searchParams.set(

                "action",

                action

            );

            Object.entries(params).forEach(

                ([key,value])=>

                url.searchParams.set(key,value)

            );

            const response=await fetch(

                url,

                {

                    method:"GET",

                    cache:"force-cache"

                }

            );

            if(!response.ok)

                throw new Error(

                    `HTTP ${response.status}`

                );

            return await response.json();

        }

        catch(error){

            console.error(

                "[API]",

                error

            );

            return{

                success:false,

                message:error.message,

                data:null

            };

        }

    },



    /*======================================================
     Products
    ======================================================*/

    products(params={}){

        return this.request(

            CONFIG.ACTIONS.PRODUCTS,

            params

        );

    },



    product(id){

        return this.request(

            CONFIG.ACTIONS.PRODUCT,

            {id}

        );

    },



    /*======================================================
     Brands
    ======================================================*/

    brands(){

        return this.request(

            CONFIG.ACTIONS.BRANDS

        );

    },



    brand(id){

        return this.request(

            CONFIG.ACTIONS.BRAND,

            {id}

        );

    },



    /*======================================================
     Blogs
    ======================================================*/

    blogs(params={}){

        return this.request(

            CONFIG.ACTIONS.BLOGS,

            params

        );

    },



    blog(id){

        return this.request(

            CONFIG.ACTIONS.BLOG,

            {id}

        );

    },



    /*======================================================
     Search
    ======================================================*/

    search(query="",page=1){

        return this.request(

            CONFIG.ACTIONS.SEARCH,

            {

                q:query,

                page

            }

        );

    },



    /*======================================================
     Settings
    ======================================================*/

    settings(){

        return this.request(

            CONFIG.ACTIONS.SETTINGS

        );

    },



    /*======================================================
 Order Submit
======================================================*/

async order(data={}){

    try{

        const response = await fetch(

            CONFIG.API.BASE_URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    action:CONFIG.ACTIONS.ORDER,

                    order:data

                })

            }

        );

        if(!response.ok)

            throw new Error(

                `HTTP ${response.status}`

            );

        return await response.json();

    }

    catch(error){

        console.error(

            "[ORDER]",

            error

        );

        return{

            success:false,

            message:error.message

        };

    }

},

    /*======================================================
     Ping
    ======================================================*/

    ping(){

        return this.request("ping");

    },
    
    /*======================================================
    Homepage
    ======================================================*/

    homepage(){

        return this.request(

            "homepage"

        );

    }

};

export default API;