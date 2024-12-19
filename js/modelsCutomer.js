// Almacenamiento de clientes en un array
let customers = [];

// Función para agregar un cliente
export const addCustomer = (name, email) => {
    if (!name || !email || !email.includes('@')) {
        throw new Error('Datos inválidos para el cliente');
    }

    const newCustomer = { name, email };
    customers.push(newCustomer);
};

// Función para obtener todos los clientes
export const getCustomers = () => {
    return customers;
};

// Función para eliminar todos los clientes
export const deleteAllCustomers = () => {
    customers = [];
};
