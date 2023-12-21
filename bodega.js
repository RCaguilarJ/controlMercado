let inventario = [];

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
  const bultosQuitar = parseInt(document.getElementById("bultosInput").value);
  const pesoQuitar = parseFloat(document.getElementById("pesoInput").value);

  const productoExistente = inventario.find((p) => p.producto === producto);

  if (productoExistente && productoExistente.bultos >= bultosQuitar) {
    productoExistente.bultos -= bultosQuitar;
    productoExistente.peso -= pesoQuitar * bultosQuitar;

    // Asegúrate de que el peso no sea negativo
    if (productoExistente.peso < 0) {
      productoExistente.peso = 0;
    }

    actualizarInventario();
    guardarDatos();
  } else {
    alert("No hay suficientes bultos del producto para quitar.");
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
function reiniciarLista() {
  inventario = [];
  actualizarInventario();
  guardarDatos();
}

function filtrarProductos() {
  const buscarInput = document.getElementById("buscarInput");
  const filtro = buscarInput.value.toLowerCase();
  const inventarioFiltrado = inventario.filter((producto) =>
    producto.producto.toLowerCase().includes(filtro)
  );

  const inventarioTableBody = document.getElementById("inventarioBody");
  inventarioTableBody.innerHTML = "";

  inventarioFiltrado.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.producto}</td>
      <td>${producto.peso}</td>
      <td>${producto.bultos}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}
