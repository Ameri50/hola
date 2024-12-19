// Almacenamiento de productos en un array
let products = [];

// Función para agregar un producto
export const addProduct = (name, price, stock) => {
    if (!name || typeof price !== 'number' || price <= 0 || stock < 0) {
        throw new Error('Datos inválidos para el producto');
    }

    const newProduct = { name, price: parseFloat(price), stock: parseInt(stock) };
    products.push(newProduct);
};

// Función para obtener todos los productos
export const getProducts = () => {
    return products;
};

// Función para eliminar todos los productos
export const deleteAllProducts = () => {
    products = [];
};
