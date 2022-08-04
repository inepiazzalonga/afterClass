let productosDiv = document.getElementById("productos")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []




// MOSTRAR PRODUCTOS
function mostrarProductos(productos) {
    productos.forEach(producto => {
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
let btnFiltro = document.getElementsByClassName("filtrar")
for (btn of btnFiltro) {
    btn.addEventListener("click", filtrar)
}

function filtrar(e) {
    console.log("hola filtro")
    let btn = e.target
    let categoria = btn.innerText
    console.log(categoria)
    let productosFiltrados = products.filter(producto => producto.category === categoria.toLowerCase())
    console.log(productosFiltrados)
    productosDiv.innerHTML = ""
    mostrarProductos(productosFiltrados)
}

//FILTRAR PRODUCTOS POR INPUT
// let inputFiltro = document.querySelector("#filtroInput")
// console.log(inputFiltro)

// inputFiltro.addEventListener("keyup", (e)=>{
//     let input = e.target.value.toLowerCase()
//     console.log(input)
//     let productosInput = products.filter(producto => producto.name.includes(input))
//     console.log(productosInput)
//     mostrarProductos(productosInput)
// })





//VER TODO
const mostrarTodo = document.querySelector(".todo")
mostrarTodo.addEventListener("click", () => {
    productosDiv.innerHTML = ""
    mostrarProductos(products)
})



//AGREGAR AL CARRITO 
let botonAgregar = document.getElementsByClassName("agregar")
const divCarrito = document.querySelector("#carrito")
const carritoSection = document.querySelector("#carritoSection")
const vaciar = document.getElementById("vaciar")

function agregarAlCarrito(e) {
    divCarrito.innerHTML = ""
    const boton = e.target;
    const idBoton = boton.getAttribute("id");
    let productoSeleccionado = products.find(producto => producto.id === idBoton)
    carrito.push(productoSeleccionado)

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
    console.log(botonBorrar)

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

carrito.length ? mostrarCarrito() : carritoSection.remove()



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

