/*==========================================================
 JK Enterprises
 product.js
 Version : 1.0
 Product Module
==========================================================*/

"use strict";

import API from "./api.js";
import Router from "./router.js";
import UI from "./ui.js";
import Utils from "./utils.js";
import Cart from "./cart.js";


const Product={

/*==========================================================
 Initialize
==========================================================*/

async init(){

    if(Router.isProducts())

        await this.catalog();

    if(Router.isProduct())

        await this.details();

},



/*==========================================================
 Product Listing
==========================================================*/

async catalog(){

    const grid=

    document.getElementById(

        "productGrid"

    );

    if(!grid)return;

    UI.loader(grid);

    const response=

    await API.products({

        page:Router.pageNumber(),

        category:Router.category(),

        brand:Router.brand(),

        search:Router.search(),

        sort:Router.sort()

    });

    if(

        !response.success||

        !response.data?.length

    ){

        UI.empty(

            grid,

            "No Products Found",

            "Try changing your filters."

        );

        return;

    }

    grid.innerHTML=

    response.data

    .map(

        p=>UI.productCard(p)

    )

    .join("");

},



/*==========================================================
 Product Details
==========================================================*/

async details(){

    const container=

    document.getElementById(

        "productDetails"

    );

    if(!container)return;

    UI.loader(container);

    const id=

    Router.id();

    if(!id){

        UI.error(

            container,

            "Product not found."

        );

        return;

    }

    const response=

    await API.product(id);

    if(

        !response.success||

        !response.data

    ){

        UI.error(

            container,

            "Unable to load product."

        );

        return;

    }

    this.render(

        response.data

    );

},

/*==========================================================
 Render
==========================================================*/

render(product){

    document.title=

    `${product.name} | JK Enterprises`;

    const container=

    document.getElementById(

        "productDetails"

    );

    container.innerHTML=

    UI.product(product);

    this.gallery();

    this.quantity();

    this.buttons(product);

},

/*==========================================================
 Gallery
==========================================================*/

gallery(){

    const main=

    document.getElementById(

        "productImage"

    );

    if(!main)return;

    document

    .querySelectorAll(

        ".product-thumbnail"

    )

    .forEach(img=>{

        img.onclick=()=>{

            main.src=img.dataset.image;

        };

    });

},

/*==========================================================
 Quantity
==========================================================*/

quantity(){

    const qty=

    document.getElementById(

        "quantity"

    );

    if(!qty)return;

    document

    .getElementById("qtyPlus")

    ?.addEventListener(

        "click",

        ()=>qty.value++

    );

    document

    .getElementById("qtyMinus")

    ?.addEventListener(

        "click",

        ()=>{

            if(qty.value>1)

                qty.value--;

        }

    );

},

/*==========================================================
 Buttons
==========================================================*/

buttons(product){

    document

    .getElementById(

        "addToCart"

    )

    ?.addEventListener(

        "click",

        ()=>{

            document.dispatchEvent(

                new CustomEvent(

                    "cart:add",

                    {

                        detail:{

                            product,

                            quantity:Number(

                                document.getElementById(

                                    "quantity"

                                )?.value||1

                            )

                        }

                    }

                )

            );

        }

    );

},

/*==========================================================
 Related Products
==========================================================*/

async related(id){

    const target=

    document.getElementById(

        "relatedProducts"

    );

    if(!target)return;

    const response=

    await API.products({

        related:id

    });

    if(

        !response.success||

        !response.data

    )return;

    target.innerHTML=

    response.data

    .map(

        p=>UI.productCard(p)

    )

    .join("");

},

/*==========================================================
 Search Helper
==========================================================*/

search(text){

    window.location=

    `search.html?q=${encodeURIComponent(text)}`;

}

};



export default Product;