/*
let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCartDisplay();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
}    

    const cartList = document.getElementById("cart-items");
    const li = document.createElement("li");
    li.textContent = `${item} - $${price.toFixed(2)}`;
    cartList.appendChild(li);

    document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("name").value;
    const pickupTime = document.getElementById("pickup-time").value;
    const payment = document.getElementById("payment").value;

    const order = {
        name,
        pickupTime,
        payment,
        items: cart,
        total
    };

    console.log("Pickup Order:", order);
    alert("Order placed! Please come pick it up.");

    // Save to localStorage (optional)
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Reset
    cart = [];
    total = 0;
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("total").textContent = "0.00";
    document.getElementById("order-form").reset();
});

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("order-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const name = document.getElementById("name").value;
    const pickupTime = document.getElementById("pickup-time").value;
    const payment = document.getElementById("payment").value;

    const order = {
        name,
        pickupTime,
        payment,
        items: cart,
        total,
        createdAt: new Date()
    };

    await db.collection("orders").add(order);

    alert("Order sent!");

    cart = [];
    total = 0;
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("total").textContent = "0.00";
    document.getElementById("order-form").reset();
});
*/

let cart = [];
let total = 0;

/* =========================
   ADD TO CART
========================= */
function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    renderCart();
}

/* =========================
   REMOVE FROM CART
========================= */
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    renderCart();
}

/* =========================
   RENDER CART UI
========================= */
function renderCart() {
    const cartList = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    cartList.innerHTML = "";

    cart.forEach((product, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${product.item} - $${product.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartList.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

/* =========================
   FIREBASE SETUP
========================= */
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* =========================
   PLACE ORDER (SUBMIT FORM)
========================= */
document.getElementById("order-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const name = document.getElementById("name").value;
    const pickupTime = document.getElementById("pickup-time").value;
    const payment = document.getElementById("payment").value;

    const order = {
        name,
        pickupTime,
        payment,
        items: cart,
        total,
        createdAt: new Date()
    };

    try {
        await db.collection("orders").add(order);

        alert("Order sent successfully!");

        // reset everything
        cart = [];
        total = 0;
        renderCart();

        document.getElementById("order-form").reset();

    } catch (error) {
        console.error("Error sending order:", error);
        alert("Something went wrong. Try again.");
    }
});