/*==========================================================
 JK ENTERPRISES
 UI ENGINE
 Part 1
==========================================================*/

import CONFIG,{APP} from "./config.js";

import{

    money,

    $,

    create,

    toast

}from "./utils.js";

import{

    cartCount

}from "./cart.js";

import{

    featured,

    latest

}from "./utils.js";


/*==========================================================
 ROOT
==========================================================*/

const root=$("#app");


/*==========================================================
 CLEAR
==========================================================*/

export function clear(){

    root.innerHTML="";

}


/*==========================================================
 APPEND
==========================================================*/

function append(...items){

    items.forEach(

        item=>root.append(item)

    );

}


/*==========================================================
 HEADER
==========================================================*/

export function renderHeader(){

    const header=create("header","site-header");

    header.innerHTML=`

<div class="topbar">

<div class="container">

<div class="topbar-left">

Wholesale Supplier

</div>

<div class="topbar-right">

<a href="#contact">

Contact

</a>

</div>

</div>

</div>


<div class="navbar">

<div class="container">

<div class="logo">

<a href="./">

JK Enterprises

</a>

</div>


<div class="search">

<input

id="searchInput"

type="search"

placeholder="Search products...">

<button id="searchBtn">

<i class="bi bi-search"></i>

</button>

</div>


<div class="nav-actions">

<button

id="cartButton"

class="cart-btn">

<i class="bi bi-cart3"></i>

<span id="cartBadge">

${cartCount()}

</span>

</button>

</div>

</div>

</div>

`;

    return header;

}


/*==========================================================
 HERO
==========================================================*/

export function renderHero(){

    const hero=create("section","hero");

    hero.innerHTML=`

<div class="container">

<div class="hero-content">

<h1>

Professional Tools & Solar Solutions

</h1>

<p>

Quality products at wholesale prices.

</p>

<button id="heroShop">

Shop Now

</button>

</div>

</div>

`;

    return hero;

}


/*==========================================================
 SECTION TITLE
==========================================================*/

export function section(title){

    const div=create(

        "div",

        "section-title"

    );

    div.innerHTML=`

<h2>

${title}

</h2>

`;

    return div;

}


/*==========================================================
 CATEGORY BAR
==========================================================*/

export function renderCategories(){

    const wrap=create(

        "section",

        "categories"

    );

    const container=create(

        "div",

        "container"

    );

    container.append(

        section("Categories")

    );

    const list=create(

        "div",

        "category-list"

    );

    APP.categories.forEach(category=>{

        const item=create(

            "button",

            "category-chip"

        );

        item.dataset.category=category;

        item.textContent=category;

        list.append(item);

    });

    container.append(list);

    wrap.append(container);

    return wrap;

}


/*==========================================================
 BRANDS
==========================================================*/

export function renderBrands(){

    const wrap=create(

        "section",

        "brands"

    );

    const container=create(

        "div",

        "container"

    );

    container.append(

        section("Brands")

    );

    const list=create(

        "div",

        "brand-list"

    );

    APP.brands.forEach(brand=>{

        const item=create(

            "button",

            "brand-chip"

        );

        item.dataset.brand=brand;

        item.textContent=brand;

        list.append(item);

    });

    container.append(list);

    wrap.append(container);

    return wrap;

}


/*==========================================================
 FOOTER
==========================================================*/

export function renderFooter(){

    const footer=create(

        "footer",

        "site-footer"

    );

    footer.innerHTML=`

<div class="container">

<div class="row">

<div class="col">

<h4>

JK Enterprises

</h4>

<p>

Solar Panels

Power Tools

Hand Tools

Car Care Products

</p>

</div>

<div class="col">

<h5>

Quick Links

</h5>

<ul>

<li>

<a href="#contact">

Contact

</a>

</li>

<li>

<a href="#terms">

Terms

</a>

</li>

<li>

<a href="#returns">

Returns

</a>

</li>

</ul>

</div>

</div>

<hr>

<div class="copyright">

© ${new Date().getFullYear()}

JK Enterprises

</div>

</div>

`;

    return footer;

}


/*==========================================================
 HOME
==========================================================*/

export function renderHome(){

    clear();

    append(

        renderHeader(),

        renderHero(),

        renderCategories(),

        renderBrands(),

        section("Featured Products"),

        create("section","featured-products"),

        section("Latest Products"),

        create("section","latest-products"),

        renderFooter()

    );

}
/*==========================================================
 JK ENTERPRISES
 UI ENGINE
 Part 2
==========================================================*/

import {
    product,
    search as searchRoute
} from "./router.js";

import {
    addToCart,
    inCart
} from "./cart.js";

import {
    featured,
    latest,
    money,
    discount,
    toast
} from "./utils.js";


/*==========================================================
 PRODUCT CARD
==========================================================*/

export function renderCard(item){

    const template = document
        .querySelector("#productTemplate")
        .content
        .cloneNode(true);

    const card = template.querySelector(".product-card");

    card.dataset.id = item.ProductID;

    /*---------------------------------------
      IMAGE
    ---------------------------------------*/

    const image = template.querySelector("img");

    image.src =
        item.Image1 ||
        CONFIG.IMAGE.PLACEHOLDER;

    image.alt =
        item["Item Name"];

    image.loading = "lazy";

    image.onclick = () => {

        product(item.ProductID);

    };

    /*---------------------------------------
      BRAND
    ---------------------------------------*/

    template
        .querySelector(".brand")
        .textContent = item.Brand;

    /*---------------------------------------
      TITLE
    ---------------------------------------*/

    template
        .querySelector(".title")
        .textContent =
        item["Item Name"];

    /*---------------------------------------
      PRICE
    ---------------------------------------*/

    template
        .querySelector(".sale")
        .textContent =
        money(item["Sale Price"]);

    template
        .querySelector(".mrp")
        .textContent =
        money(item.MRP);

    template
        .querySelector(".discount")
        .textContent =
        discount(
            item.MRP,
            item["Sale Price"]
        ) + "% OFF";

    /*---------------------------------------
      ADD TO CART
    ---------------------------------------*/

    const button =
        template.querySelector(".add-cart");

    if(inCart(item.ProductID)){

        button.innerHTML =
            `<i class="bi bi-check"></i> Added`;

    }

    button.onclick = e=>{

        e.stopPropagation();

        addToCart(item);

        button.innerHTML =
            `<i class="bi bi-check"></i> Added`;

        toast("Added to cart");

    };

    /*---------------------------------------
      OPEN PRODUCT
    ---------------------------------------*/

    template
        .querySelector(".product-link")
        .onclick = e=>{

        e.preventDefault();

        product(item.ProductID);

    };

    return template;

}


/*==========================================================
 PRODUCT GRID
==========================================================*/

export function renderProducts(

    products,

    container,

    limit = 12

){

    container.innerHTML = "";

    products
        .slice(0, limit)
        .forEach(item=>{

            container.append(

                renderCard(item)

            );

        });

}


/*==========================================================
 FEATURED
==========================================================*/

export function renderFeatured(){

    const section =

        document.querySelector(

            ".featured-products"

        );

    if(!section) return;

    renderProducts(

        featured(APP.products),

        section,

        CONFIG.PRODUCT.FEATURED_LIMIT

    );

}


/*==========================================================
 LATEST
==========================================================*/

export function renderLatest(){

    const section =

        document.querySelector(

            ".latest-products"

        );

    if(!section) return;

    renderProducts(

        latest(APP.products),

        section,

        CONFIG.PRODUCT.NEW_LIMIT

    );

}


/*==========================================================
 CATEGORY PRODUCTS
==========================================================*/

export function renderCategory(name){

    clear();

    append(

        renderHeader(),

        section(name)

    );

    const grid = create(

        "section",

        "container product-grid"

    );

    append(grid);

    renderProducts(

        APP.products.filter(

            p=>p.Category===name

        ),

        grid,

        9999

    );

    append(

        renderFooter()

    );

}


/*==========================================================
 BRAND PRODUCTS
==========================================================*/

export function renderBrand(name){

    clear();

    append(

        renderHeader(),

        section(name)

    );

    const grid = create(

        "section",

        "container product-grid"

    );

    append(grid);

    renderProducts(

        APP.products.filter(

            p=>p.Brand===name

        ),

        grid,

        9999

    );

    append(

        renderFooter()

    );

}


/*==========================================================
 SEARCH
==========================================================*/

export function renderSearch(keyword){

    clear();

    append(

        renderHeader(),

        section(

            `Search : ${keyword}`

        )

    );

    const grid = create(

        "section",

        "container product-grid"

    );

    append(grid);

    const items =

        APP.products.filter(product=>{

            return Object.values(product)

                .join(" ")

                .toLowerCase()

                .includes(

                    keyword.toLowerCase()

                );

        });

    renderProducts(

        items,

        grid,

        9999

    );

    append(

        renderFooter()

    );

}
/*==========================================================
 JK ENTERPRISES
 UI ENGINE
 Part 3
==========================================================*/

import { getProduct } from "./api.js";

import {
    addToCart
} from "./cart.js";

import {
    money,
    discount,
    toast
} from "./utils.js";


/*==========================================================
 PRODUCT PAGE
==========================================================*/

export function renderProduct(id){

    const item = getProduct(id);

    if(!item){

        return render404();

    }

    clear();

    append(

        renderHeader()

    );

    const page = create(

        "main",

        "container py-4"

    );

    page.innerHTML = `

<div class="row g-5">

    <div class="col-lg-5">

        <div class="product-gallery">

            <div class="gallery-main">

                <img
                    id="mainImage"
                    src="${item.Image1}"
                    class="img-fluid">

            </div>

            <div class="gallery-thumbs">

                <img
                    class="thumb active"
                    src="${item.Image1}">

                ${
                    item.Image2 ?

                    `<img
                        class="thumb"
                        src="${item.Image2}">`

                    :

                    ""

                }

            </div>

        </div>

    </div>


    <div class="col-lg-7">

        <div class="product-page">

            <div class="text-muted">

                ${item.Brand}

            </div>

            <h1>

                ${item["Item Name"]}

            </h1>

            <div class="price-row">

                <span class="sale">

                    ${money(item["Sale Price"])}

                </span>

                <span class="mrp">

                    ${money(item.MRP)}

                </span>

                <span class="save">

                    ${discount(

                        item.MRP,

                        item["Sale Price"]

                    )}% OFF

                </span>

            </div>

            <p>

                ${item.Description}

            </p>

            <table class="table">

                <tbody>

                    <tr>

                        <th>Category</th>

                        <td>${item.Category}</td>

                    </tr>

                    <tr>

                        <th>Subcategory</th>

                        <td>${item.Subcategory}</td>

                    </tr>

                    <tr>

                        <th>Brand</th>

                        <td>${item.Brand}</td>

                    </tr>

                    <tr>

                        <th>Warranty</th>

                        <td>${item.Warranty}</td>

                    </tr>

                    <tr>

                        <th>Weight</th>

                        <td>${item["Weight (kg)"]}</td>

                    </tr>

                    <tr>

                        <th>Dimensions</th>

                        <td>${item["Dimensions (cm)"]}</td>

                    </tr>

                    <tr>

                        <th>Supplier</th>

                        <td>${item.Supplier}</td>

                    </tr>

                </tbody>

            </table>

            <div class="mt-4 d-flex gap-2 flex-wrap">

                <button
                    id="buyButton"
                    class="btn btn-warning">

                    <i class="bi bi-cart-plus"></i>

                    Add to Cart

                </button>

                <button
                    id="shareButton"
                    class="btn btn-outline-dark">

                    <i class="bi bi-share"></i>

                    Share

                </button>

            </div>

        </div>

    </div>

</div>


<section class="mt-5">

<h3>

Detailed Information

</h3>

<div class="card">

<div class="card-body">

${item["Detailed Info"]}

</div>

</div>

</section>


<section class="mt-5">

<h3>

Related Products

</h3>

<div

id="relatedProducts"

class="product-grid">

</div>

</section>

`;

    append(page);

    append(

        renderFooter()

    );



    /*=========================================
      Gallery
    =========================================*/

    page

    .querySelectorAll(".thumb")

    .forEach(image=>{

        image.onclick=()=>{

            $("#mainImage").src=image.src;

            page

            .querySelectorAll(".thumb")

            .forEach(x=>{

                x.classList.remove("active");

            });

            image.classList.add("active");

        };

    });



    /*=========================================
      Cart
    =========================================*/

    $("#buyButton").onclick=()=>{

        addToCart(item);

        toast("Added to Cart");

    };



    /*=========================================
      Share
    =========================================*/

    $("#shareButton").onclick=()=>{

        if(navigator.share){

            navigator.share({

                title:item["Item Name"],

                text:item.Description,

                url:location.href

            });

        }

    };



    /*=========================================
      Related Products
    =========================================*/

    const related=

        APP.products

        .filter(p=>

            p.Category===item.Category &&

            p.ProductID!==item.ProductID

        )

        .slice(0,8);

    renderProducts(

        related,

        $("#relatedProducts"),

        8

    );

}
/*==========================================================
 JK ENTERPRISES
 UI ENGINE
 Part 4
==========================================================*/

import {

    subtotal,
    grandTotal,
    shipping,
    totalDiscount,
    removeFromCart,
    updateQuantity,
    orderPayload,
    clearCart

} from "./cart.js";

import {

    submitOrder

} from "./api.js";


/*==========================================================
 CART
==========================================================*/

export function renderCart(){

    clear();

    append(renderHeader());

    const page=create("main","container py-4");

    page.innerHTML=`

<h2 class="mb-4">

Shopping Cart

</h2>

<div class="row">

<div class="col-lg-8">

<div id="cartItems"></div>

</div>

<div class="col-lg-4">

<div class="summary-card">

<h4>Order Summary</h4>

<hr>

<div class="d-flex justify-content-between">

<span>Subtotal</span>

<strong id="subTotal"></strong>

</div>

<div class="d-flex justify-content-between">

<span>Discount</span>

<strong id="discount"></strong>

</div>

<div class="d-flex justify-content-between">

<span>Shipping</span>

<strong id="shipping"></strong>

</div>

<hr>

<div class="d-flex justify-content-between">

<h5>Total</h5>

<h5 id="grandTotal"></h5>

</div>

<button

id="checkoutBtn"

class="btn btn-warning w-100 mt-3">

Proceed to Checkout

</button>

</div>

</div>

</div>

`;

    append(page);

    append(renderFooter());

    const holder=$("#cartItems");

    holder.innerHTML="";

    if(APP.cart.length===0){

        holder.innerHTML=`

<div class="alert alert-warning">

Your cart is empty.

</div>

`;

        return;

    }

    APP.cart.forEach(item=>{

        const card=create("div","cart-item");

        card.innerHTML=`

<div class="row align-items-center">

<div class="col-md-2">

<img

src="${item.image}"

class="img-fluid">

</div>

<div class="col-md-4">

<h5>

${item.name}

</h5>

<p>

${item.brand}

</p>

</div>

<div class="col-md-2">

${money(item.price)}

</div>

<div class="col-md-2">

<input

class="form-control qty"

type="number"

min="1"

value="${item.qty}">

</div>

<div class="col-md-2 text-end">

<button

class="btn btn-danger remove">

<i class="bi bi-trash"></i>

</button>

</div>

</div>

`;

        holder.append(card);

        card.querySelector(".qty")

        .onchange=e=>{

            updateQuantity(

                item.id,

                e.target.value

            );

            renderCart();

        };

        card.querySelector(".remove")

        .onclick=()=>{

            removeFromCart(item.id);

            renderCart();

        };

    });

    $("#subTotal").textContent=

    money(subtotal());

    $("#discount").textContent=

    money(totalDiscount());

    $("#shipping").textContent=

    money(shipping());

    $("#grandTotal").textContent=

    money(grandTotal());

    $("#checkoutBtn").onclick=()=>{

        location.hash="checkout";

    };

}


/*==========================================================
 CHECKOUT
==========================================================*/

export function renderCheckout(){

    clear();

    append(renderHeader());

    const page=create("main","container py-4");

    page.innerHTML=`

<h2>

Checkout

</h2>

<form id="checkoutForm">

<div class="row">

<div class="col-lg-8">

<div class="card">

<div class="card-body">

<input

class="form-control mb-3"

required

name="name"

placeholder="Full Name">

<input

class="form-control mb-3"

required

name="phone"

placeholder="Phone">

<textarea

class="form-control mb-3"

required

name="address"

placeholder="Delivery Address">

</textarea>

</div>

</div>

</div>

<div class="col-lg-4">

<div class="summary-card">

<h5>Total</h5>

<h3>

${money(grandTotal())}

</h3>

<img

src="${CONFIG.PAYMENT.QR_IMAGE}"

class="img-fluid my-3">

<button

class="btn btn-warning w-100">

Place Order

</button>

</div>

</div>

</div>

</form>

`;

    append(page);

    append(renderFooter());

    $("#checkoutForm")

    .onsubmit=async e=>{

        e.preventDefault();

        const form=new FormData(

            e.target

        );

        const customer={

            name:form.get("name"),

            phone:form.get("phone"),

            address:form.get("address")

        };

        const order=

        orderPayload(customer);

        const result=

        await submitOrder(order);

        if(result.success){

            clearCart();

            location.hash="success";

        }

        else{

            toast(

                "Order Failed"

            );

        }

    };

}


/*==========================================================
 SUCCESS
==========================================================*/

export function renderSuccess(){

    clear();

    append(renderHeader());

    const page=create(

        "main",

        "container py-5 text-center"

    );

    page.innerHTML=`

<div class="success-card">

<i

class="bi bi-check-circle-fill display-1 text-success">

</i>

<h2>

Thank You!

</h2>

<p>

Your order has been placed successfully.

</p>

<a

href="./"

class="btn btn-warning">

Continue Shopping

</a>

</div>

`;

    append(page);

    append(renderFooter());

}
/*==========================================================
 JK ENTERPRISES
 UI ENGINE
 Part 5
==========================================================*/

import { searchProducts } from "./api.js";
import { search, navigate } from "./router.js";

/*==========================================================
 HEADER EVENTS
==========================================================*/

export function bindHeaderEvents() {

    const searchInput = $("#searchInput");
    const searchButton = $("#searchBtn");
    const cartButton = $("#cartButton");

    if (searchButton) {

        searchButton.onclick = () => {

            const value = searchInput.value.trim();

            if (!value) return;

            search(value);

        };

    }

    if (searchInput) {

        searchInput.onkeydown = e => {

            if (e.key === "Enter") {

                e.preventDefault();

                searchButton.click();

            }

        };

    }

    if (cartButton) {

        cartButton.onclick = () => {

            navigate("cart");

        };

    }

}

/*==========================================================
 LIVE SEARCH
==========================================================*/

export function bindSearchSuggestions() {

    const input = $("#searchInput");

    if (!input) return;

    input.oninput = () => {

        const keyword = input.value.trim();

        const box = $("#searchSuggestions");

        if (!box) return;

        if (keyword.length < 2) {

            box.innerHTML = "";

            return;

        }

        const results =

            searchProducts(keyword)

            .slice(0, 8);

        box.innerHTML = "";

        results.forEach(product => {

            const item = create(

                "div",

                "search-item"

            );

            item.innerHTML = `

<img src="${product.Image1}">

<div>

<strong>

${product["Item Name"]}

</strong>

<small>

${money(product["Sale Price"])}

</small>

</div>

`;

            item.onclick = () => {

                product(product.ProductID);

            };

            box.append(item);

        });

    };

}

/*==========================================================
 CONTACT
==========================================================*/

export function renderContact() {

    clear();

    append(renderHeader());

    const page = create(

        "main",

        "container py-5"

    );

    page.innerHTML = `

<h2>Contact Us</h2>

<div class="card">

<div class="card-body">

<h4>

JK Enterprises

</h4>

<p>

Panipat, Haryana

</p>

<p>

Phone :

${CONFIG.COMPANY.PHONE}

</p>

<p>

Email :

${CONFIG.COMPANY.EMAIL}

</p>

<p>

WhatsApp :

${CONFIG.COMPANY.WHATSAPP}

</p>

</div>

</div>

`;

    append(page);

    append(renderFooter());

}

/*==========================================================
 TERMS
==========================================================*/

export function renderTerms() {

    clear();

    append(renderHeader());

    const page = create(

        "main",

        "container py-5"

    );

    page.innerHTML = `

<h2>

Terms & Conditions

</h2>

<div class="card">

<div class="card-body">

<p>

By placing an order you agree to

JK Enterprises'

terms and conditions.

</p>

<p>

Prices may change without notice.

</p>

<p>

Warranty depends on manufacturer.

</p>

</div>

</div>

`;

    append(page);

    append(renderFooter());

}

/*==========================================================
 RETURNS
==========================================================*/

export function renderReturns() {

    clear();

    append(renderHeader());

    const page = create(

        "main",

        "container py-5"

    );

    page.innerHTML = `

<h2>

Return Policy

</h2>

<div class="card">

<div class="card-body">

<p>

Products may be returned

within applicable policy.

</p>

<p>

Physical damage is not covered.

</p>

<p>

Warranty is handled by the

respective manufacturer.

</p>

</div>

</div>

`;

    append(page);

    append(renderFooter());

}

/*==========================================================
 404
==========================================================*/

export function render404() {

    clear();

    append(renderHeader());

    const page = create(

        "main",

        "container py-5 text-center"

    );

    page.innerHTML = `

<h1>

404

</h1>

<p>

Page Not Found

</p>

<button

class="btn btn-warning"

id="backHome">

Go Home

</button>

`;

    append(page);

    append(renderFooter());

    $("#backHome").onclick = () => {

        navigate("home");

    };

}

/*==========================================================
 HOME EVENTS
==========================================================*/

export function bindHomeEvents() {

    $(".category-list")

    ?.addEventListener(

        "click",

        e => {

            const button =

            e.target.closest(

                ".category-chip"

            );

            if (!button) return;

            renderCategory(

                button.dataset.category

            );

        }

    );

    $(".brand-list")

    ?.addEventListener(

        "click",

        e => {

            const button =

            e.target.closest(

                ".brand-chip"

            );

            if (!button) return;

            renderBrand(

                button.dataset.brand

            );

        }

    );

}

/*==========================================================
 APPLICATION EVENTS
==========================================================*/

export function bindEvents() {

    bindHeaderEvents();

    bindSearchSuggestions();

    bindHomeEvents();

}

/*==========================================================
 REFRESH HEADER
==========================================================*/

export function refreshHeader() {

    const badge = $("#cartBadge");

    if (!badge) return;

    badge.textContent =

    cartCount();

}

/*==========================================================
 INIT UI
==========================================================*/

export function initializeUI() {

    bindEvents();

    refreshHeader();

}