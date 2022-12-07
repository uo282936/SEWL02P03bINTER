"use strict"
class Mapa {

    constructor (){
        this.mensaje = "Permiso no concedido"
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.mensaje = "Se ha realizado la geolocalización correctamente";
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    initMap(){
        $("section").remove()
        $("p").remove()
        $("input").after("<p>" + this.mensaje + "</p>")

        if(this.mensaje != "Se ha realizado la geolocalización correctamente") return;

        $("p:last").after("<section id='map'></section>")
        mapboxgl.accessToken = "pk.eyJ1IjoidW8yODI5MzYiLCJhIjoiY2xiMjgwYWdnMDIwNTNxcGM2YWxzNHhwaiJ9.lt1wwIkdINyVR_cVjdIpDA"
        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [this.longitud, this.latitud], zoom: 15 });
        var marker = new mapboxgl.Marker({color: "red"}).setLngLat([this.longitud, this.latitud]).addTo(map);
    }
    
}

var mapa = new Mapa();
