/*==========================================================
 JK ENTERPRISES
 API SERVICE
 Google Apps Script Backend
==========================================================*/

import CONFIG, { APP, ACTION } from "./config.js";

import {
    load,
    save,
    loader,
    categories,
    brands
} from "./utils.js";

/*==========================================================
 FETCH WITH TIMEOUT
==========================================================*/

async function request(url, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, CONFIG.API.TIMEOUT);

    try {

        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        if (!response.ok)
            throw new Error(
                `HTTP ${response.status}`
            );

        return await response.json();

    } finally {

        clearTimeout(timeout);

    }

}

/*==========================================================
 CACHE VALIDATION
==========================================================*/

function cacheValid() {

    const time = Number(

        localStorage.getItem(

            CONFIG.CACHE.PRODUCTS_TIME

        )

    );

    if (!time)
        return false;

    return (

        Date.now() - time

    ) < CONFIG.CACHE.EXPIRE;

}

/*==========================================================
 SAVE CACHE
==========================================================*/

function saveProducts(products) {

    save(

        CONFIG.CACHE.PRODUCTS,

        products

    );

    localStorage.setItem(

        CONFIG.CACHE.PRODUCTS_TIME,

        Date.now()

    );

}

/*==========================================================
 LOAD PRODUCTS
==========================================================*/

export async function getProducts(force = false) {

    if (

        !force &&

        cacheValid()

    ) {

        const cached = load(

            CONFIG.CACHE.PRODUCTS,

            []

        );

        if (cached.length) {

            APP.products = cached;

            APP.categories = categories(cached);

            APP.brands = brands(cached);

            return cached;

        }

    }

    loader(true);

    try {

        const url =

            `${CONFIG.API.BASE_URL}?action=${ACTION.PRODUCTS}`;

        const result = await request(url);

        const products =

            result.products ||

            result.data ||

            result;

        APP.products = products;

        APP.categories = categories(products);

        APP.brands = brands(products);

        saveProducts(products);

        return products;

    } catch (error) {

        console.error(error);

        const cached = load(

            CONFIG.CACHE.PRODUCTS,

            []

        );

        return cached;

    } finally {

        loader(false);

    }

}

/*==========================================================
 GET PRODUCT
==========================================================*/

export function getProduct(id) {

    return APP.products.find(

        p =>

        String(p.ProductID) === String(id)

    );

}

/*==========================================================
 PRODUCTS BY CATEGORY
==========================================================*/

export function byCategory(category) {

    return APP.products.filter(

        p =>

        p.Category === category

    );

}

/*==========================================================
 PRODUCTS BY BRAND
==========================================================*/

export function byBrand(brand) {

    return APP.products.filter(

        p =>

        p.Brand === brand

    );

}

/*==========================================================
 SEARCH
==========================================================*/

export function searchProducts(keyword) {

    keyword = keyword.toLowerCase();

    return APP.products.filter(product =>

        Object.values(product)

            .join(" ")

            .toLowerCase()

            .includes(keyword)

    );

}

/*==========================================================
 RELATED PRODUCTS
==========================================================*/

export function relatedProducts(product) {

    return APP.products

        .filter(p =>

            p.Category === product.Category &&

            p.ProductID !== product.ProductID

        )

        .slice(0, 8);

}

/*==========================================================
 SUBMIT ORDER
==========================================================*/

export async function submitOrder(order) {

    loader(true);

    try {

        const response = await request(

            CONFIG.API.BASE_URL,

            {

                method: "POST",

                headers: {

                    "Content-Type":

                    "application/json"

                },

                body: JSON.stringify({

                    action: ACTION.ORDER,

                    order

                })

            }

        );

        return response;

    }

    finally {

        loader(false);

    }

}

/*==========================================================
 REFRESH CACHE
==========================================================*/

export async function refreshProducts() {

    return getProducts(true);

}

/*==========================================================
 APPLICATION INIT
==========================================================*/

export async function initializeProducts() {

    await getProducts();

    return {

        products: APP.products,

        categories: APP.categories,

        brands: APP.brands

    };

}