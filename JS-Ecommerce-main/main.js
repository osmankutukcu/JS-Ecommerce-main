import { renderCategories, renderProducts, renderBasketItem } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});

const baseUrl = "https://api.escuelajs.co/api/v1";

// Kategorileri getirir
async function fetchCategories() {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    const data = await response.json();
    renderCategories(data);
    console.log(data);
  } catch (error) {
    console.error("Kategorileri getirirken bir hata oluştu:", error);
  }
}

let globalData = [];

// Ürünleri getirir
async function fetchProducts() {
  try {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    globalData = data;
    renderProducts(data);
  } catch (error) {
    console.error("Ürünleri getirirken bir hata oluştu:", error);
  }
}

let basket = [];
let total = 0;

const modal = document.querySelector(".modal-wrapper");
const sepetBtn = document.querySelector("#sepet-btn");
const closeBtn = document.querySelector("#close-btn");
const basketList = document.querySelector(".list");
const modalInfo = document.querySelector(".total-span");

sepetBtn.addEventListener("click", () => {
  modal.classList.add("active");
  addList();
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    closeModal();
  }
});

document.body.addEventListener("click", handleItemClick);

// Ürün öğesi tıklama işlemini ele alır
function handleItemClick(e) {
  const clickedElement = e.target;

  if (clickedElement.id === "add-btn") {
    const selected = globalData.find(
      (product) => product.id == clickedElement.dataset.id
    );
    if (!selected.amount) {
      selected.amount = 1;
    }
    addToBasket(selected);
  } else if (clickedElement.id === "del-button") {
    const parentElement = clickedElement.parentElement;
    parentElement.remove();
    const selected = globalData.find(
      (item) => item.id == clickedElement.dataset.id
    );
    deleteItem(selected);
  }
}

// Sepete ürün ekler
function addToBasket(product) {
  const foundItem = basket.find((item) => item.id == product.id);

  if (foundItem) {
    foundItem.amount++;
  } else {
    basket.push(product);
  }
}

// Sepet listesini oluşturur
function addList() {
  basket.forEach((product) => {
    renderBasketItem(product);
    total += product.price * product.amount;
  });
  modalInfo.textContent = total;
}

// Ürünü sepetten siler
function deleteItem(deletingItem) {
  const filteredData = basket.filter((item) => item.id !== deletingItem.id);
  basket = filteredData;
  total -= deletingItem.price * deletingItem.amount;
  modalInfo.textContent = total;
}

// Modalı kapatır
function closeModal() {
  modal.classList.remove("active");
  basketList.innerHTML = "";
  total = 0;
  modalInfo.textContent = "0";
}
