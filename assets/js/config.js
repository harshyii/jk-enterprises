/*==========================================================
 JK ENTERPRISES
 CONFIGURATION
 Version : 1.0.0
==========================================================*/

export const CONFIG = Object.freeze({

    /*======================================================
      APP
    ======================================================*/

    APP:{

        NAME:"JK Enterprises",

        VERSION:"1.0.0",

        AUTHOR:"JK Enterprises"

    },



    /*======================================================
      GOOGLE APPS SCRIPT
    ======================================================*/

    API:{

        BASE_URL:
        "https://script.google.com/macros/s/AKfycbzKJQU1gSkIAO_3psCrtrFq9pKziVOdhBe93XOdpT-y7ydTFfwvtzjzey-EXUWxvY-6/exec",

        TIMEOUT:15000

    },



    /*======================================================
      CACHE
    ======================================================*/

    CACHE:{

        PRODUCTS:"jk_products",

        PRODUCTS_TIME:"jk_products_time",

        SETTINGS:"jk_settings",

        SETTINGS_TIME:"jk_settings_time",

        EXPIRE:21600000

    },



    /*======================================================
      LOCAL STORAGE
    ======================================================*/

    STORAGE:{

        CART:"jk_cart",

        USER:"jk_user",

        RECENT:"jk_recent",

        SEARCH:"jk_search"

    },



    /*======================================================
      COMPANY
    ======================================================*/

    COMPANY:{

        NAME:"JK Enterprises",

        PHONE:"",

        WHATSAPP:"",

        EMAIL:"",

        ADDRESS:"Panipat, Haryana",

        GST:""

    },



    /*======================================================
      CURRENCY
    ======================================================*/

    MONEY:{

        SYMBOL:"₹",

        LOCALE:"en-IN"

    },



    /*======================================================
      PRODUCT
    ======================================================*/

    PRODUCT:{

        PAGE_SIZE:24,

        SEARCH_LIMIT:8,

        RELATED_LIMIT:8,

        FEATURED_LIMIT:12,

        NEW_LIMIT:12

    },



    /*======================================================
      IMAGE
    ======================================================*/

    IMAGE:{

        PLACEHOLDER:
        "assets/images/no-image.webp",

        HERO:
        "assets/images/hero.webp"

    },



    /*======================================================
      ROUTES
    ======================================================*/

    ROUTE:{

        HOME:"",

        PRODUCT:"product",

        SEARCH:"search",

        CART:"cart",

        CHECKOUT:"checkout",

        SUCCESS:"success",

        CONTACT:"contact",

        TERMS:"terms",

        RETURNS:"returns"

    },



    /*======================================================
      PAYMENT
    ======================================================*/

    PAYMENT:{

        MODE:"UPI",

        QR_IMAGE:
        "assets/images/upi-qr.webp"

    },



    /*======================================================
      ORDER
    ======================================================*/

    ORDER:{

        PREFIX:"JK",

        STATUS:"Pending"

    }

});



/*==========================================================
 APPLICATION STATE
==========================================================*/

export const APP = {

    products:[],

    filtered:[],

    cart:[],

    categories:[],

    brands:[],

    current:null,

    settings:{},

    route:"",

    loading:true

};



/*==========================================================
 FREEZE HELPERS
==========================================================*/

export const ACTION = Object.freeze({

    PRODUCTS:"products",

    PRODUCT:"product",

    ORDER:"order",

    SETTINGS:"settings"

});



/*==========================================================
 EVENTS
==========================================================*/

export const EVENT = Object.freeze({

    CART_UPDATED:"cart-updated",

    PRODUCTS_LOADED:"products-loaded",

    ROUTE_CHANGED:"route-changed"

});



/*==========================================================
 DEFAULT EXPORT
==========================================================*/

export default CONFIG;

