"use strict"
class Executor {

    constructor() {
        this.ready = false
        if (window.File && window.FileReader && window.FileList && window.Blob)
            $("header").after("<p> Este navegador soporta el API File </p>");
        else $("header").after("<p> ¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!! </p>");
    }

    cargarTXT(files) {
        var archivo = files[0]

        if(this.ready) { this.ready = false; $("article:first input:last").remove() }

        if(files == null || files.length == 0) return;

        var tipo = "text/plain";

        if (archivo.type == tipo) {
            var lector = new FileReader();
            lector.onload = (evento) => { this.contenido = lector.result }
            lector.readAsText(archivo);

            $("article:first input").after("<input type=\"button\" value=\"Pintar\" onClick = \"exec.pintar()\" />")
            $("article:first p").text("ESTADO: Archivo cargado correctamente")
            this.ready = true
        }
        else {
            $("article:first p").text("ESTADO: Error, el archivo no es de texto plano (text/plain)")
            this.ready = false
        }

    }

    pintar() {
        $("canvas").remove()
        $("article:first").after("<canvas></canvas>")

        var rectangulos = this.contenido.match(/rectangulo-[0-9]+\/[0-9]+\/[0-9]+\/[0-9]+-[a-z]*/g)
        var triangulos = this.contenido.match(/triangulo-[0-9]+,[0-9]+\/[0-9]+,[0-9]+\/[0-9]+,[0-9]+-[a-z]*/g)
        var circulos = this.contenido.match(/circulo-[0-9]+\/[0-9]+\/[0-9]+-[a-z]*/g)

        var canvas = document.getElementsByTagName("canvas")[0];
        var canvas1 = canvas.getContext("2d")

        // Procesado de los rectangulos
        var i = 0
        while(rectangulos != null && i < rectangulos.length) {
            var dims = rectangulos[i].split("-")[1].split("/")
            var color = this.cargarColor(rectangulos[i].split("-")[2])

            canvas1.fillStyle = color
            canvas1.fillRect(dims[0], dims[1], dims[2], dims[3])

            i++
        }

        // Procesado de los triangulos
        var j = 0
        while(triangulos != null && j < triangulos.length) {
            var points = triangulos[j].split("-")[1].split("/")
            var color = this.cargarColor(triangulos[j].split("-")[2])

            canvas1.fillStyle = color
            canvas1.beginPath()
            canvas1.moveTo(points[0].split(",")[0], points[0].split(",")[1])
            canvas1.lineTo(points[1].split(",")[0], points[1].split(",")[1])
            canvas1.lineTo(points[2].split(",")[0], points[2].split(",")[1])
            canvas1.closePath()
            canvas1.fill()

            j++
        }

        // Procesado de los circulos
        var k = 0
        while(circulos != null && k < circulos.length) {
            var points = circulos[k].split("-")[1].split("/")
            var color = this.cargarColor(circulos[k].split("-")[2])

            canvas1.fillStyle = color
            canvas1.beginPath()
            canvas1.arc(points[0], points[1], points[2], 0, Math.PI * 2)
            canvas1.closePath()
            canvas1.fill()

            k++
        }
    }

    cargarColor(color) {
        if(color == "rojo") return "rgba(255, 0, 0, 1)"
        else if(color == "azul") return "rgba(0, 0, 255, 1)"
        else if(color == "amarillo") return "rgba(255, 255, 0, 1)"
        else if(color == "verde") return "rgba(0, 255, 0, 1)"
        else if(color == "random") 
            return "rgba(" + Math.floor(Math.random()*256) + ", " + Math.floor(Math.random()*256) + ", " + Math.floor(Math.random()*256) + ", 1)"
        else return "rgba(0, 0, 0, 1)"
    }

    copy() {
        if(this.ready)
            navigator.clipboard.writeText(this.contenido)
    };

}

var exec = new Executor();
