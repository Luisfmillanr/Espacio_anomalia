document.addEventListener('DOMContentLoaded', function() {
    // Código existente para el menú de navegación
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('navigation');

    menuToggle.addEventListener('click', function() {
        const isOpen = navList.style.transform === 'translateX(0%)';

        navList.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
        menuToggle.setAttribute('aria-expanded', !isOpen);

        const iconBar = menuToggle.querySelector('.fa-bars');
        const iconTimes = menuToggle.querySelector('.fa-times');

        if (iconBar && iconTimes) {
            iconBar.setAttribute('aria-hidden', isOpen);
            iconTimes.setAttribute('aria-hidden', !isOpen);
        }
    });

    // Nueva función para cargar y mostrar los productos
    function cargarProductos() {
        fetch('productos.json') // Asegúrate de que el archivo productos.json esté en la raíz del proyecto o ajusta la ruta según corresponda.
            .then(response => response.json())
            .then(productos => {
                const contenedorProductos = document.getElementById('productos'); // Asegúrate de tener un contenedor con este id en tu HTML de la tienda.
                productos.forEach(producto => {
                    const htmlProducto = `
                        <div class="producto ">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <h3>${producto.nombre}</h3>
                            <p>${producto.descripcion}</p>
                            <p>Precio: $${producto.precio}</p>
                            <button>Añadir al carrito</button>
                        </div>
                    `;
                    contenedorProductos.innerHTML += htmlProducto;
                });
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    cargarProductos(); // Llamamos a la función al cargar la página.
});
