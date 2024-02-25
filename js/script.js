const { createApp, ref } = Vue

// componenete encargado de traducir la pagina
let componente_literales = createApp({
    data() {
        // da error si no esta asi
        setTimeout(
            ()=>{
                $("#boton_ES").on("click", () => {this.idioma = "ES"})
                $("#boton_EN").on("click", () => this.idioma ="EN")
            },1
        )
        //diccionarios con los idiomas y el idioma actual
        return {
            idioma:"ES",
            ES:{
                titulo:"ŸQËÄ",
                carrito:"Carrito",
                inicio:"Inicio",
                productos:"Productos",
                nosotros:"Sobre nosotros",
                registro_log:"Registro/incio",
                idioma:"Idioma",
                es:"Español",
                en:"Ingles",
                informacion:"Mas informacion",
                correo:"Correo de contacto",
                telefono:"Telefono",
                direccion:"Direccion",

                add_cart:"añadir al carrito",
                precio:"Precio",
                hay:"Hay",
                unidades:"unidades",
                error_email_existente:"Error,email ya existente",
                error_datos_mal:"Error en la contraseña o email",

                registro:"Registro",
                nombre:"Nombre",
                fecha_de_nacimiento:"fecha de nacimiento",
                email:"correo electronico",
                banco:"cuenta bancaria",
                clave:"contraseña",
                login:"inicio de sesion",
                enviar:"Enviar",
                desloguear:"Salir de la cuenta",
                somos:"Somos una compañia de venta de muebles de muy alta calidad",

                precio_individual:"precio individual",
                cantidad:"cantidad",
                eliminar_producto:"eliminar producto",
                precio_total:"Precio total",
                tienes_que_loguear:"Para continuar con la compra tienes que estar logueado",
                comprar:"Comprar",
                cancelar:"Cancelar"
            },
            EN:{
                titulo:"ŸQËÄ",
                carrito:"Cart",
                inicio:"Home",
                productos:"Products",
                nosotros:"About",
                registro_log:"Register/login",
                idioma:"Lenguage",
                es:"Spanish",
                en:"English",
                informacion:"More information",
                correo:"Contact email",
                telefono:"Telefone",
                direccion:"Direction",

                add_cart:"add to cart",
                precio:"Price",
                hay:"There is",
                unidades:"units",
                error_email_existente:"Error,email already exists",
                error_datos_mal:"Error, email or password wrong",

                registro:"Register",
                nombre:"Name",
                fecha_de_nacimiento:"Birthday",
                email:"email",
                banco:"Bank account",
                clave:"Password",
                login:"Login",
                enviar:"Send",
                desloguear:"logout",
                somos:"We are a company that sells high quality furniture ",

                precio_individual:"price per unit",
                cantidad:"amount",
                eliminar_producto:"delete product",
                precio_total:"Total price",
                tienes_que_loguear:"To continue you have to be logged",
                comprar:"Buy",
                cancelar:"Cancel"
            }
        }
    },
    computed:{
        //diccioanrio computado, devuelve el diccionario correcto segun el idioma
        lt(){
            if(this.idioma == "ES"){
                return this.ES
            }else if(this.idioma == "EN"){
                return this.EN
            }
        }
    }
})
let literales_app_object = componente_literales.mount("#pagina")





// iniciar la animacion del titulo de la pagina, coge el texto del header y lo transforma
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

    //configuracion de la animacion
    let tiempo_entre_oleaje = 2000
    let tiempo_de_la_ola = 200
    let tiempo_entre_olas = 100
    let altura_ola = 10

    //animacion
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

// esto es para que cuando se escrollea, se ponga un atributo en el html, que puede pillar el css para hacer cosas, se usa para el titulo
document.addEventListener('scroll', () => { document.documentElement.dataset.scroll = Number(window.scrollY > 50); });




//coge las imagenes de los datos 
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

//inicia el carousel
function carousel() {
    let carousel_div = $("#carousel")
    let imagenes = obtener_imagenes_carousel()
    let imagenes_div = []
    let i = 0;
    //pone las imagenes y les da el evento para poner los productos en el main
    for (let imagen of imagenes) {
        let image = $(document.createElement("img"))
        image.attr("src", imagen)
        carousel_div.append(image)
        imagenes_div.push(image);
        ((i) => { image.on("click", function () {producto_app_object.change(i) }) })(i);
        i++
    }
    //agrega una ultima imagen igual que la primera para cerrar "el bucle"
    let image = $(document.createElement("img"))
    image.attr("src", imagenes[0])
    image.on("click", function () {producto_app_object.change(0) })
    carousel_div.append(image)
    imagenes_div.push(image)


    //configuracion de la animacion
    var indice = 0
    var temporizador_max = 300
    var temporizador = 0

    // let boton_menos = $(document.createElement("button")).on("click", function () { indice -= 2; temporizador = temporizador_max }).text("menos")
    // let boton_mas = $(document.createElement("button")).on("click", function () { temporizador = temporizador_max }).text("mas")
    // $("#cuerpo").append(boton_menos).append(boton_mas)

    //animacion
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

// menu desplegable, lee los que tenga la clase multiple y le sda el evento por jquery
var actual
$(".multiple").hover(function (e) {
    actual = e.target
    $(actual).removeClass("oculto")
}, function (e) {
    $(actual).addClass("oculto")
}
)
// menu de productos dinamico, lee los datos del ajax y crea el listado en el menu y les da el evento para poner el producto en el main
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







//datos de los productos que se recoge de la bd
var datos_ajax_productos;
var datos_ajax_productos_info;

//componente para el producto 
let componente_productos = createApp({
    data() {
        return {
            datos: datos_ajax_productos,
            datos_info: datos_ajax_productos_info,
            id: 0,
            activo: true,

            nombre: datos_ajax_productos[0]["nombre"],
            precio: datos_ajax_productos[0]["precio"],
            disponibilidad: datos_ajax_productos[0]["disponibilidad"],
            imagen: datos_ajax_productos[0]["imagen"]
        }
    },
    methods: {
        //metodo para cambiar entre los productos
        change(id = 1) {
            temp = this
            this.id = id
            this.activar() // cuando le das a un producto del menu desplegable o del carousel, hace visible el componente
            this.nombre = this.datos[this.id]["nombre"]
            this.precio = this.datos[this.id]["precio"]
            this.disponibilidad = this.datos[this.id]["disponibilidad"]
            this.imagen = this.datos[this.id]["imagen"]
        },
        activar() {
            desactivar_global()
            this.activo = true

        },
        desactivar() {
            this.activo = false
        },
        esta_agotado() {
            return (this.disponibilidad == 0)
        },
        // añade el producto al carrito
        add(){
            carrito_app_object.add(this.id, this.nombre, this.precio,this.imagen)
        },
        // actualiza los datos del componente con los nuevos datos recogidos de la bd
        actualizar(){
            this.datos = datos_ajax_productos
            this.datos_info = datos_ajax_productos_info
        }

    },
    computed:{
        //inserta el componente de traduccion
        lt(){
            return literales_app_object.lt
        },
        // para pooner la correcta descripcion del producto segun el idioma
        descripcion(){
            let temp = this
            let descripcion = this.datos_info.find((ele)=>{return ele.id_producto==temp.id+1 && ele.idioma == literales_app_object.idioma}).descripcion
            console.log(descripcion)
            return descripcion
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
        <p>{{lt.precio}}: {{precio + "€"}}</p>
        <p v-bind:class='{agotado: esta_agotado()}'>{{lt.hay}}: {{disponibilidad}} {{lt.unidades}}</p>
        <button v-if='disponibilidad!=0' @click='add()'>{{lt.add_cart}}</button>
    </div>

</div>
`
})
var producto_app_object

//carga de los productos de la bd, cuando se carge las imagenes, iniciara el carousel y el componente de productos
function cargar_datos_productos(primera=false){
    $.ajax({
        url: "http://localhost/bbdd.php?modo=productos",
        cache:false,
        success: function (result) {
            let resultado = JSON.parse(result)
            datos_ajax_productos = resultado.productos
            datos_ajax_productos_info = resultado.info
            //si es la primera vez que se llama, carga el carousel y monta el componente
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

//regex del formulario
var regex = {
    nombre: /^[A-Z][a-z]+$/,
    fecha: /^\d{4}\/\d{1,2}\/\d{1,2}$/,
    correo: /^[A-z.1-9]+@[A-z.1-9]+\.[A-z]{1,3}$/,
    banco: /^ES\d{22}$/,
    telefono: /^[89]\d{8}$/,
    passw: /(?=.*[0-9])(?=.*[A-z])(?=.*[!-\/:-@\[-_\{-~]).{12,}/
}
//testea los inputs, y les pone una clase si esta bien o mal
function test(elemento, id) {
    let input = $(elemento)
    let resultado = regex[id].test(input.val())
    resultado ? input.attr("class", "bien") : input.attr("class", "mal")

}
//componente para el logueo y registro
let componente_login = createApp({
    data() {
        //boton del navbar
        $("#login_button").on("click", () => this.activar())
        return {
            logueado: false,
            activo: false,
            correo: ""
        }
    },
    methods: {
        activar() {
            desactivar_global()
            this.activo = true
        },
        desactivar() {
            this.activo = false
        },
        //recoge los datos del formulario y los envia mediante post al bd, sirve para el login y para el registro 
        envio(event, modo) {
            event.preventDefault()
            let form = event.target.parentElement //coge el form desde el que se ha cliclado el boton de enviar
            let inputs = form.querySelectorAll("input")
            let datos = { modo: modo } // asigna si es para login o registro
            let completo = true
            //recoge los datos del form
            inputs.forEach(function (value, index, array) {
                if (!value.classList.contains("bien")) {
                    completo = false // si algun input esta mal, no se envia
                }
                datos[value.name] = value.value
            })
            if (completo) {
                let temp = this // workaround para que dentro del $.post detecte el this como del componenten y no del objeto $post 
                $.post("http://localhost/bbdd.php", datos, function (data, status) {
                    if (data == true) {
                        // si es correcto todo, te loguea y vacia el form
                        inputs.forEach(function (value, index, array) {
                            value.value = ""
                        })
                        temp.correo = datos.correo
                        temp.logueado = true
                        $("#cuenta_usuario").text(datos.correo)
                    } else {
                        //si hay algun error
                        if(modo == "registro"){
                            alert(temp.lt.error_email_existente)
                        }else if(modo == "login"){
                            alert(temp.lt.error_datos_mal)
                        }
                    }
                });
            }

        },
        //boton de desloguear
        deloguear(event){
            event.preventDefault()
            $("#cuenta_usuario").text("")
            this.logueado = false
            this.correo = ""
        }
    },
    computed:{
        //inserta el componente de traduccion
        lt(){
            return literales_app_object.lt
        }
    },

    template: `
<div class='izq' v-if='activo' id='form_container'>
    <div v-if='!logueado'>
        <form>
            <h1>{{lt.registro}}</h1>

            <label>{{lt.nombre}}</label>
            <input name='nombre' oninput="test(this,this.name)">

            <label>{{lt.fecha_de_nacimiento}}</label>
            <input name='fecha' oninput="test(this,this.name)">

            <label>{{lt.email}}</label>
            <input name='correo' oninput="test(this,this.name)">

            <label>{{lt.banco}}</label>
            <input name='banco' oninput="test(this,this.name)">

            <label>{{lt.telefono}}</label>
            <input name='telefono' oninput="test(this,this.name)">

            <label>{{lt.clave}}</label>
            <input name='passw' oninput="test(this,this.name)">

            <button @click='envio($event,"registro")'>{{lt.enviar}}</button>
        </form>

        <form>
            <h1>{{lt.login}}</h1>
            <label>{{lt.email}}</label>
            <input name='correo' oninput="test(this,this.name)">
            <label>{{lt.clave}}</label>
            <input name='passw' oninput="test(this,this.name)">

        <button @click='envio($event,"login")'>{{lt.enviar}}</button>
    </form>

    </div>
    <div v-else>
    <h1>{{correo}}</h1>
    <button @click='deloguear($event)'>{{lt.desloguear}}</button>
    </div>

</div>
`
})
let login_app_object = componente_login.mount("#app_login")


// componente de la informacion "sobre nosotros"
let componente_about = createApp({
    data() {
        //activa el componente mediante el navbar
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
    computed:{
        //inserta el componente de traduccion
        lt(){
            return literales_app_object.lt
        }
    },


    template: `
<div v-if='activo'>
    <h1>{{lt.nosotros}}</h1>
    <p>{{lt.somos}}</p>
    <p>{{lt.correo}}: ŸQËÄ.müëblës@gmail.com</p>
    <p>{{lt.telefono}}: 666 666 666</p>
    <p>{{lt.direccion}}: Calle falsa 123</p>
</div>
`
})
let about_app_object = componente_about.mount("#app_about")


//componente del carrito
let componente_carrito = createApp({
    data() {
        //activa el componente mediante el navbar
        $("#carrito_button").on("click", () => this.activar())
        return {
            elementos:{}, // elementos del carrito
            activo: false,            
        }
    },
    methods: {
        activar() {
            desactivar_global()
            this.activo = true
        },
        desactivar() {
            this.activo = false
        },
        //añade el producto al carrito
        add(id, nombre,precio,img){
            //si no existe, lo añade con una unidad a comprar
            if(this.elementos[id] == undefined){
                let elemento = {}
                elemento["cantidad"] = Math.min(1,datos_ajax_productos[id]["disponibilidad"])
                elemento["precio"] = precio
                elemento["nombre"] = nombre
                elemento["id"]= id
                elemento["img"] = img
                this.elementos[id] = elemento
                
            }else{
                // si ya existe, le suma 1 al producto a comprar
                // this.elementos[id]["cantidad"] +=1
            } 
        },
        //cancela la compra eliminando los elementos de la cesta
        cancelar(){
            this.elementos = {}
        },
        // se resta la cantidad de productos de la bd, se actualiza los datos del ajax y borra la cesta de la compra
        comprar(){
            let datos = {modo:"comprar",datos:this.elementos}
            $.post("http://localhost/bbdd.php", datos, function (data, status) {
                // console.log(data)
                cargar_datos_productos()
            })
            this.cancelar()
        }

    },
    computed:{
        //suma del precio de todos los productos
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
        // inserta el atributo de logged del componente login
        no_registrado(){
            return !login_app_object.logueado
        },
        //inserta el componente de traduccion
        lt(){
            return literales_app_object.lt
        }

    },


    template: `
<div v-if='activo'>
    <h1>{{lt.carrito}}</h1>
    <div id="productos_carrito">

    <div class="producto_carrito" v-for="prod in elementos">
        <h1>{{prod.nombre}}</h1>
        <img :src="prod.img">
        <p>{{lt.precio_individual}}:  {{prod.precio}} €</p>
        <input type="number" v-model="prod.cantidad"  > {{lt.cantidad}}</input>
        <button @click="delete elementos[prod.id]"> {{lt.eliminar_producto}}</button>
    </div>

    
    
    </div>
    <p id="precio_total">
    {{lt.precio_total}}: {{precio_total}} €
    </p>
    <p v-if="no_registrado">{{lt.tienes_que_loguear}}</p>
    <div id="botones">
        <button @click='comprar()' v-if="!no_registrado"> {{lt.comprar}}</button>
        <button @click='cancelar()'>{{lt.cancelar}}</button>
    </div>

</div>
`
})
let carrito_app_object = componente_carrito.mount("#app_carrito")



// hace invisible todos los componentes
function desactivar_global() {
    producto_app_object.desactivar()
    login_app_object.desactivar()
    about_app_object.desactivar()
    carrito_app_object.desactivar()
}