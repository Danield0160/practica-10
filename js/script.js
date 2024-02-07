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


    let tiempo_entre_oleaje =2000
    let tiempo_de_la_ola = 200
    let tiempo_entre_olas = 1
    let altura_ola = 10
    async function animacion(letras, indice=0) {
        let index = indice % letras.length
        let index_ant = (indice-1) % letras.length
        $(letras[index_ant]).animate({ top: "0" }, tiempo_de_la_ola)

        if (index ==0){
            await new Promise(function (resolve){
                setTimeout(()=>resolve(),tiempo_entre_oleaje)
            })
        }
        $(letras[index]).animate({ top: `-${altura_ola}px` }, tiempo_de_la_ola, function () {
            setTimeout((x)=>{animacion(letras, indice + 1)}, tiempo_entre_olas);
        })
        
    }

    animacion(letras)
}
animar_titulo()

document.addEventListener('scroll', () => {document.documentElement.dataset.scroll = Number(window.scrollY>50);});

