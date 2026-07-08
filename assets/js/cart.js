/*==========================================================
 JK Enterprises
 cart.js
 Version : 1.0
 Shopping Cart Module
==========================================================*/

"use strict";

import CONFIG from "./config.js";
import Utils from "./utils.js";
import UI from "./ui.js";

const Cart={

/*==========================================================
 Initialize
==========================================================*/

init(){

    this.items=this.load();

    this.events();

    this.updateCount();

},



/*==========================================================
 Load
==========================================================*/

load(){

    return Utils.load(

        CONFIG.STORAGE.CART,

        []

    );

},



/*==========================================================
 Save
==========================================================*/

save(){

    Utils.save(

        CONFIG.STORAGE.CART,

        this.items

    );

    this.updateCount();

},



/*==========================================================
 Add Item
==========================================================*/

add(product, qty = 1){

    console.log("ADD()", product);

    const item = this.items.find(i => i.id === product.id);

    if(item){

        item.quantity += qty;

    }else{

        this.items.push({

            id: product.id,
            sku: product.sku,
            name: product.name,
            image: product.image || "",
            price: Number(product.price || 0),
            quantity: qty

        });

    }

    console.log("Items:", this.items);

    this.save();

    console.log("Saved");

    this.render();

    if(UI && typeof UI.toast === "function"){
        UI.toast("Added to cart");

    }else{

        console.warn("UI.toast() not found");

    }

},



/*==========================================================
 Remove Item
==========================================================*/

remove(id){

    this.items=this.items.filter(

        item=>item.id!==id

    );

    this.save();

    this.render();

},




/*==========================================================
 Update Quantity
==========================================================*/

quantity(id,qty){

    const item=this.items.find(

        i=>i.id===id

    );

    if(!item)return;

    item.quantity=Math.max(

        1,

        Number(qty)

    );

    this.save();

    this.render();

},




/*==========================================================
 Clear
==========================================================*/

clear(){

    this.items=[];

    this.save();

    this.render();

},




/*==========================================================
 Count
==========================================================*/

count(){

    return this.items.reduce(

        (t,i)=>t+i.quantity,

        0

    );

},




/*==========================================================
 Total
==========================================================*/

total(){

    return this.items.reduce(

        (t,i)=>

        t+(i.price*i.quantity),

        0

    );

},




/*==========================================================
 Update Header Count
==========================================================*/

updateCount(){

    const count = this.count();

    document
        .querySelectorAll("[data-cart-count]")
        .forEach(el => {
            el.textContent = count;
        });

    const desktop = document.getElementById("cartCount");
    if (desktop) {
        desktop.textContent = count;
    }

    const mobile = document.getElementById("cartCountMobile");
    if (mobile) {
        mobile.textContent = count;
    }

},

/*==========================================================
 Render Cart Page
==========================================================*/

render(){

    const list=

    document.getElementById(

        "cartItems"

    );

    if(!list)return;

    if(!this.items.length){

        UI.empty(

            list,

            "Your cart is empty",

            "Add products to continue shopping."

        );

        return;

    }

    list.innerHTML=

    this.items.map(

        item=>`

<div class="cart-item">

<div class="cart-item-image">

<img

src="${item.image}"

alt="${item.name}"

loading="lazy">

</div>

<div>

<h5>

${item.name}

</h5>

<p>

${Utils.price(item.price)}

</p>

<div class="quantity-control">

<button

data-minus="${item.id}">

−

</button>

<input

type="number"

value="${item.quantity}"

min="1"

data-qty="${item.id}">

<button

data-plus="${item.id}">

+

</button>

</div>

</div>

<div>

<strong>

${Utils.price(

item.price*item.quantity

)}

</strong>

<br>

<button

class="btn btn-sm btn-outline-danger"

data-remove="${item.id}">

Remove

</button>

</div>

</div>

`

    ).join("");

    this.summary();

    this.bind();

},




/*==========================================================
 Summary
==========================================================*/

summary(){

    const total=this.total();

    const subtotal=document.getElementById("subtotal");
    if(subtotal)
        subtotal.textContent=Utils.price(total);

    const grand=document.getElementById("grandTotal");
    if(grand)
        grand.textContent=Utils.price(total);

    const count=document.getElementById("cartItemCount");
    if(count)
        count.textContent=this.count();

},



/*==========================================================
 Bind Buttons
==========================================================*/

bind(){

    document

    .querySelectorAll(

        "[data-remove]"

    )

    .forEach(btn=>{

        btn.onclick=()=>

        this.remove(

            btn.dataset.remove

        );

    });



    document

    .querySelectorAll(

        "[data-plus]"

    )

    .forEach(btn=>{

        btn.onclick=()=>{

            const id=

            btn.dataset.plus;

            const item=

            this.items.find(

                i=>i.id===id

            );

            this.quantity(

                id,

                item.quantity+1

            );

        };

    });



    document

    .querySelectorAll(

        "[data-minus]"

    )

    .forEach(btn=>{

        btn.onclick=()=>{

            const id=

            btn.dataset.minus;

            const item=

            this.items.find(

                i=>i.id===id

            );

            this.quantity(

                id,

                item.quantity-1

            );

        };

    });

},




/*==========================================================
 Events
==========================================================*/

events(){

    document.addEventListener("cart:add",e=>{

        this.add(
            e.detail.product,
            e.detail.quantity || 1
        );

    });

    document.body.addEventListener("click",async e=>{

        /*======================================================
          ADD TO CART
        ======================================================*/

        const cartBtn=e.target.closest("[data-cart-add]");

        if(cartBtn){

            e.preventDefault();

            const id=cartBtn.dataset.cartAdd;

            const {default:API}=await import("./api.js");

            const response=await API.product(id);

            if(response.success && response.data){

                this.add(response.data,1);

            }else{

                console.error("Product not found.");

            }

            return;

        }

        /*======================================================
          VIEW DETAILS
        ======================================================*/

        const detailsBtn=e.target.closest("[data-product-view]");

        if(detailsBtn){

            e.preventDefault();

            window.location.href=
                `product.html?id=${detailsBtn.dataset.productView}`;

            return;

        }

        /*======================================================
          PROCEED TO CHECKOUT
        ======================================================*/

        const checkoutBtn=e.target.closest("#checkoutButton");

        if(checkoutBtn){

            e.preventDefault();

            if(!this.items.length){

                UI.toast("Your cart is empty");

                return;

            }

            window.location.href="checkout.html";

            return;

        }

    });

}

};

export default Cart;