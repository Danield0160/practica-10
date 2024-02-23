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
        }

    },


    template: `
<div v-if='activo'>
    <div class='izq'>
        <img :src=imagen width='50px'>
    </div>
    <div>
        <h1>{{nombre}}</h1>
        <p>{{descripcion}}</p>
        <p>{{precio + "€"}}</p>
        <p>{{disponibilidad}}</p>
    </div>

</div>
`
})
var producto_app_object
//Cuando se carge las imagenes iniciara el carousel y la parte de productos
$.ajax({
    url: "http://localhost/p10/bbdd.php",
    success: function (result) {
        let resultado = JSON.parse(result)
        datos_ajax_productos = resultado
        producto_app_object = componente_productos.mount("#app_producto")
        carousel()
        montar_menu_productos()
    }
});


//TODO: Login
let componente_login = createApp({
    data() {
        $("#login_button").on("click", () => this.activar())
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
    <h1>Login</h1>
    <form>
    <label>Nombre</label>
    <input>
    <label>fecha de nacimiento</label>
    <input>
    <label>Genero</label>
    <input>
    <label>dni</label>
    <input>
    <label>contraseña</label>
    <input>

    <button>enviar</button>
    </form>

</div>
`
})
let login_app_object = componente_login.mount("#app_login")


//TODO: sobre nosotros
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
            console.log("about des")
            this.activo = false
        }

    },


    template: `
<div v-if='activo'>
    <h1>sobre nosostros</h1>
</div>
`
})
let about_app_object = componente_about.mount("#app_about")











function desactivar_global() {
    producto_app_object.desactivar()
    login_app_object.desactivar()
    about_app_object.desactivar()
}