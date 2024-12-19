let products = [];

export const addProduct = (name, price, stock) => {
    products.push({ name, price, stock });
};

export const getProducts = () => {
    return products;
};

export const deleteAllProducts = () => {
    products = [];
};

export const updateProduct = (index, name, price, stock) => {
    if (products[index]) {
        products[index].name = name;
        products[index].price = price;
        products[index].stock = stock;
    }
};