const API_URL = 'https://backend-mi-tienda.onrender.com'; // cambiar por la URL de Render luego

const productos = [];

function mostrarProductos() {
  const listaProductos = document.getElementById('producto-lista');
  listaProductos.innerHTML = '';
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `<h3>${producto.nombre}</h3><p>Precio: $${producto.precio}</p>`;
    listaProductos.appendChild(div);
  });
}

async function cargarProductos() {
  const res = await fetch(`${API_URL}/productos`);
  const data = await res.json();
  productos.splice(0, productos.length, ...data);
  mostrarProductos();
}

async function agregarProducto(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;

  await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio }),
  });

  document.getElementById('formulario-agregar').reset();
  cargarProductos();
}

document.getElementById('formulario-agregar').addEventListener('submit', agregarProducto);
cargarProductos();
