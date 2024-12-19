import { addProduct, getProducts, deleteAllProducts, updateProduct } from './modelsProducto.js';
import { addCustomer, getCustomers, deleteAllCustomers, updateCustomer } from './modelsCutomer.js';

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    // Load existing products
    loadProducts();

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productStock = document.getElementById('productStock').value;

        addProduct(productName, productPrice, productStock);
        loadProducts();
        productForm.reset();
    });

    const customerForm = document.getElementById('customerForm');
    const customerList = document.getElementById('customerList');

    // Load existing customers
    loadCustomers();

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;

        addCustomer(customerName, customerEmail);
        loadCustomers();
        customerForm.reset();
    });

    document.getElementById('deleteAllProducts').addEventListener('click', () => {
        deleteAllProducts();
        loadProducts();
    });

    document.getElementById('deleteAllCustomers').addEventListener('click', () => {
        deleteAllCustomers();
        loadCustomers();
    });

    function loadProducts() {
        productList.innerHTML = '';
        getProducts().forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - S/ ${product.price}.00 - Stock ${product.stock} unidades
                <button onclick="editProduct(${index}, '${product.name}', ${product.price}, ${product.stock})">Editar</button>
            `;
            productList.appendChild(li);
        });
    }

    window.editProduct = (index, name, price, stock) => {
        document.getElementById('productName').value = name;
        document.getElementById('productPrice').value = price;
        document.getElementById('productStock').value = stock;

        // Update product function
        productForm.onsubmit = (e) => {
            e.preventDefault();
            updateProduct(index, document.getElementById('productName').value, document.getElementById('productPrice').value, document.getElementById('productStock').value);
            loadProducts();
            productForm.reset();
        };
    };

    function loadCustomers() {
        customerList.innerHTML = '';
        getCustomers().forEach((customer, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${customer.name} - ${customer.email}
                <button onclick="editCustomer(${index}, '${customer.name}', '${customer.email}')">Editar</button>
            `;
            customerList.appendChild(li);
        });
    }

    window.editCustomer = (index, name, email) => {
        document.getElementById('customerName').value = name;
        document.getElementById('customerEmail').value = email;

        // Update customer function
        customerForm.onsubmit = (e) => {
            e.preventDefault();
            updateCustomer(index, document.getElementById('customerName').value, document.getElementById('customerEmail').value);
            loadCustomers();
            customerForm.reset();
        };
    };
});