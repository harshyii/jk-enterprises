/*==========================================================
 JK ENTERPRISES
 SEO ENGINE
==========================================================*/

const WEBSITE="https://harshyii.github.io/jk-enterprises";


/*==========================================================
 PRODUCT SEO
==========================================================*/

export function updateProductSEO(product){

    if(!product) return;

    /*--------------------------------------
      TITLE
    --------------------------------------*/

    document.title=

        `${product["Item Name"]} | JK Enterprises`;


    /*--------------------------------------
      DESCRIPTION
    --------------------------------------*/

    setMeta(

        "description",

        product.Description||

        "Industrial Products"

    );


    /*--------------------------------------
      CANONICAL
    --------------------------------------*/

    setCanonical(
    `${WEBSITE}/?id=${encodeURIComponent(product.ProductID)}`
    );


    /*--------------------------------------
      OPEN GRAPH
    --------------------------------------*/

    setProperty(

        "og:title",

        product["Item Name"]

    );

    setProperty(

        "og:description",

        product.Description||

        ""

    );

    setProperty(

        "og:image",

        product.Image1||

        ""

    );

    setProperty(

        "og:url",

        location.href

    );

    setProperty(

        "og:type",

        "product"

    );


    /*--------------------------------------
      TWITTER
    --------------------------------------*/

    setName(

        "twitter:card",

        "summary_large_image"

    );

    setName(

        "twitter:title",

        product["Item Name"]

    );

    setName(

        "twitter:description",

        product.Description||

        ""

    );

    setName(

        "twitter:image",

        product.Image1||

        ""

    );


    /*--------------------------------------
      PRODUCT SCHEMA
    --------------------------------------*/

    renderProductSchema(

        product

    );

}


/*==========================================================
 PRODUCT SCHEMA
==========================================================*/

function renderProductSchema(product){

    removeSchema();

    const schema={

        "@context":"https://schema.org",

        "@type":"Product",

        "@id":location.href,

        "name":product["Item Name"],

        "image":[

            product.Image1,

            product.Image2

        ].filter(Boolean),

        "description":

        product.Description,

        "sku":

        product.SKU||

        product.ProductID,

        "mpn":

        product.ProductID,

        "brand":{

            "@type":"Brand",

            "name":product.Brand

        },

        "category":

        product.Category,

        "offers":{

            "@type":"Offer",

            "priceCurrency":"INR",

            "price":

            Number(

                product["Sale Price"]

            ),

            "availability":

            Number(

                product["Stock Quantity"]

            )>0

            ?

            "https://schema.org/InStock"

            :

            "https://schema.org/OutOfStock",

            "seller":{

                "@type":"Organization",

                "name":"JK Enterprises"

            }

        }

    };

    const script=

    document.createElement(

        "script"

    );

    script.type=

    "application/ld+json";

    script.id=

    "product-schema";

    script.textContent=

    JSON.stringify(schema);

    document.head.append(

        script

    );

}


/*==========================================================
 HELPERS
==========================================================*/

function removeSchema(){

    document

    .getElementById(

        "product-schema"

    )?.remove();

}


function setCanonical(url){

    let tag=document.querySelector(

        'link[rel="canonical"]'

    );

    if(!tag){

        tag=document.createElement(

            "link"

        );

        tag.rel="canonical";

        document.head.append(

            tag

        );

    }

    tag.href=url;

}


function setMeta(name,content){

    let tag=document.querySelector(

        `meta[name="${name}"]`

    );

    if(!tag){

        tag=document.createElement(

            "meta"

        );

        tag.name=name;

        document.head.append(

            tag

        );

    }

    tag.content=content;

}


function setProperty(property,content){

    let tag=document.querySelector(

        `meta[property="${property}"]`

    );

    if(!tag){

        tag=document.createElement(

            "meta"

        );

        tag.setAttribute(

            "property",

            property

        );

        document.head.append(

            tag

        );

    }

    tag.content=content;

}


function setName(name,content){

    let tag=document.querySelector(

        `meta[name="${name}"]`

    );

    if(!tag){

        tag=document.createElement(

            "meta"

        );

        tag.name=name;

        document.head.append(

            tag

        );

    }

    tag.content=content;

}

/* ===========================
   Google Analytics 4
=========================== */

(function () {
    const MEASUREMENT_ID = "G-52M29P8R6N";

    if (!MEASUREMENT_ID) return;

    // Prevent duplicate loading
    if (window.gtag) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
        dataLayer.push(arguments);
    };

    gtag("js", new Date());

    gtag("config", MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        send_page_view: true
    });
})();

