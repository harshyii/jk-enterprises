/*==========================================================
 JK Enterprises
 ui.js
 Version : 2.0
 Shared User Interface
==========================================================*/

"use strict";

import CONFIG from "./config.js";
import Utils from "./utils.js";

const UI={

/*==========================================================
 DOM Helpers
==========================================================*/

$(selector,parent=document){

    return parent.querySelector(selector);

},

$$(selector,parent=document){

    return [...parent.querySelectorAll(selector)];

},

create(tag,className="",html=""){

    const element=document.createElement(tag);

    if(className)

        element.className=className;

    if(html!=="")

        element.innerHTML=html;

    return element;

},

append(parent,child){

    if(parent&&child)

        parent.appendChild(child);

},

replace(target,html){

    if(target)

        target.innerHTML=html;

},

remove(target){

    if(target)

        target.remove();

},

clear(target){

    if(target)

        target.innerHTML="";

},



/*==========================================================
 Loading
==========================================================*/

loader(target){

    if(!target)return;

    this.replace(target,`

<div class="loading text-center py-5">

<div class="loader"></div>

<p class="mt-3">

Loading...

</p>

</div>

`);

},

showLoader(selector){

    this.loader(

        typeof selector==="string"

        ?this.$(selector)

        :selector

    );

},

hideLoader(target){

    if(target)

        target.innerHTML="";

},



/*==========================================================
 Skeletons
==========================================================*/

skeletonCard(){

return`

<div class="card h-100">

<div class="skeleton"

style="height:220px">

</div>

<div class="card-body">

<div

class="skeleton mb-3"

style="height:22px">

</div>

<div

class="skeleton"

style="height:18px;width:60%">

</div>

</div>

</div>

`;

},

skeletonGrid(count=8){

    return Array(count)

    .fill(this.skeletonCard())

    .join("");

},

showSkeleton(target,count=8){

    if(!target)return;

    target.innerHTML=

    this.skeletonGrid(count);

},



/*==========================================================
 Empty State
==========================================================*/

empty(

target,

title="Nothing Found",

text="No data available.",

buttonText="",

buttonLink="#"

){

if(!target)return;

this.replace(target,`

<section class="empty-state text-center py-5">

<img

src="assets/images/icons/empty.svg"

alt="${title}"

loading="lazy"

width="180"

height="180">

<h2 class="mt-4">

${title}

</h2>

<p class="text-muted">

${text}

</p>

${buttonText?`

<a

href="${buttonLink}"

class="btn btn-primary mt-3">

${buttonText}

</a>

`:""}

</section>

`);

},



/*==========================================================
 Error State
==========================================================*/

error(

target,

message="Something went wrong."

){

if(!target)return;

this.replace(target,`

<div class="alert alert-danger">

<strong>

Error

</strong>

<p class="mb-0 mt-2">

${message}

</p>

</div>

`);

},



/*==========================================================
 404 State
==========================================================*/

notFound(

target,

title="Page Not Found",

text="The page you're looking for doesn't exist."

){

this.empty(

target,

title,

text,

"Back to Home",

"./index.html"

);

},



/*==========================================================
 Toast
==========================================================*/

toast(

message,

type="success",

duration=3000

){

let container=

this.$("#toastContainer");



if(!container){

container=this.create(

"div",

"toast-container"

);

container.id="toastContainer";

document.body.appendChild(

container

);

}



const toast=this.create(

"div",

`toast toast-${type}`,

`

<div class="toast-body">

${message}

</div>

`

);

container.appendChild(toast);

requestAnimationFrame(

()=>toast.classList.add("show")

);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(

()=>toast.remove(),

300

);

},duration);

},



/*==========================================================
 Modal
==========================================================*/

modal(

title,

body,

footer=""

){

const overlay=this.create(

"div",

"modal-overlay"

);

overlay.innerHTML=`

<div class="modal-window">

<div class="modal-header">

<h4>

${title}

</h4>

<button

class="modal-close"

aria-label="Close">

&times;

</button>

</div>

<div class="modal-body">

${body}

</div>

${footer?`

<div class="modal-footer">

${footer}

</div>

`:""}

</div>

`;

document.body.appendChild(

overlay

);

overlay

.querySelector(".modal-close")

.onclick=()=>overlay.remove();

overlay.onclick=e=>{

if(e.target===overlay)

overlay.remove();

};

return overlay;

},



/*==========================================================
 Confirm
==========================================================*/

confirm(message){

return window.confirm(message);

},



/*==========================================================
 Common Helpers
==========================================================*/

price(value){

return Utils.price(value);

},

badge(text,type="primary"){

return`

<span

class="badge bg-${type}">

${text}

</span>

`;

},

stock(quantity){

if(quantity>0)

return this.badge(

"In Stock",

"success"

);

return this.badge(

"Out of Stock",

"danger"

);

},

stars(rating=5){

    let html="";

    for(let i=1;i<=5;i++){

        html+=i<=rating?"★":"☆";

    }

    return`

<span class="rating">

${html}

</span>

`;

},

/*==========================================================
 Product Components
==========================================================*/

/*==========================================================
 Product Badge
==========================================================*/

productBadge(product){

    let html="";

    if(Number(product.discount||0)>0){

        html+=this.badge(

            `${product.discount}% OFF`,

            "danger"

        );

    }

    if(product.featured){

        html+=this.badge(

            "Featured",

            "warning"

        );

    }

    if(product.new){

        html+=this.badge(

            "New",

            "success"

        );

    }

    return html;

},



/*==========================================================
 Product Price
==========================================================*/

productPrice(product){

    const mrp=Number(product.mrp||0);

    const sale=Number(product.price||0);

    const discount=Number(product.discount||0);

    return `

<div class="product-price">

    <span class="sale-price">

        ${Utils.price(sale)}

    </span>

    ${mrp>sale?`

    <span class="mrp">

        ${Utils.price(mrp)}

    </span>

    `:""}

    ${discount>0?`

    <span class="discount">

        ${discount}% OFF

    </span>

    `:""}

</div>

`;

},



/*==========================================================
 Product Image
==========================================================*/

productImage(product){

    return `

<div class="product-image">

    <img

        src="${product.image || CONFIG.IMAGES.PRODUCT}"

        alt="${Utils.escape(product.name||'Product')}"

        loading="lazy"

        width="300"

        height="300"

        onerror="this.src='${CONFIG.IMAGES.PRODUCT}'">

</div>

`;

},



/*==========================================================
 Product Card
==========================================================*/

/*==========================================================
 Product Card
==========================================================*/

productCard(product){

return `

<div class="col-6 col-md-4 col-lg-3">

<div class="card product-card h-100">

<a
href="product.html?id=${product.id}"
class="text-decoration-none text-dark">

<img

src="${product.image||'assets/images/no-image.webp'}"

class="card-img-top"

alt="${product.name}"

loading="lazy">

<div class="card-body">

<div class="small text-muted">

${product.brand||""}

</div>

<h6 class="card-title">

${product.name}

</h6>

<div class="fw-bold text-primary">

${Utils.price(product.price)}

</div>

${product.mrp?

`<small class="text-decoration-line-through text-muted">

${Utils.price(product.mrp)}

</small>`

:""}

</div>

</a>

<div class="card-footer bg-white border-0">

<button
class="btn btn-primary w-100"
data-cart-add="${product.id}">

Add to Cart

</button>

</div>

</div>

</div>

`;

},


/*==========================================================
 Product Grid
==========================================================*/

productGrid(products=[]){

    if(!products.length) return "";

    return `

<div class="row g-4">

${products.map(product=>`

<div class="col-lg-3 col-md-4 col-sm-6">

${this.productCard(product)}

</div>

`).join("")}

</div>

`;

},



/*==========================================================
 Product Gallery
==========================================================*/

productGallery(images=[]){

    if(!images.length){

        images=[CONFIG.IMAGES.PRODUCT];

    }

    return `

<div class="product-gallery">

<div class="product-main-image">

<img
id="productImage"
src="${images[0]}"
alt="Product Image"
loading="eager">

</div>

<div class="product-thumbnails">

${images.map(image=>`

<img
class="product-thumbnail"
src="${image}"
data-image="${image}"
loading="lazy"
alt="Thumbnail">

`).join("")}

</div>

</div>

`;

},

/*==========================================================
 Quantity Selector
==========================================================*/

quantity(value=1){

return`

<div class="quantity-box">

<button

type="button"

id="qtyMinus">

−

</button>

<input

id="quantity"

type="number"

min="1"

value="${value}">

<button

type="button"

id="qtyPlus">

+

</button>

</div>

`;

},



/*==========================================================
 Product Actions
==========================================================*/

productActions(){

return`

<div class="product-actions">

<button

class="btn btn-primary"

id="addToCart">

Add to Cart

</button>

<a

href="cart.html"

class="btn btn-outline">

Buy Now

</a>

</div>

`;

},



/*==========================================================
 Product Meta
==========================================================*/

productMeta(product){

return`

<div class="product-meta">

<div>

<strong>

SKU:

</strong>

${product.sku||"-"}

</div>

<div>

<strong>

Brand:

</strong>

${product.brand||"-"}

</div>

<div>

<strong>

Category:

</strong>

${product.category||"-"}

</div>

</div>

`;

},
/*==========================================================
 Product Details Page
==========================================================*/

/*==========================================================
 Product Specifications
==========================================================*/

productSpecs(product){

const specs=[

["SKU",product.sku],

["Brand",product.brand],

["Category",product.category],

["Weight",product.weight],

["Dimensions",product.dimensions],

["Warranty",product.warranty]

].filter(item=>item[1]);

if(!specs.length)return"";

return`

<section class="product-specifications">

<h2>

Specifications

</h2>

<table class="table specification-table">

<tbody>

${specs.map(spec=>`

<tr>

<th>

${spec[0]}

</th>

<td>

${spec[1]}

</td>

</tr>

`).join("")}

</tbody>

</table>

</section>

`;

},



/*==========================================================
 Product Features
==========================================================*/

productFeatures(product){

if(!product.features)

return"";

const features=

Array.isArray(product.features)

?product.features

:String(product.features)

.split("\n");

return`

<section class="product-highlights">

<h2>

Key Features

</h2>

<ul>

${features.map(feature=>`

<li>

${feature}

</li>

`).join("")}

</ul>

</section>

`;

},



/*==========================================================
 Product Description
==========================================================*/

productDescription(product){

return`

<section class="product-description">

<h2>

Description

</h2>

<div>

${product.description||""}

</div>

</section>

`;

},



/*==========================================================
 Share Buttons
==========================================================*/

productShare(){

return`

<div class="share-buttons">

<button

class="btn btn-outline"

data-share>

Share

</button>

<button

class="btn btn-outline"

data-copy-link>

Copy Link

</button>

</div>

`;

},



/*==========================================================
 Product Tabs
==========================================================*/

productTabs(product){

return`

<section class="product-tabs">

<ul class="nav nav-tabs">

<li class="nav-item">

<button

class="nav-link active"

data-bs-toggle="tab"

data-bs-target="#description">

Description

</button>

</li>

<li class="nav-item">

<button

class="nav-link"

data-bs-toggle="tab"

data-bs-target="#specifications">

Specifications

</button>

</li>

</ul>

<div class="tab-content">

<div

class="tab-pane fade show active"

id="description">

${this.productDescription(product)}

</div>

<div

class="tab-pane fade"

id="specifications">

${this.productSpecs(product)}

</div>

</div>

</section>

`;

},



/*==========================================================
 Product Page
==========================================================*/

product(product){

const images=[];

if(product.image)

images.push(product.image);

if(product.image2)

images.push(product.image2);

if(product.image3)

images.push(product.image3);

return`

<section class="product-page">

<div class="container">

<div class="product-wrapper">

<div>

${this.productGallery(images)}

</div>

<div class="product-info">

<div class="product-Brand">

${product.brand||""}

</div>

<h1>

${Utils.escape(product.name)}

</h1>

<div class="mb-3">

${this.stars(

Number(product.rating||5)

)}

</div>

${this.productPrice(product)}

<div class="mb-3">

${this.stock(

Number(product.stock||1)

)}

</div>

${this.quantity()}

${this.productActions()}

${this.productMeta(product)}

${this.productFeatures(product)}

</div>

</div>

${this.productTabs(product)}

${this.productShare()}

<section class="related-products">

<h2>

Related Products

</h2>

<div

id="relatedProducts"

class="row g-4">

</div>

</section>

</div>

</section>

`;

},
/*==========================================================
 Blog Components
==========================================================*/

/*==========================================================
 Blog Meta
==========================================================*/

blogMeta(blog){

return`

<div class="blog-meta">

<span>

📅 ${blog.date||""}

</span>

<span>

👤 ${blog.author||"JK Enterprises"}

</span>

${blog.readTime?`

<span>

⏱ ${blog.readTime}

</span>

`:""}

</div>

`;

},



/*==========================================================
 Blog Featured Image
==========================================================*/

blogImage(blog){

return`

<div class="blog-featured">

<img

src="${blog.image||CONFIG.IMAGES.BLOG}"

alt="${Utils.escape(blog.title)}"

loading="lazy"

onerror="this.src='${CONFIG.IMAGES.BLOG}'">

</div>

`;

},



/*==========================================================
 Blog Card
==========================================================*/

/*==========================================================
 Blog Card
==========================================================*/

blogCard(blog){

return `

<div class="col-md-6 col-lg-4">

<div class="card h-100 shadow-sm border-0">

<a

href="blog.html?id=${blog.Slug}"

class="text-decoration-none text-dark">

<img

src="assets/images/blogs/${blog.FeaturedImage}"

class="card-img-top"

alt="${blog.ImageAlt}"

loading="lazy">

<div class="card-body">

<span class="badge bg-primary mb-2">

${blog.Category}

</span>

<h5>

${blog.Title}

</h5>

<p class="text-muted">

${blog.Excerpt}

</p>

</div>

<div class="card-footer bg-white border-0">

<span class="fw-bold">

Read More →

</span>

</div>

</a>

</div>

</div>

`;

},

/*==========================================================
 Blog Grid
==========================================================*/

blogGrid(blogs=[]){

if(!blogs.length)

return"";

return`

<div class="row g-4">

${blogs.map(blog=>`

<div class="col-lg-4 col-md-6">

${this.blogCard(blog)}

</div>

`).join("")}

</div>

`;

},



/*==========================================================
 Blog Hero
==========================================================*/

blogHero(blog){

return`

<header class="blog-hero">

<div class="blog-category">

${blog.category||"Blog"}

</div>

<h1 class="blog-title">

${Utils.escape(blog.title)}

</h1>

${this.blogMeta(blog)}

${this.blogImage(blog)}

</header>
<!-- ==========================================================
MOBILE CART BAR
========================================================== -->

<div class="mobile-cart-bar d-lg-none">

<div class="container">

<a
href="cart.html"
class="btn btn-primary w-100 d-flex justify-content-between align-items-center">

<div>

<i class="bi bi-cart3 me-2"></i>

Cart

</div>

<span
id="cartCountMobile"
class="badge bg-light text-dark">

0

</span>

</a>

</div>

</div>

`;

},



/*==========================================================
 Table Of Contents
==========================================================*/

tableOfContents(){

return`

<nav

class="table-of-contents"

id="tableOfContents">

<h4>

Contents

</h4>

</nav>

`;

},



/*==========================================================
 Author Box
==========================================================*/

authorBox(blog){

return`

<section class="author-box">

<h3>

About the Author

</h3>

<p>

${blog.author||

"JK Enterprises"}

</p>

</section>

`;

},



/*==========================================================
 Blog Share
==========================================================*/

blogShare(){

return`

<section class="blog-share">

<button

class="btn btn-outline"

data-share>

Share Article

</button>

<button

class="btn btn-outline"

data-copy-link>

Copy Link

</button>

</section>

`;

},



/*==========================================================
 Related Blogs
==========================================================*/

relatedBlogs(){

return`

<section class="related-blogs">

<h2>

Related Articles

</h2>

<div

id="relatedBlogs"

class="row g-4">

</div>

</section>

`;

},



/*==========================================================
 Complete Blog Article
==========================================================*/

blog(blog){

return`

<article class="blog-page">

<div class="container">

<div class="blog-container">

${this.blogHero(blog)}

${this.tableOfContents()}

<section

class="blog-content"

id="blogContent">

${blog.content||""}

</section>

${this.blogShare()}

${this.authorBox(blog)}

${this.relatedBlogs()}

</div>

</div>

</article>

`;

},
/*==========================================================
 Brand Components
==========================================================*/

/*==========================================================
 Brand Logo
==========================================================*/

brandLogo(Brand){

return`

<div class="Brand-logo">

<img

src="${Brand.logo||CONFIG.IMAGES.Brand}"

alt="${Utils.escape(Brand.name)}"

loading="lazy"

onerror="this.src='${CONFIG.IMAGES.Brand}'">

</div>

`;

},



/*==========================================================
 Brand Card
==========================================================*/

/*==========================================================
 Brand Card
==========================================================*/

brandCard(brand){

return`

<div class="col-6 col-md-3 col-lg-2">

<a

href="products.html?brand=${encodeURIComponent(brand.name)}"

class="text-decoration-none">

<div class="card h-100 text-center">

<div class="card-body">

<img

src="${brand.logo||'assets/images/brand.webp'}"

class="img-fluid mb-3"

loading="lazy"

style="max-height:70px"

alt="${brand.name}">

<h6>

${brand.name}

</h6>

</div>

</div>

</a>

</div>

`;

},


/*==========================================================
 Brand Grid
==========================================================*/

brandGrid(brands=[]){

if(!brands.length)

return"";

return`

<div class="row g-4">

${brands.map(Brand=>`

<div class="col-lg-3 col-md-4 col-sm-6">

${this.brandCard(Brand)}

</div>

`).join("")}

</div>

`;

},



/*==========================================================
 Brand Hero
==========================================================*/

brandHero(Brand){

return`

<section class="Brand-hero">

${this.brandLogo(Brand)}

<h1 class="Brand-title">

${Utils.escape(Brand.name)}

</h1>

<p class="Brand-description">

${Brand.description||""}

</p>

</section>

`;

},



/*==========================================================
 Brand Statistics
==========================================================*/

brandStats(Brand){

return`

<section class="Brand-stats">

<div class="Brand-stat">

<h3>

${Brand.products||0}

</h3>

<p>

Products

</p>

</div>

<div class="Brand-stat">

<h3>

${Brand.years||"-"}

</h3>

<p>

Years

</p>

</div>

<div class="Brand-stat">

<h3>

${Brand.country||"-"}

</h3>

<p>

Country

</p>

</div>

<div class="Brand-stat">

<h3>

${Brand.warranty||"-"}

</h3>

<p>

Warranty

</p>

</div>

</section>

`;

},



/*==========================================================
 Brand Categories
==========================================================*/

brandCategories(Brand){

if(!Brand.categories)

return"";

const categories=

Array.isArray(Brand.categories)

?Brand.categories

:String(Brand.categories).split(",");

return`

<section class="Brand-categories">

${categories.map(category=>`

<span class="Brand-category">

${category.trim()}

</span>

`).join("")}

</section>

`;

},



/*==========================================================
 Brand Banner
==========================================================*/

brandBanner(Brand){

if(!Brand.banner)

return"";

return`

<section class="Brand-banner">

<img

src="${Brand.banner}"

alt="${Utils.escape(Brand.name)}"

loading="lazy">

</section>

`;

},



/*==========================================================
 Brand Products
==========================================================*/

brandProducts(){

return`

<section class="Brand-products">

<h2>

Products

</h2>

<div

id="brandProducts"

class="row g-4">

</div>

</section>

`;

},



/*==========================================================
 Related Brands
==========================================================*/

relatedBrands(){

return`

<section class="related-brands">

<h2>

Related Brands

</h2>

<div

id="relatedBrands"

class="row g-4">

</div>

</section>

`;

},



/*==========================================================
 Contact Section
==========================================================*/

brandContact(){

return`

<section class="Brand-contact">

<h2>

Need Help Choosing Products?

</h2>

<p>

Contact JK Enterprises for pricing,

availability and bulk orders.

</p>

<a

href="contact.html"

class="btn btn-light">

Contact Us

</a>

</section>

`;

},



/*==========================================================
 Complete Brand Page
==========================================================*/

Brand(Brand){

return`

<section class="Brand-page">

<div class="container">

${this.brandHero(Brand)}

${this.brandStats(Brand)}

${this.brandCategories(Brand)}

${this.brandBanner(Brand)}

${this.brandProducts()}

${this.relatedBrands()}

${this.brandContact()}

</div>

</section>

`;

},
/*==========================================================
 Site Components
==========================================================*/

/*==========================================================
 Header
==========================================================*/

header(active=""){

const nav=[

["Home","index.html"],

["Products","products.html"],

["Brands","brands.html"],

["Blogs","blogs.html"],

["About","about.html"],

["Contact","contact.html"]

];

return`

<header class="site-header">

<div class="container">

<div class="header-wrapper">

<a

href="index.html"

class="site-logo">

${CONFIG.SITE_NAME}

</a>

<nav class="site-nav">

${nav.map(item=>`

<a

href="${item[1]}"

class="${
active===item[1]
?"active":""
}">

${item[0]}

</a>

`).join("")}

</nav>

<div class="header-actions">

<form

action="search.html"

method="get"

class="search-form"

data-search-form>

<input

type="search"

name="q"

placeholder="Search products..."

autocomplete="off"

data-search-input>

<button type="submit">

Search

</button>

</form>

<a

href="cart.html"

class="cart-button">

Cart

<span

data-cart-count>

0

</span>

</a>

<button

class="mobile-toggle"

id="mobileToggle"

aria-label="Menu">

☰

</button>

</div>

</div>

</div>

</header>
<!-- ==========================================================
MOBILE CART BAR
========================================================== -->

<div class="mobile-cart-bar d-lg-none">

<div class="container">

<a
href="cart.html"
class="btn btn-primary w-100 d-flex justify-content-between align-items-center">

<div>

<i class="bi bi-cart3 me-2"></i>

Cart

</div>

<span
id="cartCountMobile"
class="badge bg-light text-dark">

0

</span>

</a>

</div>

</div>

`;

},



/*==========================================================
 Mobile Menu
==========================================================*/

mobileMenu(){

const menu=this.$(".site-nav");

const toggle=this.$("#mobileToggle");

if(!menu||!toggle)

return;

toggle.onclick=()=>{

menu.classList.toggle("open");

};

},



/*==========================================================
 Footer
==========================================================*/

footer(){

const year=new Date().getFullYear();

return`

<footer class="site-footer">

<div class="container">

<div class="row">

<div class="col-lg-4">

<h3>

${CONFIG.COMPANY.NAME}

</h3>

<p>

${CONFIG.SITE_DESCRIPTION}

</p>

</div>

<div class="col-lg-4">

<h4>

Quick Links

</h4>

<ul>

<li>

<a href="about.html">

About

</a>

</li>

<li>

<a href="contact.html">

Contact

</a>

</li>

<li>

<a href="blogs.html">

Blogs

</a>

</li>

<li>

<a href="faq.html">

FAQ

</a>

</li>

</ul>

</div>

<div class="col-lg-4">

<h4>

Contact

</h4>

<p>

${CONFIG.COMPANY.PHONE}

</p>

<p>

${CONFIG.COMPANY.EMAIL}

</p>

<p>

${CONFIG.COMPANY.ADDRESS}

</p>

</div>

</div>

<hr>

<div class="footer-bottom">

<p>

© ${year}

${CONFIG.COMPANY.NAME}

All Rights Reserved.

</p>

</div>

</div>

</footer>

`;

},



/*==========================================================
 Breadcrumb
==========================================================*/

breadcrumb(items=[]){

if(!items.length)

return"";

return`

<nav

class="breadcrumb-nav"

aria-label="breadcrumb">

<ol class="breadcrumb">

${items.map((item,index)=>`

<li

class="breadcrumb-item ${
index===items.length-1
?"active":""
}">

${
index===items.length-1
?item.title
:`<a href="${item.url}">${item.title}</a>`
}

</li>

`).join("")}

</ol>

</nav>

`;

},



/*==========================================================
 Pagination
==========================================================*/

pagination(

current,

total,

baseUrl

){

if(total<=1)

return"";

let html="";

for(

let i=1;

i<=total;

i++

){

html+=`

<li

class="page-item ${
i===current
?"active":""
}">

<a

class="page-link"

href="${baseUrl}${i}">

${i}

</a>

</li>

`;

}

return`

<nav>

<ul class="pagination justify-content-center">

${html}

</ul>

</nav>

`;

},



/*==========================================================
 Search Suggestions
==========================================================*/

searchSuggestions(items=[]){

if(!items.length)

return"";

return`

<ul class="search-suggestions">

${items.map(item=>`

<li>

<a

href="${item.url}">

${item.title}

</a>

</li>

`).join("")}

</ul>

`;

},



/*==========================================================
 Render Header
==========================================================*/

renderHeader(active=""){

const header=document.getElementById(

"siteHeader"

);

if(header)

header.innerHTML=

this.header(active);

this.mobileMenu();

},



/*==========================================================
 Render Footer
==========================================================*/

renderFooter(){

const footer=document.getElementById(

"siteFooter"

);

if(footer)

footer.innerHTML=

this.footer();

},
/*==========================================================
 Generic Layout Components
==========================================================*/

/*==========================================================
 Hero Banner
==========================================================*/

hero(options={}){

return`

<section class="hero">

<div class="container">

<div class="hero-content">

${options.badge?`

<span class="hero-badge">

${options.badge}

</span>

`:""}

<h1>

${options.title||CONFIG.SITE_NAME}

</h1>

<p>

${options.description||CONFIG.SITE_DESCRIPTION}

</p>

${options.button?`

<a

href="${options.link||"#"}"

class="btn btn-primary">

${options.button}

</a>

`:""}

</div>

${options.image?`

<div class="hero-image">

<img

src="${options.image}"

alt="${options.title||CONFIG.SITE_NAME}"

loading="eager">

</div>

`:""}

</div>

</section>

`;

},



/*==========================================================
 Section Heading
==========================================================*/

section(title,subtitle=""){

return`

<div class="section-heading">

<h2>

${title}

</h2>

${subtitle?`

<p>

${subtitle}

</p>

`:""}

</div>

`;

},



/*==========================================================
 Newsletter
==========================================================*/

newsletter(){

return`

<section class="newsletter">

<div class="container">

<h2>

Stay Updated

</h2>

<p>

Receive product launches,

offers and technical guides.

</p>

<form id="newsletterForm">

<input

type="email"

placeholder="Email Address"

required>

<button

type="submit"

class="btn btn-primary">

Subscribe

</button>

</form>

</div>

</section>

`;

},



/*==========================================================
 Call To Action
==========================================================*/

cta(

title,

text,

button,

link

){

return`

<section class="cta">

<div class="container">

<h2>

${title}

</h2>

<p>

${text}

</p>

<a

href="${link}"

class="btn btn-primary">

${button}

</a>

</div>

</section>

`;

},



/*==========================================================
 Sidebar
==========================================================*/

sidebar(content=""){

return`

<aside class="sidebar">

${content}

</aside>

`;

},



/*==========================================================
 FAQ Accordion
==========================================================*/

faq(items=[]){

if(!items.length)

return"";

return`

<div class="accordion"

id="faqAccordion">

${items.map((faq,index)=>`

<div class="accordion-item">

<h2

class="accordion-header">

<button

class="accordion-button ${index?"collapsed":""}"

type="button"

data-bs-toggle="collapse"

data-bs-target="#faq${index}">

${faq.question}

</button>

</h2>

<div

id="faq${index}"

class="accordion-collapse collapse ${!index?"show":""}"

data-bs-parent="#faqAccordion">

<div class="accordion-body">

${faq.answer}

</div>

</div>

</div>

`).join("")}

</div>

`;

},



/*==========================================================
 Feature Box
==========================================================*/

feature(icon,title,text){

return`

<div class="feature-box">

<div class="feature-icon">

${icon}

</div>

<h3>

${title}

</h3>

<p>

${text}

</p>

</div>

`;

},



/*==========================================================
 Banner
==========================================================*/

banner(image,link="#"){

return`

<a

href="${link}"

class="banner">

<img

src="${image}"

loading="lazy"

alt="Banner">

</a>

`;

},



/*==========================================================
 Back To Top
==========================================================*/

backToTop(){

return`

<button

id="backToTop"

class="back-top"

aria-label="Back to Top">

↑

</button>

`;

},



/*==========================================================
 Activate Back To Top
==========================================================*/

enableBackToTop(){

const button=

document.getElementById(

"backToTop"

);

if(!button)

return;

window.addEventListener(

"scroll",

()=>{

button.classList.toggle(

"show",

window.scrollY>400

);

}

);

button.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

},



/*==========================================================
 Lightbox
==========================================================*/

lightbox(src){

const overlay=this.create(

"div",

"lightbox"

);

overlay.innerHTML=`

<div class="lightbox-image">

<img

src="${src}"

alt="Image">

</div>

`;

overlay.onclick=()=>overlay.remove();

document.body.appendChild(

overlay

);

},



/*==========================================================
 Render HTML
==========================================================*/

render(target,html){

if(typeof target==="string")

target=document.querySelector(target);

if(target)

target.innerHTML=html;

},



/*==========================================================
 Append HTML
==========================================================*/

appendHTML(target,html){

if(typeof target==="string")

target=document.querySelector(target);

if(target)

target.insertAdjacentHTML(

"beforeend",

html

);

},



/*==========================================================
 Replace HTML
==========================================================*/

replaceHTML(target,html){

this.render(target,html);

}

};

export default UI;