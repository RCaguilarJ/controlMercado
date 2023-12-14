let inventario = [];

function agregarProducto() {
  const producto = document.getElementById("productoInput").value;
  const proveedor = document.getElementById("proveedorInput").value;
  const precio = document.getElementById("precioInput").value;
  const peso = document.getElementById("pesoInput").value;
  const bultos = parseInt(document.getElementById("bultosInput").value);

  const productoExistente = inventario.find(
    (p) => p.producto === producto && p.proveedor === proveedor
  );

  if (productoExistente) {
    productoExistente.bultos += bultos;
  } else {
    inventario.push({ producto, proveedor, precio, peso, bultos });
  }

  limpiarInputs();
  actualizarInventario();
}

function quitarProducto() {
  const producto = document.getElementById("productoInput").value;
  const proveedor = document.getElementById("proveedorInput").value;

  const productoExistente = inventario.find(
    (p) => p.producto === producto && p.proveedor === proveedor
  );

  if (productoExistente && productoExistente.bultos > 0) {
    productoExistente.bultos--;
    actualizarInventario();
  }
}

function limpiarInputs() {
  document.getElementById("productoInput").value = "";
  document.getElementById("proveedorInput").value = "";
  document.getElementById("precioInput").value = "";
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
      <td>${producto.proveedor}</td>
      <td>${producto.precio}</td>
      <td>${producto.peso}</td>
      <td>${producto.bultos}</td>
    `;
    inventarioTableBody.appendChild(fila);
  });
}
