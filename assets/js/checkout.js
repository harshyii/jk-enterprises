/*==========================================================
 JK Enterprises
 checkout.js
 Version : 1.0
 Checkout Module
==========================================================*/

"use strict";

import API from "./api.js";
import Cart from "./cart.js";
import Utils from "./utils.js";
import UI from "./ui.js";

const Checkout={

/*==========================================================
 Initialize
==========================================================*/

init(){

    if(!document.getElementById("checkoutForm"))

        return;

    this.summary();

    this.generateQR();

    this.bind();
},



/*==========================================================
 Summary
==========================================================*/

summary(){

    const items=

    document.getElementById(

        "checkoutItems"

    );



    const total=

    document.getElementById(

        "checkoutTotal"

    );



    if(items){

        items.innerHTML=

        Cart.items.map(item=>`

<div class="summary-item">

<span>

${item.name}

× ${item.quantity}

</span>

<strong>

${Utils.price(

item.price*item.quantity

)}

</strong>

</div>

`).join("");

    }



    if(total){

    total.textContent = Utils.price(Cart.total());

    this.generateQR();

}

},

/*==========================================================
 Events
==========================================================*/

bind(){

    document

    .getElementById(

        "checkoutForm"

    )

    ?.addEventListener(

        "submit",

        e=>this.submit(e)

    );



    document

    .querySelectorAll(

        "[name='paymentMethod']"

    )

    .forEach(radio=>{

        radio.addEventListener(

            "change",

            ()=>this.payment()

        );

    });

},

/*==========================================================
 Payment
==========================================================*/

payment(){

    const method=

    document.querySelector(

        "[name='paymentMethod']:checked"

    )?.value;



    document

    .querySelectorAll(

        "[data-payment]"

    )

    .forEach(box=>{

        box.hidden=

        box.dataset.payment!==method;

    });

},

/*==========================================================
 Validation
==========================================================*/

validate(form){

    if(

        !form.checkValidity()

    ){

        form.reportValidity();

        return false;

    }



    if(

        Cart.items.length===0

    ){

        UI.toast(

            "Cart is empty",

            "danger"

        );



        return false;

    }



    return true;

},

/*==========================================================
 Form Data
==========================================================*/

data(form){

    const fd=

    new FormData(form);



    return{

        customer:{

            name:

            fd.get("name"),

            phone:

            fd.get("phone"),

            email:

            fd.get("email")

        },



        address:{

            address:

            fd.get("address"),

            city:

            fd.get("city"),

            state:

            fd.get("state"),

            pincode:

            fd.get("pincode")

        },



        payment:

        fd.get(

            "paymentMethod"

        ),



        items:

        Cart.items,



        total:

        Cart.total()

    };

},

/*==========================================================
 Submit
==========================================================*/

async submit(e){

    e.preventDefault();



    const form=e.target;



    if(

        !this.validate(form)

    )

        return;



    const button=

    form.querySelector(

        "[type='submit']"

    );



    button.disabled=true;

    button.textContent=

    "Placing Order...";



    const response=

    await API.order(

        this.data(form)

    );



    button.disabled=false;

    button.textContent=

    "Place Order";



    if(

        !response.success

    ){

        UI.toast(

            response.message||

            "Order failed.",

            "danger"

        );



        return;

    }



    Cart.clear();



    UI.toast(

        "Order placed successfully."

    );



    window.location =
    `success.html?order=${response.orderId}`;
},

/*==========================================================
 Success
==========================================================*/

success(){

    const id = new URLSearchParams(location.search).get("success");

    if(!id) return;

    document
        .getElementById("checkoutSuccess")
        ?.removeAttribute("hidden");

    const order = document.getElementById("orderNumber");

    if(order)
        order.textContent = id;

},

/*==========================================================
 UPI QR
==========================================================*/

generateQR(){

    if(typeof QRCode==="undefined"){

        console.error("QRCode library missing");

        return;

    }

    const amount = Number(Cart.total()).toFixed(2);

    const upi =
`upi://pay?pa=9050623210@sbi&pn=JK Enterprises&am=${amount}&cu=INR&tn=Order`;


    console.log(upi);

    const qr = document.getElementById("upiQR");

    qr.innerHTML="";

    new QRCode(qr,{
        text: upi,
        width:250,
        height:250
    });

}

};

export default Checkout;