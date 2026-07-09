/*==========================================================
 JK Enterprises
 router.js
 Version : 2.0
 Client Side Router
==========================================================*/

"use strict";

const Router = {

    /*======================================================
     Initialize
    ======================================================*/

    init() {

        this.page = this.currentPage();
        this.params = Object.fromEntries(
            new URLSearchParams(window.location.search)
        );

    },

    /*======================================================
     Current Page
    ======================================================*/

    currentPage() {

        const page = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        return page || "index.html";

    },

    /*======================================================
     URL Parameters
    ======================================================*/

    query(key, fallback = "") {

        return this.params[key] ?? fallback;

    },

    /*======================================================
     Common Parameters
    ======================================================*/

    id() {

        return this.query("id");

    },

    slug() {

        return this.query("slug");

    },

    brand() {

        return this.query("brand");

    },

    category() {

        return this.query("category");

    },

    search() {

        return this.query("q");

    },

    sort() {

        return this.query("sort");

    },

    filter() {

        return this.query("filter");

    },

    pageNumber() {

        return Number(this.query("page", 1));

    },

    /*======================================================
     Page Checks
    ======================================================*/

    is(name) {

        return this.page === name.toLowerCase();

    },

    isHome() { return this.is("index.html"); },

    isProducts() { return this.is("products.html"); },

    isProduct() { return this.is("product.html"); },

    isBrands() { return this.is("brands.html"); },

    isBrand() { return this.is("brand.html"); },

    isBlogs() { return this.is("blogs.html"); },

    isBlog() { return this.is("blog.html"); },

    isSearch() { return this.is("search.html"); },

    isCart() { return this.is("cart.html"); },

    isCheckout() { return this.is("checkout.html"); },

    isContact() { return this.is("contact.html"); },

    isAbout() { return this.is("about.html"); },

    isFAQ() { return this.is("faq.html"); },

    is404() { return this.is("404.html"); }

};

Router.init();

export default Router;