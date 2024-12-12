let btnAgregar = document.getElementById("btnAgregar");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let  tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let productosTotal = document.getElementById("productosTotal");

let precioTotal = document.getElementById("precioTotal");
let contadorProductos = document.getElementById("contadorProductos");
let btnClear = document.getElementById("btnClear");

let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = [];


function validarCantidad() {
    if(txtNumber.value.length<=0){
       return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
    if(Number(txtNumber.value) <=0){
        return false;
    }
    return true;
} //validar cantidad

function getPrecio(){
   return Math.round(Math.random()*10000)/100;
} //getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true; //bandera, al ser true permite agregar datos ala tabla

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    
    if(txtName.value.length<3){
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid=false
    };
    //Mostrar alerta con el error
    //Borde color rojo
    
    if(! validarCantidad()){
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML+=
                "</br><strong>La cantidad no es correcta."
        alertValidaciones.style.display="block";
        isValid=false
    }

    if(isValid){ 
       cont ++
       let precio = getPrecio();
       let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                 </tr>`;
        let elemento = {"cont": cont,
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
        };
        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont; 
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("cont", cont);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//isValid
}); //btnAgregar click

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";

    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    
    cuerpoTabla.innerHTML = "";

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    

    txtName.focus();
});// btnClear click

window.addEventListener("load", function(event){
    
    if(this.localStorage.getItem("costoTotal") != null){
       costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }

    if (this.localStorage.getItem("totalEnProductos") != null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));   
    }
    if (this.localStorage.getItem("cont") != null){
        cont = Number(this.localStorage.getItem("cont"));
    }
    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    
    datos.forEach((r)=>{
          let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                 </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    
    }); //window load