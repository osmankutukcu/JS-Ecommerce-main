const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const basketList = document.querySelector(".list");

// Kategorileri render eder
// export function renderCategories(categories) {
//   categories.forEach((category) => {
//     const categoryDiv = document.createElement("div");
//     categoryDiv.classList.add("category");
//     categoryDiv.innerHTML = `
//       <img src=${category.image} />
//       <p>${category.name}</p>
//     `;
//     categoryList.appendChild(categoryDiv);
//   });
// }

//...
// Kategorileri render eder
export function renderCategories(categories) {
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.innerHTML = `
      <img src=${category.image} />
      <p>${category.name}</p>
    `;

    // Ekran genişliğini kontrol etmek için bir event listener ekle
    window.addEventListener("resize", function () {
      // Ekran genişliğini kontrol et
      if (window.innerWidth <= 768) {
        // Ekran genişliği 768 pikselden küçük veya eşitse, <p> etiketini <span> etiketiyle değiştir
        const categoryParagraph = categoryDiv.querySelector("p");
        const categorySpan = document.createElement("span");
        categorySpan.textContent = categoryParagraph.textContent;
        categoryDiv.replaceChild(categorySpan, categoryParagraph);
      } else {
        // Ekran genişliği 768 pikselden büyükse, <span> etiketini <p> etiketiyle değiştir
        const categorySpan = categoryDiv.querySelector("span");
        const categoryParagraph = document.createElement("p");
        categoryParagraph.textContent = categorySpan.textContent;
        categoryDiv.replaceChild(categoryParagraph, categorySpan);
      }
    });

    categoryList.appendChild(categoryDiv);
  });
}

// Sayfa yüklendiğinde event listener'ı tetikle
window.dispatchEvent(new Event("resize"));

//..

// Ürünleri render eder
export function renderProducts(products) {
  let visibleProducts = 0;

  // Daha fazla ürünü getirme işlevi
  function renderMoreProducts() {
    const nextProducts = products.slice(visibleProducts, visibleProducts + 10);
    visibleProducts += 10;

    nextProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product";
      productCard.innerHTML = `
        <img src=${product.images[0]} />
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
          <p>${product.price} $</p>
          <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
        </div>
      `;
      productList.appendChild(productCard);
    });

    if (visibleProducts >= products.length) {
      loadMoreButton.style.display = "none";
    } else {
      productList.appendChild(loadMoreButton);
    }

    loadMoreButton.textContent = `Load More ${visibleProducts} / ${products.length}`;
  }

  const loadMoreButton = document.createElement("button");
  loadMoreButton.addEventListener("click", renderMoreProducts);
  loadMoreButton.style.height = "40px";
  loadMoreButton.style.width = "200px";
  loadMoreButton.style.padding = "10px 20px";
  //loadMoreButton.style.border = "none";
  loadMoreButton.style.borderRadius = "5px";
  loadMoreButton.style.borderColor = "Blue";
  // loadMoreButton.style.backgroundColor = "#f8f8f8";
  loadMoreButton.style.color = "#333";
  // loadMoreButton.style.fontFamily = "Arial, sans-serif";
  // loadMoreButton.style.fontSize = "14px";
  loadMoreButton.style.cursor = "pointer";

  productList.appendChild(loadMoreButton);
  //document.body.appendChild(loadMoreButton);

  renderMoreProducts(); // İlk render

  const searchInput = document.getElementById("search-input");

  // Arama işlevi
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase().trim();

    visibleProducts = 0; // Görünen ürün sayacını sıfırla
    productList.innerHTML = ""; // Önceki ürün kartlarını temizle

    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchText);
    });

    renderFilteredProducts(filteredProducts); // Filtrelenmiş ürünleri render et
  });

  // Filtrelenmiş ürünleri render eder
  function renderFilteredProducts(filteredProducts) {
    visibleProducts = 0; // Görünen ürün sayacını sıfırla
    productList.innerHTML = ""; // Önceki ürün kartlarını temizle

    filteredProducts.slice(0, 40).forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product";
      productCard.innerHTML = `
        <img src=${product.images[0]} />
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
          <p>${product.price} $</p>
          <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
        </div>
      `;
      productList.appendChild(productCard);
    });

    if (filteredProducts.length > 40) {
      productList.appendChild(loadMoreButton);
    }

    loadMoreButton.textContent = `Load More ${visibleProducts} / ${filteredProducts.length}`;
  }
}

// Sepet öğesini render eder
export function renderBasketItem(product) {
  const basketItem = document.createElement("div");
  basketItem.classList.add("list-item");
  basketItem.innerHTML = `
    <img src=${product.images[0]} />
    <h2>${product.title}</h2>
    <h2>${product.price}</h2>
    <p>Miktar: ${product.amount}</p>
    <button id="del-button" data-id=${product.id}>sil</button>
  `;
  basketList.appendChild(basketItem);
}
