function validarformulario() {
  let usuario = document.querySelector("#usuario").value;

  let contrasena = document.querySelector("#contrasena").value;
  


  if (
    usuario == "" ||
    contrasena == "" ||
    usuario == ""
  ) {
    alert("todos los datos son requeridos");
    return false;
  }
  return true;
}

function Guardar() {
  let usuario = document.querySelector("#usuario").value;
  let contrasena = document.querySelector("#contrasena").value;


  if (validarformulario()) {
    let listadatos;
    if (localStorage.getItem("usuario1") == null) {
      listadatos = [];
    } else {
      listadatos = JSON.parse(localStorage.getItem("usuario1"));
    }

    let usuarioExistente = listadatos.find(
      (item) => item.Usuario === usuario
    );

    if (usuarioExistente) {
      alert(
        "el usuario ya ha sido ingresada anteriormente. No se puede duplicar."
      );
    } else {
      listadatos.push({
        Usuario: usuario,
        Contrasena: contrasena,
      });

      localStorage.setItem("usuario1", JSON.stringify(listadatos));
      alert("Datos guardados correctamente");

      document.querySelector("#usuario").value = "";
      document.querySelector("#contrasena").value = "";
      
    }
  }
}

function Ingresar() {
  let usuario = document.querySelector("#usuario").value;

  let listadatos;
  if (localStorage.getItem("usuario1") == null) {
    listadatos = [];
  } else {
    listadatos = JSON.parse(localStorage.getItem("usuario1"));
  }

  let usuarioEncontrada = listadatos.find(
    (item) => item.Usuario === usuario
  );

  if (usuarioEncontrada) {
    document.querySelector("#usuario").value =
    usuarioEncontrada.Usuario;
    document.querySelector("#contrasena").value =
    usuarioEncontrada.Contrasena;
    document.querySelector("#precioUnitario").value =
    usuarioEncontrada.Existencia;
    document.querySelector("#usuario").disabled = true;

    document.querySelector("#actualizar").disabled = false;
    document.querySelector("#actualizar").onclick = function () {
      Actualizar(usuarioEncontrada);
    };
  } else {
    alert("el usuario no ha sido encontrada en los datos.");
  }
}

function Actualizar(usuarioEncontrada) {
  let nuevaContrasena = document.querySelector("#contrasena").value;

  usuarioEncontrada.Contrasena = nuevaContrasena;

  let listadatos = JSON.parse(localStorage.getItem("usuario1"));

  let indice = listadatos.findIndex(
    (item) => item.Usuario === usuarioEncontrada.Usuario
  );

  listadatos[indice] = usuarioEncontrada;

  localStorage.setItem("usuario1", JSON.stringify(listadatos));

  alert("Datos actualizados correctamente");

  document.querySelector("usuario").disabled = false;
  document.querySelector("#usuario").value = "";
  document.querySelector("#contrasena").value = "";

}

function Eliminar() {
  let usuarioAEliminar = document.querySelector("#eliminarUsuario").value;

  let listadatos;
  if (localStorage.getItem("usuario1") == null) {
    listadatos = [];
  } else {
    listadatos = JSON.parse(localStorage.getItem("usuario1"));
  }

  let indiceAEliminar = listadatos.findIndex(
    (item) => item.Usuario === usuarioAEliminar
  );

  if (indiceAEliminar !== -1) {
    listadatos.splice(indiceAEliminar, 1);

    localStorage.setItem("usuario1", JSON.stringify(listadatos));

    alert("Datos eliminados correctamente");

    document.querySelector("#eliminarUsuario").value = "";
    document.querySelector("#usuario").disabled = false;
    document.querySelector("#usuario").value = "";
    document.querySelector("#contrasena").value = "";
   
  } else {
    alert("el usuario no ha sido encontrada en los datos.");
  }
}

let tablaVisible = false;

function Listar() {
  let listadatos;
  if (localStorage.getItem("usuario1") == null) {
    listadatos = [];
  } else {
    listadatos = JSON.parse(localStorage.getItem("usuario1"));
  }

  let tablaCuerpo = document.querySelector("#informacion tbody");

  tablaCuerpo.innerHTML = "";

  listadatos.forEach((registro) => {
    let fila = tablaCuerpo.insertRow();
    let usuarioCell = fila.insertCell(0);
    let contrasenaCell = fila.insertCell(1);
 

    usuarioCell.textContent = registro.Usuario;
    contrasenaCell.textContent = registro.Contrasena;
 
  });

  let tabla = document.querySelector("#informacion");
  if (tablaVisible) {
    tabla.style.display = "none";
  } else {
    tabla.style.display = "table";
  }

  tablaVisible = !tablaVisible;
}
