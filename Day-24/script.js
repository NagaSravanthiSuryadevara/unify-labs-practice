let products = [];

function insertProducts() {
    products = [
        {
            name: "iPhone 15",
            category: "Electronics",
            price: 80000,
            stock: 25,
            specs: { color: "Black", weight: "171g" }
        },
        {
            name: "Samsung TV",
            category: "Electronics",
            price: 55000,
            stock: 10,
            specs: { color: "Silver", weight: "8kg" }
        },
        {
            name: "Men's Jacket",
            category: "Clothing",
            price: 2999,
            stock: 50,
            specs: { color: "Blue", weight: "500g" }
        },
        {
            name: "Wooden Sofa",
            category: "Furniture",
            price: 25000,
            stock: 5,
            specs: { color: "Brown", weight: "30kg" }
        },
        {
            name: "Office Chair",
            category: "Furniture",
            price: 12000,
            stock: 15,
            specs: { color: "Black", weight: "12kg" }
        }
    ];

    alert("5 Products Inserted Successfully!");
}

function display(data) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    data.forEach(product => {
        output.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> ₹${product.price}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <p><strong>Color:</strong> ${product.specs.color}</p>
                <p><strong>Weight:</strong> ${product.specs.weight}</p>
            </div>
        `;
    });
}

function showAll() {
    display(products);
}

function filterElectronics() {
    let filtered = products.filter(p => p.category === "Electronics");
    display(filtered);
}

function topExpensive() {
    let sorted = [...products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 2);

    display(sorted);
}