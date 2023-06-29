
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDesdeLocalStorage();
});

let carrito = [];
let totalGastado = 0;

function agregarProducto(nombre, precio) {
    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);
    totalGastado += precio;

    actualizarCarrito();
    actualizarTotal();
    guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
    const listaCarrito = document.querySelector('.lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(function(producto) {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
        <span>${producto.nombre} - Precio: $${producto.precio}</span>
        <button onclick="quitarProducto('${producto.nombre}', ${producto.precio})">Quitar</button>
        `;
        listaCarrito.appendChild(itemCarrito);
    });
}

function quitarProducto(nombre, precio) {
    const index = carrito.findIndex(function(producto) {
        return producto.nombre === nombre && producto.precio === precio;
    });

    if (index !== -1) {
        carrito.splice(index, 1);
        totalGastado -= precio;

        actualizarCarrito();
        actualizarTotal();
        guardarCarritoEnLocalStorage();
    }
}

function actualizarTotal() {
    const totalElement = document.querySelector('.total');
    totalElement.textContent = `Total: $${totalGastado}`;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('totalGastado', totalGastado);
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('totalGastado');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        totalGastado = totalGuardado ? Number(totalGuardado) : 0;

        actualizarCarrito();
        actualizarTotal();
    }
}

function limpiarCarrito() {
    carrito = [];
    totalGastado = 0;
    actualizarCarrito();
    actualizarTotal();
    localStorage.removeItem('carrito');
    localStorage.removeItem('totalGastado');
}
