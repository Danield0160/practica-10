
// var indice_global 
// async function animacion(imagenes, indice ,unico=false) {
//     if(indice){indice_global = indice}else{indice = indice_global}

//     await new Promise(function (resolve) {
//         for (let imagen of imagenes) {
//             imagen.animate({ left: (-45 * indice) + "vh" }, 1000, () => resolve())
//         }
//     })
//     if(unico){return}
//     await new Promise(function (resolve) {
//         setTimeout(() => resolve(), 2200)
//     })

//     if (indice_global > imagenes.length -2) {
//         for (let imagen of imagenes) {
//             imagen.css("left", "0")
//         }
//         animacion(imagenes,1)
//     } else {
//         animacion(imagenes, Number(indice_global) + 1)
//     }
// }
// animacion(imagenes_div,1)

// let container = $(document.createElement("div")).attr("id","carousel_controller")
// for (let indice = 1; indice < imagenes_div.length; indice++) {
//     let boton = $(document.createElement("button"))
//     boton.text(indice)
//     boton.on("click", function () { animacion(imagenes_div, indice,true) })
//     container.append(boton)
// }
// $("#cuerpo").append(container)