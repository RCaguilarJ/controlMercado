let inventario = [];

// Cargar datos almacenados al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  actualizarInventario();
});

function agregarProducto() {
  const producto = document.getElementById("productoInput").value;
  const peso = document.getElementById("pesoInput").value;
  const bultos = parseInt(document.getElementById("bultosInput").value);

  const productoExistente = inventario.find((p) => p.producto === producto);

  if (productoExistente) {
    productoExistente.bultos += bultos;
  } else {
    inventario.push({ producto, peso, bultos });
  }

  limpiarInputs();
  actualizarInventario();
  guardarDatos();
}

function quitarProducto() {
  const producto = document.getElementById("productoInput").value;

  const productoExistente = inventario.find((p) => p.producto === producto);

  if (productoExistente && productoExistente.bultos > 0) {
    productoExistente.bultos--;
    actualizarInventario();
    guardarDatos();
  }
}

function limpiarInputs() {
  document.getElementById("productoInput").value = "";
  document.getElementById("pesoInput").value = "";
  document.getElementById("bultosInput").value = 1;
}

function actualizarInventario() {
  const inventarioTableBody = document.querySelector("#inventario tbody");
  inventarioTableBody.innerHTML = "";

  inventario.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.producto}</td>
      <td>${producto.peso}</td>
      <td>${producto.bultos}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}

function guardarDatos() {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}
