/*==========================================================
 JK Enterprises
 seo.js
 Version : 1.0
 SEO Manager
==========================================================*/

"use strict";

import CONFIG from "./config.js";

const SEO={

/*==========================================================
 Initialize
==========================================================*/

init(data={}){

    this.title(

        data.title ||

        CONFIG.SITE_NAME

    );



    this.description(

        data.description ||

        CONFIG.SITE_DESCRIPTION

    );



    this.canonical(

        data.url ||

        window.location.href

    );



    this.image(

        data.image ||

        CONFIG.SEO.DEFAULT_IMAGE

    );



    this.robots(

        data.robots ||

        CONFIG.SEO.ROBOTS

    );

},

/*==========================================================
 Title
==========================================================*/

title(text){

    document.title=text;

},

/*==========================================================
 Description
==========================================================*/

description(text){

    this.meta(

        "description",

        text

    );

},

/*==========================================================
 Keywords
==========================================================*/

keywords(text){

    this.meta(

        "keywords",

        text

    );

},

/*==========================================================
 Robots
==========================================================*/

robots(value){

    this.meta(

        "robots",

        value

    );

},

/*==========================================================
 Canonical
==========================================================*/

canonical(url){

    let link=

    document.querySelector(

        'link[rel="canonical"]'

    );



    if(!link){

        link=document.createElement("link");

        link.rel="canonical";

        document.head.appendChild(link);

    }



    link.href=url;

},

/*==========================================================
 Open Graph
==========================================================*/

image(src){

    this.property(

        "og:image",

        src

    );



    this.property(

        "twitter:image",

        src

    );

},

siteName(){

    this.property(

        "og:site_name",

        CONFIG.SITE_NAME

    );

},

type(type="website"){

    this.property(

        "og:type",

        type

    );

},

url(url){

    this.property(

        "og:url",

        url

    );

},

/*==========================================================
 Meta Helpers
==========================================================*/

meta(name,content){

    let tag=

    document.querySelector(

        `meta[name="${name}"]`

    );



    if(!tag){

        tag=document.createElement(

            "meta"

        );

        tag.name=name;

        document.head.appendChild(tag);

    }



    tag.content=content;

},

property(name,content){

    let tag=

    document.querySelector(

        `meta[property="${name}"]`

    );



    if(!tag){

        tag=document.createElement(

            "meta"

        );



        tag.setAttribute(

            "property",

            name

        );



        document.head.appendChild(tag);

    }



    tag.content=content;

},

/*==========================================================
 JSON-LD
==========================================================*/

json(data){

    let tag=

    document.getElementById(

        "structured-data"

    );



    if(tag)

        tag.remove();



    tag=document.createElement(

        "script"

    );



    tag.id="structured-data";



    tag.type=

    "application/ld+json";



    tag.text=

    JSON.stringify(

        data,

        null,

        2

    );



    document.head.appendChild(tag);

},

/*==========================================================
 Organization Schema
==========================================================*/

organization(){

    this.json({

        "@context":

        "https://schema.org",

        "@type":

        "Organization",

        name:

        CONFIG.COMPANY.NAME,

        url:

        CONFIG.SITE_URL,

        logo:

        CONFIG.SEO.DEFAULT_IMAGE

    });

},

/*==========================================================
 Product Schema
==========================================================*/

product(product){

    this.json({

        "@context":

        "https://schema.org",

        "@type":

        "Product",

        name:product.name,

        image:product.image,

        description:

        product.description,

        sku:product.sku,

        brand:{

            "@type":"Brand",

            name:product.brand

        },

        offers:{

            "@type":"Offer",

            price:

            product.price,

            priceCurrency:

            CONFIG.CURRENCY,

            availability:

            "https://schema.org/InStock"

        }

    });

},

/*==========================================================
 Blog Schema
==========================================================*/

article(article){

    this.json({

        "@context":

        "https://schema.org",

        "@type":

        "Article",

        headline:

        article.title,

        image:

        article.image,

        datePublished:

        article.date,

        author:{

            "@type":"Person",

            name:

            article.author

        }

    });

}

};

export default SEO;