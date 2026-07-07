/*==========================================================
 JK Enterprises
 analytics.js
 Version : 1.0
 Google Analytics 4
==========================================================*/

"use strict";

import CONFIG from "./config.js";

const Analytics={

/*==========================================================
 Initialize
==========================================================*/

init(){

    if(

        !CONFIG.ANALYTICS.ENABLED||

        typeof window.gtag!=="function"

    )

        return;

    this.pageView();

},



/*==========================================================
 Send Event
==========================================================*/

event(name,params={}){

    if(

        !CONFIG.ANALYTICS.ENABLED||

        typeof window.gtag!=="function"

    )

        return;

    window.gtag(

        "event",

        name,

        params

    );

},



/*==========================================================
 Page View
==========================================================*/

pageView(){

    this.event(

        "page_view",

        {

            page_title:document.title,

            page_location:location.href,

            page_path:location.pathname

        }

    );

},



/*==========================================================
 Search
==========================================================*/

search(query){

    this.event(

        "search",

        {

            search_term:query

        }

    );

},



/*==========================================================
 Product View
==========================================================*/

viewProduct(product){

    this.event(

        "view_item",

        {

            currency:CONFIG.CURRENCY,

            value:Number(product.price)||0,

            items:[{

                item_id:product.id,

                item_name:product.name,

                item_brand:product.brand,

                item_category:product.category,

                price:Number(product.price)||0

            }]

        }

    );

},



/*==========================================================
 Product List
==========================================================*/

viewList(name,products=[]){

    this.event(

        "view_item_list",

        {

            item_list_name:name,

            items:products.map(p=>({

                item_id:p.id,

                item_name:p.name,

                price:Number(p.price)||0

            }))

        }

    );

},



/*==========================================================
 Add To Cart
==========================================================*/

addToCart(product,qty=1){

    this.event(

        "add_to_cart",

        {

            currency:CONFIG.CURRENCY,

            value:

            Number(product.price)*qty,

            items:[{

                item_id:product.id,

                item_name:product.name,

                quantity:qty,

                price:Number(product.price)

            }]

        }

    );

},



/*==========================================================
 Remove From Cart
==========================================================*/

removeFromCart(product){

    this.event(

        "remove_from_cart",

        {

            currency:CONFIG.CURRENCY,

            value:Number(product.price),

            items:[{

                item_id:product.id,

                item_name:product.name,

                price:Number(product.price)

            }]

        }

    );

},



/*==========================================================
 Begin Checkout
==========================================================*/

beginCheckout(cart){

    this.event(

        "begin_checkout",

        {

            currency:CONFIG.CURRENCY,

            value:cart.total,

            items:cart.items

        }

    );

},



/*==========================================================
 Purchase
==========================================================*/

purchase(order){

    this.event(

        "purchase",

        {

            transaction_id:

            order.id,

            currency:

            CONFIG.CURRENCY,

            value:

            order.total,

            items:

            order.items

        }

    );

},



/*==========================================================
 Blog View
==========================================================*/

viewBlog(article){

    this.event(

        "view_blog",

        {

            article_id:article.id,

            article_title:article.title

        }

    );

},



/*==========================================================
 Brand View
==========================================================*/

viewBrand(brand){

    this.event(

        "view_brand",

        {

            brand_name:brand.name

        }

    );

},



/*==========================================================
 Contact
==========================================================*/

contact(){

    this.event(

        "contact"

    );

},



/*==========================================================
 Share
==========================================================*/

share(type,id){

    this.event(

        "share",

        {

            content_type:type,

            item_id:id

        }

    );

},



/*==========================================================
 File Download
==========================================================*/

download(file){

    this.event(

        "file_download",

        {

            file_name:file

        }

    );

},



/*==========================================================
 Exception
==========================================================*/

error(message){

    this.event(

        "exception",

        {

            description:message,

            fatal:false

        }

    );

}

};

export default Analytics;