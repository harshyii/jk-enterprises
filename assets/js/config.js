/*==========================================================
 JK Enterprises
 config.js
 Version : 1.0
 Global Configuration
==========================================================*/

"use strict";

/*==========================================================
 Configuration
==========================================================*/

const CONFIG = Object.freeze({

    /*======================================================
     Website
    ======================================================*/

    SITE_NAME: "JK Enterprises",

    SITE_URL: "https://harshyii.github.io/jk-enterprises",

    SITE_DESCRIPTION:
        "Power Tools, Hand Tools, Solar Products, Industrial Equipment and Automotive Care Products.",

    VERSION: "1.0.0",

    LANGUAGE: "en-IN",

    CURRENCY: "INR",

    CURRENCY_SYMBOL: "₹",



    /*======================================================
     Google Apps Script
    ======================================================*/

    API: {

        BASE_URL: "https://script.google.com/macros/s/AKfycbx-t8FunfbShlU2CSHn0h4-BGax_s4HCVXALG5OaIRy1XAZfNP9OifTUBKyyU_1kpM/exec",

        TIMEOUT: 15000

    },



    /*======================================================
     Sheets Actions
    ======================================================*/

    ACTIONS: {

        HOMEPAGE:"homepage",

        PRODUCTS: "products",

        PRODUCT: "product",

        BRANDS: "brands",

        BRAND: "brand",

        BLOGS: "blogs",

        BLOG: "blog",

        SEARCH: "search",

        ORDER: "order",

        SETTINGS: "settings"

    },


    /*======================================================
     Pagination
    ======================================================*/

    PAGINATION: {

        PRODUCTS: 24,

        BLOGS: 12,

        BRANDS: 20,

        SEARCH: 24

    },



    /*======================================================
     Storage Keys
    ======================================================*/

    STORAGE: {

        CART: "jk_cart",

        WISHLIST: "jk_wishlist",

        RECENT: "jk_recent",

        SETTINGS: "jk_settings",

        CACHE: "jk_cache"

    },



    /*======================================================
     Images
    ======================================================*/

    IMAGES: {

        PRODUCT:

        "assets/images/products/no-image.webp",

        BLOG:

        "assets/images/blogs/no-image.webp",

        BRAND:

        "assets/images/brands/no-image.webp",

        AVATAR:

        "assets/images/icons/user.svg"

    },



    /*======================================================
     Company
    ======================================================*/

    COMPANY: {

        NAME: "JK Enterprises",

        EMAIL: "jkpehowa24@gmail.com",

        PHONE: "+919050623210",

        ADDRESS: "Pehowa, Kurukshetra, Haryana, India"

    },



    /*======================================================
     Social
    ======================================================*/

    SOCIAL: {

        FACEBOOK: "",

        INSTAGRAM: "",

        YOUTUBE: "",

        LINKEDIN: "",

        WHATSAPP: ""

    },



    /*======================================================
     Analytics
    ======================================================*/

    ANALYTICS: {

        GA4: "",

        ENABLED: false

    },



    /*======================================================
     SEO
    ======================================================*/

    SEO: {

        DEFAULT_IMAGE:

        "assets/images/og-image.jpg",

        TITLE_SEPARATOR: " | ",

        ROBOTS: "index,follow"

    },



    /*======================================================
     Theme
    ======================================================*/

    THEME: {

        COLOR: "#0d6efd",

        DEFAULT: "light"

    },



    /*======================================================
     Checkout
    ======================================================*/

    CHECKOUT: {

        MIN_ORDER: 0,

        SHIPPING: 0,

        COD_CHARGE: 0,

        TAX: 0

    },



    /*======================================================
     Cache
    ======================================================*/

    CACHE: {

        PRODUCTS: 300,

        BLOGS: 900,

        BRANDS: 1800,

        SETTINGS: 3600

    },

    /*======================================================
     Homepage
    ======================================================*/

    HOME_SHEET: "Home"
    
});





/*==========================================================
 Export
==========================================================*/

export default CONFIG;

