function animar_titulo() {
    let cabecera_div = $("#header")
    let texto = cabecera_div.text()
    cabecera_div.text("")
    let letras = []
    for (let letra of texto) {
        let letra_div = ($(document.createElement("span")).text(letra))
        cabecera_div.append(letra_div)
        letras.push(letra_div)
    }

    let tiempo_entre_oleaje = 2000
    let tiempo_de_la_ola = 200
    let tiempo_entre_olas = 100
    let altura_ola = 10
    async function animacion(letras, indice = 0) {
        let index = indice % letras.length
        let index_ant = (indice - 1) % letras.length
        $(letras[index_ant]).animate({ top: "0" }, tiempo_de_la_ola)

        if (index == 0) {
            await new Promise(function (resolve) {
                setTimeout(() => resolve(), tiempo_entre_oleaje)
            })
        }
        $(letras[index]).animate({ top: `-${altura_ola}px` }, tiempo_de_la_ola, function () {
            setTimeout(() => { animacion(letras, indice + 1) }, tiempo_entre_olas);
        })
    }
    animacion(letras)
}
animar_titulo()

document.addEventListener('scroll', () => { document.documentElement.dataset.scroll = Number(window.scrollY > 50); });





function obtener_imagenes_carousel() {
    let lista = []
    for (let producto of datos_ajax_productos) {
        lista.push(producto["imagen"])
    }

    return lista
    // return ["https://static.islas.ikea.es/assets/images/590/0859014_PE624334_S4.webp",
    //     "https://static.islas.ikea.es/assets/images/848/0484875_PE621342_S4.webp",
    //     "https://www.ikea-club.org/cache/zoo_images/2/2b8a4cb398df2c67c1253afc63b0caa2.jpg",
    //     "https://www.ikea.com/images/23/96/23966f1e8220f77d8526c64eae36c4af.jpeg?f=s",
    //     "https://www.ikea.com/es/es/images/products/hemnes-mueble-salon-marron-claro__0805270_pe769480_s5.jpg"
    // ]
}

//carousel
function carousel() {
    let carousel_div = $("#carousel")
    let imagenes = obtener_imagenes_carousel()
    let imagenes_div = []
    let i = 0;
    for (let imagen of imagenes) {
        let image = $(document.createElement("img"))
        image.attr("src", imagen)
        carousel_div.append(image)
        imagenes_div.push(image);
        ((i) => { image.on("click", function () { producto_app_object.change(i) }) })(i);
        i++
    }
    let image = $(document.createElement("img"))
    image.attr("src", imagenes[0])
    carousel_div.append(image)
    imagenes_div.push(image)



    var indice = 0
    var temporizador_max = 300
    var temporizador = 0

    // let boton_menos = $(document.createElement("button")).on("click", function () { indice -= 2; temporizador = temporizador_max }).text("menos")
    // let boton_mas = $(document.createElement("button")).on("click", function () { temporizador = temporizador_max }).text("mas")
    // $("#cuerpo").append(boton_menos).append(boton_mas)

    setInterval(function () {
        temporizador += 1
        if (temporizador > temporizador_max) {

            temporizador = 0
            indice++
            if (indice <= 0) {
                for (let imagen of imagenes_div) {
                    imagen.animate({ left: (-45 * indice) + "vh" }, 1000, function () { imagen.css("left", (-45 * indice) + "vh") })
                }
                indice = imagenes_div.length - 1
                return
            } else {
                if (indice > imagenes_div.length - 1) {
                    indice = 1
                    for (let imagen of imagenes_div) {
                        imagen.css("left", "0")
                    }
                }
            }
            for (let imagen of imagenes_div) {
                imagen.animate({ left: (-45 * indice) + "vh" }, 1000)
            }
        }
    }, 10)

}
//desplegable
var actual
$(".multiple").hover(function (e) {
    actual = e.target
    $(actual).removeClass("oculto")
}, function (e) {
    $(actual).addClass("oculto")
}
)
function montar_menu_productos() {
    let bloque = document.createElement("ul")
    let i = 0;
    for (let producto of datos_ajax_productos) {
        let elemento = document.createElement("li")
        elemento.innerText = producto.nombre;
        ((i) => { elemento.onclick = function () { producto_app_object.change(i) } })(i);
        bloque.appendChild(elemento)
        i++
    }
    menu_producto.appendChild(bloque)
}








var datos_ajax_productos;
const { createApp, ref } = Vue
let componente_productos = createApp({
    data() {
        return {
            datos: datos_ajax_productos,
            id: 0,
            activo: false,

            nombre: datos_ajax_productos[0]["nombre"],
            descripcion: datos_ajax_productos[0]["descripcion"],
            precio: datos_ajax_productos[0]["precio"],
            disponibilidad: datos_ajax_productos[0]["disponibilidad"],
            imagen: datos_ajax_productos[0]["imagen"]
        }
    },
    methods: {
        change(id = 1) {
            this.id = id
            this.activar()
            this.nombre = this.datos[this.id]["nombre"]
            this.descripcion = this.datos[this.id]["descripcion"]
            this.precio = this.datos[this.id]["precio"]
            this.disponibilidad = this.datos[this.id]["disponibilidad"]
            this.imagen = this.datos[this.id]["imagen"]

        },
        mounted() {
            console.log(2)
        },
        activar() {
            desactivar_global()
            this.activo = true

        },
        desactivar() {
            this.activo = false
        },
        esta_agotado() {
            console.log(this.disponibilidad)
            return (this.disponibilidad == 0)
        },
        add(){
            carrito_app_object.add(this.id, this.nombre, this.precio)
        },
        actualizar(){
            this.datos = datos_ajax_productos
        }

    },


    template: `
<div class='container' v-if='activo'>
    <div class='izq'>
        <img :src=imagen >
    </div>
    <div class='info'>
        <h1>{{nombre}}</h1>
        <p>{{descripcion}}</p>
        <p>{{precio + "€"}}</p>
        <p v-bind:class='{agotado: esta_agotado()}'>{{disponibilidad}}</p>
        <button v-if='disponibilidad!=0' @click='add()'>añadir al carrito</button>
    </div>

</div>
`
})
var producto_app_object
//Cuando se carge las imagenes iniciara el carousel y la parte de productos
function cargar_datos_productos(primera=false){
    console.log("cargnado datos de productos")
    $.ajax({
        url: "http://localhost/bbdd.php?modo=productos",
        cache:false,
        success: function (result) {
            let resultado = JSON.parse(result)
            datos_ajax_productos = resultado
            console.log(datos_ajax_productos)
            if(primera){
                producto_app_object = componente_productos.mount("#app_producto")
                carousel()
                montar_menu_productos()
            }
            producto_app_object.actualizar()
        }
    });
}
cargar_datos_productos(true)

var regex = {
    nombre: /^[A-Z][a-z]+$/,
    fecha: /^\d{4}\/\d{1,2}\/\d{1,2}$/,
    correo: /^[A-z.1-9]+@[A-z.1-9]+\.[A-z]{1,3}$/,
    banco: /^ES\d{22}$/,
    telefono: /^[89]\d{8}$/,
    passw: /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{12,}/
}
function test(elemento, id) {
    let input = $(elemento)
    let resultado = regex[id].test(input.val())
    resultado ? input.attr("class", "bien") : input.attr("class", "mal")

}
let componente_login = createApp({
    data() {
        $("#login_button").on("click", () => this.activar())
        return {
            logueado: false,
            activo: false,
            correo: ""
        }
    },
    methods: {
        change() {
        },
        activar() {
            desactivar_global()
            this.activo = true
        },
        desactivar() {
            this.activo = false
        },
        envio(event, modo) {
            event.preventDefault()
            let form = event.target.parentElement
            let inputs = form.querySelectorAll("input")
            let datos = { modo: modo }
            let completo = true
            inputs.forEach(function (value, index, array) {
                if (!value.classList.contains("bien")) {
                    completo = false
                }
                datos[value.name] = value.value
            })
            if (completo) {
                let temp = this
                $.post("http://localhost/bbdd.php", datos, function (data, status) {
                    console.log(data,status)
                    if (data == true) {
                        inputs.forEach(function (value, index, array) {
                            value.value = ""
                        })
                        temp.correo = datos.correo
                        temp.logueado = true
                        $("#cuenta_usuario").text(datos.correo)
                    } else {
                        if(modo == "registro"){
                            alert("Error,email ya existente")
                        }else if(modo == "login"){
                            alert("Error en la contraseña o email")
                        }
                    }
                });
            }

        },
        deloguear(event){
            event.preventDefault()
            $("#cuenta_usuario").text("")
            this.logueado = false
            this.correo = ""
        }
    },

    template: `
<div class='izq' v-if='activo' id='form_container'>
    <div v-if='!logueado'>
        <form>
            <h1>Register</h1>

            <label>Nombre</label>
            <input name='nombre' oninput="test(this,this.name)">

            <label>fecha de nacimiento</label>
            <input name='fecha' oninput="test(this,this.name)">

            <label>correo electronico</label>
            <input name='correo' oninput="test(this,this.name)">

            <label>cuenta bancaria</label>
            <input name='banco' oninput="test(this,this.name)">

            <label>telefono</label>
            <input name='telefono' oninput="test(this,this.name)">

            <label>contraseña</label>
            <input name='passw' oninput="test(this,this.name)">

            <button @click='envio($event,"registro")'>enviar</button>
        </form>

        <form>
            <h1>Login</h1>
            <label>correo</label>
            <input name='correo' oninput="test(this,this.name)">
            <label>contraseña</label>
            <input name='passw' oninput="test(this,this.name)">

        <button @click='envio($event,"login")'>enviar</button>
    </form>

    </div>
    <div v-else>
    <h1>{{correo}}</h1>
    <button @click='deloguear($event)'>desloguear</button>
    </div>

</div>
`
})
let login_app_object = componente_login.mount("#app_login")



let componente_about = createApp({
    data() {
        $("#about_button").on("click", () => this.activar())

        return {
            activo: false,
        }
    },
    methods: {
        change() {
        },
        activar() {
            desactivar_global()
            this.activo = true
        },
        desactivar() {
            this.activo = false
        }

    },


    template: `
<div v-if='activo'>
    <h1>sobre nosostros</h1>
    <p>Somos una compañia de venta de muebles de muy alta calidad</p>
    <p>Correo de contacto: ŸQËÄ.müëblës@gmail.com</p>
    <p>Telefono: 666 666 666</p>
    <p>Direccion: Calle falsa 123</p>
    <p>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a> is licensed by CC BY 4.0</p>
    
</div>
`
})
let about_app_object = componente_about.mount("#app_about")



//TODO: carrito
let componente_carrito = createApp({
    data() {
        $("#carrito_button").on("click", () => this.activar())
        return {
            elementos:{},
            activo: true,
            
        }
    },
    methods: {
        change() {
        },
        activar() {
            desactivar_global()
            this.activo = true
        },
        desactivar() {
            this.activo = false
        },
        add(id, nombre,precio){
            if(this.elementos[id] == undefined){
                let elemento = {}
                elemento["cantidad"] = Math.min(1,datos_ajax_productos[id]["disponibilidad"])
                elemento["precio"] = precio
                elemento["nombre"] = nombre
                elemento["id"]= id
                this.elementos[id] = elemento
            }else{
                this.elementos[id]["cantidad"] +=1
            } 
        },
        cancelar(){
            this.elementos = {}
        },
        comprar(){
            let datos = {modo:"comprar",datos:this.elementos}
            $.post("http://localhost/bbdd.php", datos, function (data, status) {
                // console.log(data,status)
                cargar_datos_productos()
            })
            this.cancelar()
        }

    },
    computed:{
        precio_total(){
            let precio = 0
            for (let producto in this.elementos) {
                let cantidad = Math.min(this.elementos[producto]["cantidad"], Number(datos_ajax_productos[this.elementos[producto].id]["disponibilidad"]))
                cantidad = Math.max(cantidad,0)
                precio += this.elementos[producto]["precio"]*cantidad
                this.elementos[producto]["cantidad"] = cantidad
            }
            return Math.round(precio * 100) / 100
            
        },
        no_registrado(){
            return !login_app_object.logueado
        }

    },


    template: `
<div v-if='activo'>
    <h1>Carrito</h1>
    <div id="productos_carrito">

    <div class="producto_carrito" v-for="prod in elementos">
        <h1>{{prod.nombre}}</h1>    
        <p>precio individual:  {{prod.precio}}</p>
        <input type="number" v-model="prod.cantidad"  >cantidad</input>
        <button @click="delete elementos[prod.id]"> eliminar producto</button>
    </div>

    
    
    </div>
    <p>
    precio total: {{precio_total}} €
    </p>
    <p v-if="no_registrado">Para continuar con la compra tienes que estar logueado</p>

    <button @click='comprar()' v-else> comprar</button>
    <button @click='cancelar()'>cancelar</button>

</div>
`
})
let carrito_app_object = componente_carrito.mount("#app_carrito")









function desactivar_global() {
    producto_app_object.desactivar()
    login_app_object.desactivar()
    about_app_object.desactivar()
    carrito_app_object.desactivar()
}