/* =========================================
   SPYRO
   CART + CHECKOUT + OTP + WHATSAPP
========================================= */


/* =========================================
   YOUR WHATSAPP NUMBER
========================================= */

/*
   IMPORTANT:
   Use country code + number.

   Example for India:
   919876543210

   Do NOT use:
   +91 9876543210
   09876543210
*/

const WHATSAPP_NUMBER = "919995546022";


/* =========================================
   CART
========================================= */

let cart = [];
let currentOTP = "";
let currentOrder = null;


/* =========================================
   WEIGHT SELECTION
========================================= */

function selectWeight(button, weight, price) {

    const productCard = button.closest(".product-card");

    if (!productCard) return;

    const buttons =
        productCard.querySelectorAll(".weight-button");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const priceElement =
        productCard.querySelector(".product-price");

    if (priceElement) {
        priceElement.textContent = "₹" + price;
    }
}


/* =========================================
   ADD SELECTED PRODUCT
========================================= */

function addSelectedProduct(button, name, basePrice) {

    const productCard =
        button.closest(".product-card");

    if (!productCard) {
        showNotification("Product card not found");
        return;
    }

    const activeWeight =
        productCard.querySelector(".weight-button.active");

    if (!activeWeight) {
        showNotification("Please select a weight");
        return;
    }

    const weight =
        activeWeight.textContent.trim();

    let multiplier = 1;

    if (weight === "2 kg") {
        multiplier = 2;
    }

    if (weight === "5 kg") {
        multiplier = 5;
    }

    const price =
        basePrice * multiplier;

    addToCart(
        name,
        weight,
        price
    );
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, weight, price) {

    const existingProduct =
        cart.find(function(item) {

            return (
                item.name === name &&
                item.weight === weight
            );

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,
            weight: weight,
            price: price,
            quantity: 1

        });

    }


    updateCart();

    showNotification(
        name + " added to cart"
    );
}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="color:#777;padding:25px 0;">
                Your cart is empty.
            </p>
        `;

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }


    let total = 0;
    let totalQuantity = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        totalQuantity += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ${item.weight} × ₹${item.price}
                </span>

                <span>
                    Total: ₹${itemTotal}
                </span>

            </div>


            <div class="cart-item-actions">

                <button
                    class="quantity-button"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span class="quantity-number">
                    ${item.quantity}
                </span>

                <button
                    class="quantity-button"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button
                    class="remove-button"
                    onclick="removeProduct(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    if (cartCount) {
        cartCount.textContent =
            totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent =
            "₹" + total;
    }
}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity++;

    updateCart();
}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(index) {

    if (!cart[index]) return;


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();
}


/* =========================================
   REMOVE PRODUCT
========================================= */

function removeProduct(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();

    showNotification(
        "Product removed"
    );
}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    updateCart();

    const popup =
        document.getElementById("cartPopup");

    if (popup) {
        popup.classList.add("active");
    }
}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const popup =
        document.getElementById("cartPopup");

    if (popup) {
        popup.classList.remove("active");
    }
}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterProducts(category, button) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(".category-button");


    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    if (button) {
        button.classList.add("active");
    }


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });
}


/* =========================================
   PRODUCT DETAILS
========================================= */

const productDetails = {

    "Spicy Mix": {

        description:
            "A rich spicy blend designed for delicious chicken dishes.",

        suitable:
            "Fried chicken, spicy chicken and other chicken recipes.",

        price: 149

    },


    "Breading Mix": {

        description:
            "A crispy coating mix for delicious fried chicken.",

        suitable:
            "Fried chicken, strips, wings and crispy chicken.",

        price: 159

    },


    "Grill Marinade": {

        description:
            "A bold marinade created for grilled chicken.",

        suitable:
            "Grilled chicken, barbecue-style chicken and roasted chicken.",

        price: 169

    },


    "Mexican Marinade": {

        description:
            "A Mexican-inspired marinade with a bold flavour profile.",

        suitable:
            "Mexican-style chicken, grilled chicken and wraps.",

        price: 169

    },


    "Cheesy Sauce Mix": {

        description:
            "A creamy cheesy mix for making rich sauces.",

        suitable:
            "Chicken dishes, fries, burgers and snacks.",

        price: 179

    }

};


function openDetails(name) {

    const product =
        productDetails[name];

    if (!product) return;


    const title =
        document.getElementById("detailsTitle");

    const content =
        document.getElementById("detailsContent");


    if (title) {
        title.textContent = name;
    }


    if (content) {

        content.innerHTML = `

            <p>
                ${product.description}
            </p>

            <ul class="details-list">

                <li>
                    ${product.suitable}
                </li>

                <li>
                    Available in 1 kg, 2 kg and 5 kg.
                </li>

            </ul>

            <div class="details-price">
                Starting from ₹${product.price} / kg
            </div>

        `;

    }


    const popup =
        document.getElementById("detailsPopup");

    if (popup) {
        popup.classList.add("active");
    }
}


function closeDetails() {

    const popup =
        document.getElementById("detailsPopup");

    if (popup) {
        popup.classList.remove("active");
    }
}


/* =========================================
   CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty"
        );

        return;
    }


    renderCheckoutSummary();

    closeCart();


    const popup =
        document.getElementById("checkoutPopup");

    if (popup) {
        popup.classList.add("active");
    }
}


function closeCheckout() {

    const popup =
        document.getElementById("checkoutPopup");

    if (popup) {
        popup.classList.remove("active");
    }
}


/* =========================================
   CHECKOUT SUMMARY
========================================= */

function renderCheckoutSummary() {

    const summary =
        document.getElementById("checkoutSummary");

    const totalElement =
        document.getElementById("checkoutTotal");


    if (!summary || !totalElement) return;


    summary.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const line =
            document.createElement("div");

        line.className =
            "summary-line";


        line.innerHTML = `

            <span>
                ${item.name}
                (${item.weight}) × ${item.quantity}
            </span>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        summary.appendChild(line);

    });


    totalElement.textContent =
        "₹" + total;
}


/* =========================================
   PLACE ORDER
========================================= */

function placeOrder(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("customerName")
            .value
            .trim();


    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    /* NEW COUNTRY */

    const country =
        document
            .getElementById("customerCountry")
            .value
            .trim();


    /* NEW STATE */

    const state =
        document
            .getElementById("customerState")
            .value
            .trim();


    const address =
        document
            .getElementById("customerAddress")
            .value
            .trim();


    const city =
        document
            .getElementById("customerCity")
            .value
            .trim();


    const pincode =
        document
            .getElementById("customerPincode")
            .value
            .trim();


    const note =
        document
            .getElementById("orderNote")
            .value
            .trim();


    /* =========================================
       VALIDATION
    ========================================= */


    if (name.length < 2) {

        showNotification(
            "Enter a valid name"
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showNotification(
            "Phone number must contain 10 digits"
        );

        return;
    }


    if (country.length < 2) {

        showNotification(
            "Enter your country"
        );

        return;
    }


    if (state.length < 2) {

        showNotification(
            "Enter your state"
        );

        return;
    }


    if (address.length < 5) {

        showNotification(
            "Enter your address"
        );

        return;
    }


    if (city.length < 2) {

        showNotification(
            "Enter your city"
        );

        return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        showNotification(
            "Pincode must contain 6 digits"
        );

        return;
    }


    /* =========================================
       CALCULATE TOTAL
    ========================================= */

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

    });


    /* =========================================
       CREATE ORDER
    ========================================= */

    currentOrder = {

        id:
            generateOrderId(),


        customer: {

            name: name,

            phone: phone,

            country: country,

            state: state,

            address: address,

            city: city,

            pincode: pincode,

            note: note

        },


        items:
            JSON.parse(
                JSON.stringify(cart)
            ),


        total: total,


        date:
            new Date()
                .toLocaleString()

    };


    /* =========================================
       CLOSE CHECKOUT
    ========================================= */

    closeCheckout();


    /* =========================================
       SEND OTP
    ========================================= */

    sendOTP();


    /* =========================================
       OPEN OTP
    ========================================= */

    const otpPopup =
        document.getElementById("otpPopup");

    if (otpPopup) {

        otpPopup.classList.add(
            "active"
        );

    }

}


/* =========================================
   GENERATE ORDER ID
========================================= */

function generateOrderId() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return "SPYRO-" + random;
}


/* =========================================
   GENERATE OTP
========================================= */

function generateOTP() {

    return Math.floor(
        100000 +
        Math.random() * 900000
    ).toString();
}


/* =========================================
   SEND OTP
========================================= */

function sendOTP() {

    currentOTP =
        generateOTP();


    const demoNote =
        document.getElementById(
            "otpDemoNote"
        );


    /*
       DEMO ONLY

       This displays the OTP so you can test
       the website before connecting a real
       SMS OTP service.
    */

    if (demoNote) {

        demoNote.textContent =
            "Demo OTP: " +
            currentOTP;

    }


    const otpInput =
        document.getElementById(
            "otpInput"
        );

    if (otpInput) {
        otpInput.value = "";
    }


    const otpError =
        document.getElementById(
            "otpError"
        );

    if (otpError) {
        otpError.textContent = "";
    }


    showNotification(
        "OTP generated"
    );
}


/* =========================================
   VERIFY OTP
========================================= */

function verifyOTP() {

    const otpInput =
        document.getElementById(
            "otpInput"
        );


    const error =
        document.getElementById(
            "otpError"
        );


    const enteredOTP =
        otpInput
            ? otpInput.value.trim()
            : "";


    if (!/^[0-9]{6}$/.test(enteredOTP)) {

        if (error) {

            error.textContent =
                "Enter the 6-digit OTP.";

        }

        return;
    }


    if (enteredOTP !== currentOTP) {

        if (error) {

            error.textContent =
                "Incorrect OTP. Please try again.";

        }

        return;
    }


    /* OTP CORRECT */

    if (error) {
        error.textContent = "";
    }


    closeOTP();


    /* SEND TO WHATSAPP */

    sendOrderToWhatsApp();


    /* CLEAR CART */

    cart = [];

    updateCart();


    /* RESET CHECKOUT FORM */

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );

    if (checkoutForm) {
        checkoutForm.reset();
    }


    currentOrder = null;
}


/* =========================================
   CLOSE OTP
========================================= */

function closeOTP() {

    const popup =
        document.getElementById(
            "otpPopup"
        );

    if (popup) {

        popup.classList.remove(
            "active"
        );

    }
}


/* =========================================
   SEND ORDER TO WHATSAPP
========================================= */

function sendOrderToWhatsApp() {

    if (!currentOrder) {

        showNotification(
            "Order information missing"
        );

        return;
    }


    let message = "";


    message +=
        "🔥 *NEW SPYRO ORDER* 🔥\n\n";


    message +=
        "*Order ID:* " +
        currentOrder.id +
        "\n";


    message +=
        "*Date:* " +
        currentOrder.date +
        "\n\n";


    /* =========================================
       CUSTOMER DETAILS
    ========================================= */

    message +=
        "👤 *CUSTOMER DETAILS*\n";


    message +=
        "Name: " +
        currentOrder.customer.name +
        "\n";


    message +=
        "Phone: " +
        currentOrder.customer.phone +
        "\n";


    message +=
        "Country: " +
        currentOrder.customer.country +
        "\n";


    message +=
        "State: " +
        currentOrder.customer.state +
        "\n";


    message +=
        "Address: " +
        currentOrder.customer.address +
        "\n";


    message +=
        "City: " +
        currentOrder.customer.city +
        "\n";


    message +=
        "Pincode: " +
        currentOrder.customer.pincode +
        "\n";


    if (currentOrder.customer.note) {

        message +=
            "Note: " +
            currentOrder.customer.note +
            "\n";

    }


    /* =========================================
       ORDER ITEMS
    ========================================= */

    message +=
        "\n🛒 *ORDER ITEMS*\n";


    currentOrder.items.forEach(
        function(item) {

            const itemTotal =
                item.price *
                item.quantity;


            message +=
                "• " +
                item.name +
                " - " +
                item.weight +
                " × " +
                item.quantity +
                " = ₹" +
                itemTotal +
                "\n";

        }
    );


    message +=
        "\n💰 *TOTAL: ₹" +
        currentOrder.total +
        "*";


    /* =========================================
       WHATSAPP URL
    ========================================= */

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   NOTIFICATION
========================================= */

let notificationTimer;


function showNotification(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    if (!notification) return;


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            function() {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================
   CONTACT
========================================= */

function contactMessage() {

    showNotification(
        "Contact information will be added soon."
    );
}


/* =========================================
   CLICK OUTSIDE POPUPS
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const cartPopup =
            document.getElementById(
                "cartPopup"
            );


        const detailsPopup =
            document.getElementById(
                "detailsPopup"
            );


        const checkoutPopup =
            document.getElementById(
                "checkoutPopup"
            );


        const otpPopup =
            document.getElementById(
                "otpPopup"
            );


        if (
            event.target ===
            cartPopup
        ) {

            closeCart();

        }


        if (
            event.target ===
            detailsPopup
        ) {

            closeDetails();

        }


        if (
            event.target ===
            checkoutPopup
        ) {

            closeCheckout();

        }


        if (
            event.target ===
            otpPopup
        ) {

            closeOTP();

        }

    }
);
function openContactPopup() {
    document.getElementById("contactPopup").classList.add("active");
}

function closeContactPopup() {
    document.getElementById("contactPopup").classList.remove("active");
}
