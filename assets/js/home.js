/*==========================================================
 JK Enterprises
 home.js
 Homepage Module
==========================================================*/

"use strict";

import API from "./api.js";
import UI from "./ui.js";

const Home = {

/*==========================================================
 Initialize
==========================================================*/

async init(){

    if(!document.getElementById("featuredProducts"))
        return;

    await this.load();

},

/*==========================================================
 Load Homepage
==========================================================*/

async load(){

    this.loading();

    try{

        const response = await API.homepage();

        if(!response.success){

            throw new Error(

                response.message ||

                "Unable to load homepage."

            );

        }

       const response = await API.homepage();

        if(!response.success){

            throw new Error(response.message);

        }

const data = response.data;

await this.products(

    data.products || []

);

await this.brands(

    data.brands || []

);

await this.blogs(

    data.blogs || []

);

        await this.brands(

            data.brands || []

        );

        await this.blogs(

            data.blogs || []

        );

    }

    catch(error){

        console.error(

            "Homepage Error:",

            error

        );

        await this.products([]);

        await this.brands([]);

        await this.blogs([]);

    }

},

/*==========================================================
 Loading Skeleton
==========================================================*/

loading(){

    this.skeleton("featuredProducts",4);

    this.skeleton("featuredBrands",4);

    this.skeleton("latestBlogs",3);

},

/*==========================================================
 Skeleton Cards
==========================================================*/

skeleton(id,count){

    const container=document.getElementById(id);

    if(!container) return;

    container.innerHTML=

    Array(count).fill(`

<div class="col-6 col-md-4 col-lg-3">

<div class="card h-100">

<div
class="placeholder w-100"
style="height:180px">
</div>

<div class="card-body">

<p class="placeholder-glow">

<span class="placeholder col-8"></span>

</p>

<p class="placeholder-glow">

<span class="placeholder col-6"></span>

</p>

</div>

</div>

</div>

`).join("");

},

/*==========================================================
 Featured Products
==========================================================*/

async products(list){

    const container=document.getElementById("featuredProducts");

    if(!container) return;

    if(!list.length){

        try{

            const response = await API.products();

            list = response.data || [];

            list = list.slice(0,8);

        }

        catch{

            container.innerHTML=this.emptyCard(

                "No Products Available",

                "Browse Products",

                "products.html"

            );

            return;

        }

    }

    container.innerHTML=

    list.map(product=>

        UI.productCard(product)

    ).join("");

},

/*==========================================================
 Featured Brands
==========================================================*/

async brands(list){

    const container=document.getElementById("featuredBrands");

    if(!container) return;

    if(!list.length){

        try{

            list=await API.brands();

            list=list.slice(0,8);

        }

        catch{

            container.innerHTML=this.emptyCard(

                "No Brands Available",

                "Browse Brands",

                "brands.html"

            );

            return;

        }

    }

    container.innerHTML=

    list.map(brand=>

        UI.brandCard(brand)

    ).join("");

},

/*==========================================================
 Latest Blogs
==========================================================*/

async blogs(list){

    const container=document.getElementById("latestBlogs");

    if(!container) return;

    if(!list.length){

        try{

            list=await API.blogs();

            list=list.slice(0,6);

        }

        catch{

            container.innerHTML=this.emptyCard(

                "No Articles Available",

                "Read Blogs",

                "blogs.html"

            );

            return;

        }

    }

    container.innerHTML=

    list.map(blog=>

        UI.blogCard(blog)

    ).join("");

},

/*==========================================================
 Empty Card
==========================================================*/

emptyCard(title,button,link){

return`

<div class="col-12">

<div class="card border-0 shadow-sm">

<div class="card-body text-center py-5">

<h4>

${title}

</h4>

<p class="text-muted">

Content will appear here once it is added.

</p>

<a

href="${link}"

class="btn btn-primary mt-3">

${button}

</a>

</div>

</div>

</div>

`;

}

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>Home.init()

);

export default Home;