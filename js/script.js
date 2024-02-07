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
// animar_titulo()

document.addEventListener('scroll', () => { document.documentElement.dataset.scroll = Number(window.scrollY > 50); });


function obtener_imagenes_carousel() {
    return ["https://static.islas.ikea.es/assets/images/590/0859014_PE624334_S4.webp",
        "https://static.islas.ikea.es/assets/images/848/0484875_PE621342_S4.webp",
        "https://www.ikea-club.org/cache/zoo_images/2/2b8a4cb398df2c67c1253afc63b0caa2.jpg",
        "https://www.ikea.com/images/23/96/23966f1e8220f77d8526c64eae36c4af.jpeg?f=s",
        "https://www.ikea.com/es/es/images/products/hemnes-mueble-salon-marron-claro__0805270_pe769480_s5.jpg"
    ]
}

function carousel() {
    let carousel_div = $("#carousel")
    let imagenes = obtener_imagenes_carousel()
    for (let imagen of imagenes) {
        let image = $(document.createElement("img"))
        image.attr("src", imagen)
        carousel_div.append(image)
    }
}

carousel()