import { bottlesArray } from "./data.js";

const cartHtml = document.getElementById("cart");
const completeOrderBtn = document.getElementById("cart-completeOrderBtn");
const paymentForm = document.getElementById("pay-modal");
const orderMessage = document.getElementById("orderMessage");
const paidMessage = document.getElementById("orderMessage-paid");
const closeModal = document.getElementById("closeModal");
const yearUpdate = document.getElementById("yearUpdate");
yearUpdate.innerText = new Date().getFullYear();

let currBottle = [];
let data = [];

function renderBottle() {
    const bottleHTML = document.getElementById("menu");
    bottleHTML.innerHTML = bottlesArray.map(bottleOption =>
        `
        <div class="menuOptions">
            <img src="${bottleOption.image}" alt="${bottleOption.name}" class="menuImage">
            <div class="foodOption">
                <h2>${bottleOption.name}</h2>
                <h3>$${bottleOption.price}</h3>
                <p>${bottleOption.place}</p>
            </div>
            <button class="addButton" data-order="${bottleOption.id}">
                +
            </button>
        </div>
        `
    ).join("");

    // Add click events for all add buttons
    document.querySelectorAll(".addButton").forEach(addBtn => {
        addBtn.addEventListener("click", e => {
            const bottleID = parseInt(e.target.closest("button").dataset.order);
            const selectedBottle = bottlesArray.find(item => item.id === bottleID);
            if(selectedBottle) {
                currBottle.push(selectedBottle);
                renderCart();
            }
        });
    });
}

function renderCart() {
    const orderCartList = document.getElementById("cart-user-order");
    cartHtml.style.display = currBottle.length > 0 ? "block" : "none";

    orderCartList.innerHTML = currBottle.map((item, index) =>
        `
        <li class="cart-user-order">
            <h2>${item.name}</h2>
            <button class="removeButton" data-index="${index}">Remove</button>
            <p class="cart-item-price">$${item.price}</p>
        </li>
        `
    ).join("");

    const totalPrice = currBottle.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-user-total-amount").textContent = `$${totalPrice}`;

    // Remove button events
    document.querySelectorAll(".removeButton").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.target.dataset.index;
            currBottle.splice(id, 1);
            renderCart();
        });
    });
}

// Checkout
completeOrderBtn.addEventListener("click", () => {
    document.getElementById("pay").style.display = "flex";
});

closeModal.addEventListener("click", () => {
    document.getElementById("pay").style.display = "none";
});

document.getElementById("pay").addEventListener("click", e => {
    if(e.target === document.getElementById("pay")) {
        document.getElementById("pay").style.display = "none";
    }
});

paymentForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    formData.forEach((value, key) => {
        data[key] = value;
    });
    renderComplete();
});

function renderComplete() {
    cartHtml.style.display = "none";
    document.getElementById("pay").style.display = "none";
    orderMessage.style.display = "block";
    paidMessage.innerText = `Thank you ${data.customerName}, your order is on its way!`;
}

renderBottle();


//NEED TO MAKE SURE THE IMAGES SHOW UP