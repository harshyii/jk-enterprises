/*==========================================================
 JK ENTERPRISES
 CART SERVICE
==========================================================*/

import CONFIG,{APP} from "./config.js";

import{
    load,
    save
}from "./utils.js";


/*==========================================================
 LOAD CART
==========================================================*/

export function loadCart(){

    APP.cart=load(

        CONFIG.STORAGE.CART,

        []

    );

    return APP.cart;

}


/*==========================================================
 SAVE CART
==========================================================*/

function saveCart(){

    save(

        CONFIG.STORAGE.CART,

        APP.cart

    );

    document.dispatchEvent(

        new CustomEvent(

            "cart-updated",

            {

                detail:APP.cart

            }

        )

    );

}


/*==========================================================
 CART COUNT
==========================================================*/

export function cartCount(){

    return APP.cart.reduce(

        (sum,item)=>

        sum+Number(item.qty),

        0

    );

}


/*==========================================================
 FIND ITEM
==========================================================*/

function indexOf(id){

    return APP.cart.findIndex(

        item=>

        String(item.id)===String(id)

    );

}


/*==========================================================
 ADD
==========================================================*/

export function addToCart(product, qty = 1){

    qty = Number(qty);

    if(qty < 1) qty = 1;

    const index = indexOf(product.ProductID);

    if(index > -1){

        APP.cart[index].qty += qty;

    }

    else{

        APP.cart.push({

            id: String(product.ProductID),

            sku: product.SKU || "",

            name: product["Item Name"],

            brand: product.Brand || "",

            image: product.Image1 || "",

            price: parseFloat(product["Sale Price"]) || 0,

            mrp: parseFloat(product.MRP) || parseFloat(product["Sale Price"]) || 0,
            qty: qty,

            stock: Number(product["Stock Quantity"]) || 0

        });

    }

    saveCart();

    return cartCount();

}



/*==========================================================
 REMOVE
==========================================================*/

export function removeFromCart(id){

    APP.cart=

    APP.cart.filter(

        item=>

        String(item.id)!==String(id)

    );

    saveCart();

}


/*==========================================================
 UPDATE
==========================================================*/

export function updateQuantity(id,qty){

    qty=Number(qty);

    const item=APP.cart.find(

        x=>String(x.id)===String(id)

    );

    if(!item) return;

    if(qty<=0){

        removeFromCart(id);

        return;

    }

    if(item.stock>0){

        qty=Math.min(

            qty,

            item.stock

        );

    }

    item.qty=qty;

    saveCart();

}


/*==========================================================
 CLEAR
==========================================================*/

export function clearCart(){

    APP.cart=[];

    saveCart();

}



/*==========================================================
MRP TOTAL
==========================================================*/

export function mrpTotal(){

    return APP.cart.reduce(

        (sum,item)=>

        sum + (Number(item.mrp || item.MRP || item.price) * item.qty),

        0

    );

}


/*==========================================================
SALE SUBTOTAL
==========================================================*/

export function subtotal(){

    return APP.cart.reduce(

        (sum,item)=>

        sum + (Number(item.price || item["Sale Price"]) * item.qty),

        0

    );

}


/*==========================================================
TOTAL DISCOUNT
==========================================================*/

export function discountTotal(){

    return Math.max(

        0,

        mrpTotal() - subtotal()

    );

}


/*==========================================================
SHIPPING
==========================================================*/

export function shipping(){

    if(APP.cart.length===0)

        return 0;

    return subtotal()>=999 ? 0 : 80;

}


/*==========================================================
GRAND TOTAL
==========================================================*/

export function grandTotal(){

    return subtotal() + shipping();

}

/*==========================================================
 ITEM
==========================================================*/

export function cartItem(id){

    return APP.cart.find(

        item=>

        String(item.id)===String(id)

    );

}


/*==========================================================
 EXISTS
==========================================================*/

export function inCart(id){

    return indexOf(id)>-1;

}


/*==========================================================
 EXPORT ORDER
==========================================================*/

export function orderItems(){

    return APP.cart.map(item=>({

        ProductID:item.id,

        SKU:item.sku,

        Name:item.name,

        Qty:item.qty,

        MRP:item.mrp,

        Price:item.price,

        Total:item.qty*item.price

    }));

}


/*==========================================================
 EXPORT ORDER JSON
==========================================================*/

export function orderPayload(customer){

return{

    customer,

    items:orderItems(),

    mrp:mrpTotal(),

    subtotal:subtotal(),

    discount:discountTotal(),

    shipping:shipping(),

    total:grandTotal(),

    payment:"UPI"

};

}


/*==========================================================
 INIT
==========================================================*/

loadCart();