// let inventarioBodega = [];

document.addEventListener("DOMContentLoaded", () => {
  inventarioBodega = JSON.parse(localStorage.getItem("inventarioBodega")) || [];
  actualizarInventarioBodega();
});

function agregarProducto() {
  const producto = document.getElementById("productoInput").value;
  const peso = document.getElementById("pesoInput").value;
  const bultos = parseInt(document.getElementById("bultosInput").value);

  const productoExistente = inventarioBodega.find(
    (p) => p.producto === producto
  );

  if (productoExistente) {
    productoExistente.bultos += bultos;
  } else {
    inventarioBodega.push({ producto, peso, bultos });
  }

  limpiarInputs();
  actualizarInventarioBodega();
  guardarDatos();
}

function quitarProducto() {
  const producto = document.getElementById("productoInput").value;
  const bultosQuitar = parseInt(document.getElementById("bultosInput").value);
  const pesoQuitar = parseFloat(document.getElementById("pesoInput").value);

  const productoExistente = inventarioBodega.find(
    (p) => p.producto === producto
  );

  if (productoExistente && productoExistente.bultos >= bultosQuitar) {
    productoExistente.bultos -= bultosQuitar;
    productoExistente.peso -= pesoQuitar * bultosQuitar;

    // Asegúrate de que el peso no sea negativo
    if (productoExistente.peso < 0) {
      productoExistente.peso = 0;
    }

    actualizarInventarioBodega();
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

function actualizarInventarioBodega() {
  const inventarioTableBody = document.querySelector("#inventario tbody");
  inventarioTableBody.innerHTML = "";

  inventarioBodega.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.producto}</td>
      <td>${producto.peso}</td>
      <td>${producto.bultos}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}

function reiniciarLista() {
  inventarioBodega = [];
  actualizarInventarioBodega();
  guardarDatos();
}

function filtrarProductos() {
  const buscarInput = document.getElementById("buscarInput");
  const filtro = buscarInput.value.toLowerCase();
  const inventarioFiltrado = inventarioBodega.filter((producto) =>
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

function guardarDatos() {
  localStorage.setItem("inventarioBodega", JSON.stringify(inventarioBodega));
}
