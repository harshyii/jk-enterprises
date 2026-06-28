/*==========================================================
 JK ENTERPRISES
 UTILITIES
==========================================================*/

import CONFIG from "./config.js";

/*==========================================================
 DOM
==========================================================*/

export const $ = (selector, parent = document) =>
    parent.querySelector(selector);

export const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

/*==========================================================
 CREATE ELEMENT
==========================================================*/

export function create(tag, className = "", html = "") {

    const el = document.createElement(tag);

    if (className)
        el.className = className;

    if (html)
        el.innerHTML = html;

    return el;

}

/*==========================================================
 PRICE FORMAT
==========================================================*/

export function money(value = 0) {

    return Number(value).toLocaleString(
        CONFIG.MONEY.LOCALE,
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    );

}

/*==========================================================
 DISCOUNT
==========================================================*/

export function discount(mrp, sale) {

    mrp = Number(mrp);
    sale = Number(sale);

    if (!mrp || sale >= mrp)
        return 0;

    return Math.round(
        ((mrp - sale) / mrp) * 100
    );

}

/*==========================================================
 SLUG
==========================================================*/

export function slug(text = "") {

    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

}

/*==========================================================
 DEBOUNCE
==========================================================*/

export function debounce(fn, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delay);

    };

}

/*==========================================================
 THROTTLE
==========================================================*/

export function throttle(fn, limit = 250) {

    let wait = false;

    return (...args) => {

        if (wait) return;

        fn(...args);

        wait = true;

        setTimeout(() => {

            wait = false;

        }, limit);

    };

}

/*==========================================================
 STORAGE
==========================================================*/

export function save(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

export function load(key, fallback = null) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) ?? fallback;

    } catch {

        return fallback;

    }

}

export function remove(key) {

    localStorage.removeItem(key);

}

/*==========================================================
 UUID
==========================================================*/

export function uuid() {

    return crypto.randomUUID();

}

/*==========================================================
 DATE
==========================================================*/

export function today() {

    return new Date().toLocaleDateString(
        "en-IN"
    );

}

/*==========================================================
 URL PARAMS
==========================================================*/

export function param(name) {

    return new URLSearchParams(
        location.search
    ).get(name);

}

/*==========================================================
 IMAGE FALLBACK
==========================================================*/

export function fallback(img) {

    img.onerror = null;

    img.src = CONFIG.IMAGE.PLACEHOLDER;

}

/*==========================================================
 COPY
==========================================================*/

export async function copy(text) {

    await navigator.clipboard.writeText(text);

}

/*==========================================================
 SHARE
==========================================================*/

export async function share(data) {

    if (navigator.share) {

        await navigator.share(data);

    }

}

/*==========================================================
 SCROLL
==========================================================*/

export function top() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*==========================================================
 LOADER
==========================================================*/

export function loader(show = true) {

    const el = $("#loader");

    if (!el) return;

    el.style.display = show
        ? "flex"
        : "none";

}

/*==========================================================
 TOAST
==========================================================*/

export function toast(message) {

    const body = $(".toast-body");

    if (!body) return;

    body.textContent = message;

    new bootstrap.Toast(
        $("#appToast")
    ).show();

}

/*==========================================================
 WAIT
==========================================================*/

export function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

/*==========================================================
 UNIQUE
==========================================================*/

export function unique(array) {

    return [...new Set(array)];

}

/*==========================================================
 SORT
==========================================================*/

export function sortByName(array) {

    return array.sort((a, b) =>

        a["Item Name"].localeCompare(
            b["Item Name"]
        )

    );

}

/*==========================================================
 GROUP
==========================================================*/

export function group(array, key) {

    return array.reduce((obj, item) => {

        (obj[item[key]] ??= []).push(item);

        return obj;

    }, {});

}

/*==========================================================
 RANDOM
==========================================================*/

export function random(array, limit = 10) {

    return [...array]

        .sort(() => Math.random() - .5)

        .slice(0, limit);

}

/*==========================================================
 FEATURED
==========================================================*/

export function featured(products) {

    return [...products]

        .sort((a, b) =>

            Number(b["Discount%"]) -

            Number(a["Discount%"])

        )

        .slice(0, CONFIG.PRODUCT.FEATURED_LIMIT);

}

/*==========================================================
 LATEST
==========================================================*/

export function latest(products) {

    return [...products]

        .sort((a, b) =>

            new Date(b["Date Added"]) -

            new Date(a["Date Added"])

        )

        .slice(0, CONFIG.PRODUCT.NEW_LIMIT);

}

/*==========================================================
 CATEGORIES
==========================================================*/

export function categories(products) {

    return unique(

        products.map(

            p => p.Category

        )

    ).sort();

}

/*==========================================================
 BRANDS
==========================================================*/

export function brands(products) {

    return unique(

        products.map(

            p => p.Brand

        )

    ).sort();

}

/*==========================================================
 SEARCH
==========================================================*/

export function search(products, keyword) {

    keyword = keyword.toLowerCase();

    return products.filter(p =>

        Object.values(p)

            .join(" ")

            .toLowerCase()

            .includes(keyword)

    );

}

/*==========================================================
 DYNAMIC UPI QR
==========================================================*/

export function generateUPIQR(amount){

    amount=Number(amount).toFixed(2);

    const upi=

        `upi://pay?`+

        `pa=${encodeURIComponent(CONFIG.PAYMENT.UPI_ID)}`+

        `&pn=${encodeURIComponent(CONFIG.PAYMENT.NAME)}`+

        `&am=${amount}`+

        `&cu=${CONFIG.PAYMENT.CURRENCY}`+

        `&tn=${encodeURIComponent(CONFIG.PAYMENT.NOTE)}`;

    return

`https://quickchart.io/qr?size=320&text=${encodeURIComponent(upi)}`;

}