let productosDiv = document.getElementById("productos")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// MOSTRAR PRODUCTOS
function mostrarProductos(array) {
    array.forEach(producto => {
        productosDiv.innerHTML += `
        <div class="producto">
            <img src=${producto.img}>
            <p>${producto.name}   $${producto.price}</p>
            <button class="agregar" id="${producto.id}">Agregar al carrito</button>
        </div>`
    });
}

mostrarProductos(products)

//FILTRAR PRODUCTOS POR BOTONES

function filtrar(e) {
    let btn = e.target
    console.log(btn)
    let categoria = btn.innerText
    console.log(categoria)
    let productosFiltrados = products.filter(producto => producto.category === categoria.toLowerCase())
    console.log(productosFiltrados)
    productosDiv.innerHTML = ""
    mostrarProductos(productosFiltrados)
}

let btnFiltro = document.getElementsByClassName("filtrar")
console.log(btnFiltro)
for (btn of btnFiltro) {
    btn.addEventListener("click", filtrar)
}

//VER TODO
const mostrarTodo = document.querySelector(".todo")
mostrarTodo.addEventListener("click", () => {
    productosDiv.innerHTML = ""
    mostrarProductos(products)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////

//AGREGAR AL CARRITO 
let botonAgregar = document.getElementsByClassName("agregar")
const divCarrito = document.querySelector("#carrito")
const carritoSection = document.querySelector("#carritoSection")
const vaciar = document.getElementById("vaciar")

function agregarAlCarrito(e) {
    divCarrito.innerHTML = ""
    const boton = e.target;
    const idBoton = boton.getAttribute("id");
    // console.log(idBoton)
    let productoSeleccionado = products.find(producto => producto.id === idBoton)
    carrito.push(productoSeleccionado)
    console.log(carrito)

    //storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Agregaste " + productoSeleccionado.name + " al carrito")

    mostrarCarrito()
}

for (boton of botonAgregar) {
    boton.addEventListener("click", agregarAlCarrito)
}

//MOSTRAR CARRITO
function mostrarCarrito() {
    carrito.forEach(producto => {
        divCarrito.innerHTML += `
            <div class="productoCarrito">
                <img src=${producto.img}>
                <h2>${producto.name}   $${producto.price}</h2>
                <button class="botonBorrar" id="${producto.id}">X</button>
            </div>
            `
    })
    let total = carrito.reduce((acc, curr) => acc + parseInt(curr.price), 0)
    let totalCompra = document.createElement("p")
    totalCompra.setAttribute("class", "total")
    totalCompra.innerText = ("Total: " + total)
    divCarrito.append(totalCompra)

    let botonBorrar = document.getElementsByClassName("botonBorrar")
    // console.log(botonBorrar)

    for (botonX of botonBorrar) {
        botonX.addEventListener("click", eliminarProducto)
    }

    //vaciar carrito
    vaciar.addEventListener("click", () => {
        carrito = []
        localStorage.clear()
        divCarrito.innerHTML = ""
    })

    let terminarCompra = document.createElement("button")
    terminarCompra.setAttribute("class", "terminarCompra")
    terminarCompra.innerHTML=("Finalizar compra")
    divCarrito.append(terminarCompra)

    terminarCompra.addEventListener("click", ()=>{
        window.location.href="comprar.html"
    })
}

carrito.length && mostrarCarrito()


//ELIMINAR PRODUCTO
function eliminarProducto(e) {
    divCarrito.innerHTML = ""
    const botonX = e.target;
    const idBotonX = botonX.getAttribute("id");
    let indexProducto = carrito.findIndex(producto => producto.id === idBotonX)
    carrito.splice(indexProducto, 1)
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito(carrito)
}

