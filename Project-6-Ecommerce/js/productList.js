document.addEventListener("DOMContentLoaded", () => {

    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }

    async function populateProduct(flag, customProduct) {
        let product = customProduct;
        if(flag == false) {
            product = await fetchProducts();
        }
        // const product = await fetchProducts();
        const productList = document.getElementById("productList");
        product.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
            productItem.href = "productDetails.html";

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title.substring(0, 12) + "...";
            productPrice.textContent = `&#8377; ${product.price}`;

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            // append divs
            productImage.appendChild(imageInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

            productList.appendChild(productItem);

        });
    }

    populateProduct(false);

    const filterSearch = document.getElementById("search");
    const productList = document.getElementById("productList");
    filterSearch.addEventListener("click", async  () => {
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = await fetchProducts();
        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        console.log(filteredProducts);
        productList.innerHTML = "";
        populateProduct(true, filteredProducts);
    });

    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", () => {
        window.location.reload();
    })
});