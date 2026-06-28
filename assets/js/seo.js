/*==========================================================
 JK ENTERPRISES
 SEO
 Product JSON-LD
==========================================================*/

export function renderProductSchema(product){

    removeSchema();

    if(!product) return;

    const schema={

        "@context":"https://schema.org",

        "@type":"Product",

        "@id":location.href,

        "name":product["Item Name"],

        "image":[

            product.Image1,

            product.Image2

        ].filter(Boolean),

        "description":product.Description,

        "sku":product.SKU||product.ProductID,

        "mpn":product.ProductID,

        "brand":{

            "@type":"Brand",

            "name":product.Brand

        },

        "category":product.Category,

        "weight":product["Weight (kg)"]||undefined,

        "offers":{

            "@type":"Offer",

            "url":location.href,

            "priceCurrency":"INR",

            "price":Number(product["Sale Price"]),

            "priceSpecification":{

                "@type":"PriceSpecification",

                "price":Number(product.MRP),

                "priceCurrency":"INR"

            },

            "availability":

            Number(product["Stock Quantity"])>0

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

    const script=document.createElement("script");

    script.type="application/ld+json";

    script.id="product-schema";

    script.textContent=

        JSON.stringify(schema);

    document.head.append(script);

}


/*==========================================================
 REMOVE OLD SCHEMA
==========================================================*/

function removeSchema(){

    const old=

    document.getElementById(

        "product-schema"

    );

    if(old) old.remove();

}