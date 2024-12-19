let products = [];

export const addProduct = (name, price, stock) => {
    products.push({ name, price, stock });
};

export const getProducts = () => {
    return products;
};

export const deleteAllProducts = () => {
    // Función de eliminación adaptada para SweetAlert2
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará todos los productos registrados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            products = []; // Elimina todos los productos
            Swal.fire('Eliminados!', 'Todos los productos han sido eliminados.', 'success');
        } else {
            Swal.fire('Cancelado', 'La eliminación fue cancelada.', 'info');
        }
    });
};

export const updateProduct = (index, name, price, stock) => {
    if (products[index]) {
        products[index].name = name;
        products[index].price = price;
        products[index].stock = stock;
    }
};
