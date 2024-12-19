import { addProduct, getProducts, deleteAllProducts } from './modelsProducto.js';
import { addCustomer, getCustomers, deleteAllCustomers } from './modelsCutomer.js';

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Cambiar entre pestañas (Productos / Clientes)
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Activar la pestaña seleccionada
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Mostrar el contenido correspondiente
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Manejo de productos
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const deleteAllProductsBtn = document.getElementById('deleteAllProducts');

    // Función para actualizar la lista de productos
    const updateProductList = () => {
        productList.innerHTML = '';
        const products = getProducts();
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - S/ ${product.price} - Stock: <span id="stock-${index}">${product.stock}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="decrease" data-index="${index}">-</button>
            `;
            productList.appendChild(li);
        });

        // Agregar funcionalidad a los botones de incrementar y disminuir stock
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const products = getProducts();
                products[index].stock++;
                updateProductList();
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const products = getProducts();
                if (products[index].stock > 0) {
                    products[index].stock--;
                }
                updateProductList();
            });
        });
    };

    // Agregar un producto
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productStock = document.getElementById('productStock').value;

        try {
            addProduct(productName, parseFloat(productPrice), parseInt(productStock));
            updateProductList(); // Actualizar la lista de productos
            productForm.reset();
        } catch (error) {
            alert(error.message);
        }
    });

    // Eliminar todos los productos
    deleteAllProductsBtn.addEventListener('click', () => {
        deleteAllProducts();
        updateProductList(); // Actualizar la lista después de eliminar
    });

    // Inicializar la lista de productos
    updateProductList();

    // Manejo de clientes
    const customerForm = document.getElementById('customerForm');
    const customerList = document.getElementById('customerList');
    const deleteAllCustomersBtn = document.getElementById('deleteAllCustomers');

    // Función para actualizar la lista de clientes
    const updateCustomerList = () => {
        customerList.innerHTML = '';
        const customers = getCustomers();
        customers.forEach(customer => {
            const li = document.createElement('li');
            li.textContent = `${customer.name} - ${customer.email}`;
            customerList.appendChild(li);
        });
    };

    // Agregar un cliente
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;

        try {
            addCustomer(customerName, customerEmail);
            updateCustomerList(); // Actualizar la lista de clientes
            customerForm.reset();
        } catch (error) {
            alert(error.message);
        }
    });

    // Eliminar todos los clientes
    deleteAllCustomersBtn.addEventListener('click', () => {
        deleteAllCustomers();
        updateCustomerList(); // Actualizar la lista después de eliminar
    });

    // Inicializar la lista de clientes
    updateCustomerList();
});
