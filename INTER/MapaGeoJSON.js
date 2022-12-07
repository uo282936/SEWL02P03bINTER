"use strict"
class Mapeador {

    constructor() {
        this.ready = false
        if (window.File && window.FileReader && window.FileList && window.Blob)
            $("header").after("<p> Este navegador soporta el API File </p>");
        else $("header").after("<p> ¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!! </p>");
    }

    cargarGeoJSON(files) {
        var archivo = files[0]

        if($("p:last").text() == "Error: El archivo no es de tipo GeoJSON") { $("p:last").remove() }
        if(this.ready) { this.ready = false; $("input:last").remove() }

        if(files == null || files.length == 0) return;

        var tipoGeoJSON = "GeoJSON";

        if (archivo.name.split(".")[1].toUpperCase() == tipoGeoJSON.toUpperCase()) {
            var lector = new FileReader();
            lector.onload = (evento) => { this.contenido = lector.result }
            lector.readAsText(archivo);

            $("input").after("<input type=\"button\" value=\"Obtener mapa\" onClick = \"mapeador.parsear()\" />")
            this.ready = true
        }
        else {
            $("input").after("<p> </p>")
            $("p:last").text("Error: El archivo no es de tipo GeoJSON")

            this.ready = false
        }

    }

    parsear() {
        var lat = []; var lon = [];

        var coords = this.contenido.match(/\"coordinates\":\s\[\s-?[0-9]+.[0-9]*,\s-?[0-9]+.[0-9]*\s\]/g)

        var i = 0
        while (i < coords.length) {
            var real = coords[i].match(/-?[0-9]+.[0-9]*,\s-?[0-9]+.[0-9]*/)[0].split(", ")

            lat[i] = real[1]
            lon[i] = real[0]
            i++
        }

        this.mapear(lat, lon)
    }

    mapear(lat, lon) {
        $("section").remove()
        $("input:last").after("<section id='map'></section>")

        mapboxgl.accessToken = "pk.eyJ1IjoidW8yODI5MzYiLCJhIjoiY2xiMjgwYWdnMDIwNTNxcGM2YWxzNHhwaiJ9.lt1wwIkdINyVR_cVjdIpDA"
        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [-3.70381, 40.41664], zoom: 5 });

        var i = 0
        while(i < lat.length) {
            var marker = new mapboxgl.Marker({color: "red"}).setLngLat([lon[i], lat[i]]).addTo(map);
            i++
        }
    }

}

var mapeador = new Mapeador();
