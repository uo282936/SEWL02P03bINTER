"use strict"
class Visor {

    constructor() { 
        if (window.File && window.FileReader && window.FileList && window.Blob)
            $("header").after("<p> Este navegador soporta el API File </p>");
        else $("header").after("<p> ¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!! </p>");
    }

    leerArchivoTexto(files) {
		if(files == null || files.length == 0) return;
		
        var archivo = files[0]

        $("section").remove()
        $("input").after("<section> </section>")
        $("section").append("<h2> DATOS </h2>")
        $("section").append("<p> Nombre del archivo: " + archivo.name + " </p>")
        $("section").append("<p> Tamaño del archivo: " + archivo.size + " bytes </p>")
        $("section").append("<p> Tipo del archivo: " + archivo.type + " </p>")
        $("section").append("<p> Fecha de última modificación: " + archivo.lastModifiedDate + " </p>")
        $("section").append("<p> Contenido del archivo: </p>")
        $("section").append("<pre> </pre>")
        
        var tipoTexto = /text.*/; 
        // el tipo xml es de tipo text/xml, por lo que está incluido en la expresión regular anterior
        var tipoJson = "application/json";

        if (archivo.type.match(tipoTexto) || archivo.type == tipoJson) {
            var lector = new FileReader();
            lector.onload = (evento) => $("pre").text(lector.result)
            lector.readAsText(archivo);
        }
        else
            $("pre").text("Error: ¡¡¡ Archivo no válido !!!")

    }

}

var visor = new Visor();
