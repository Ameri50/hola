let customers = [];

export const addCustomer = (name, email) => {
    customers.push({ name, email });
};

export const getCustomers = () => {
    return customers;
};

export const deleteAllCustomers = () => {
    // Función de eliminación adaptada para SweetAlert2
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará todos los clientes registrados.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            customers = []; // Elimina todos los clientes
            Swal.fire('Eliminados!', 'Todos los clientes han sido eliminados.', 'success');
        } else {
            Swal.fire('Cancelado', 'La eliminación fue cancelada.', 'info');
        }
    });
};

export const updateCustomer = (index, name, email) => {
    if (customers[index]) {
        customers[index].name = name;
        customers[index].email = email;
    }
};
