"use strict";
class GeoLocalizacion {

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

    showPosition(){
        $("img").remove()
        $("p").remove()

        $("input").after("<p> " + this.mensaje + " </p>")
        
        if(this.mensaje != "Se ha realizado la geolocalización correctamente") return;

        var apiKey = "pk.eyJ1IjoidW8yODI5MzYiLCJhIjoiY2xiMjgwYWdnMDIwNTNxcGM2YWxzNHhwaiJ9.lt1wwIkdINyVR_cVjdIpDA";
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+ff0000(" 
        + this.longitud + "," + this.latitud + ")/" + this.longitud + "," + this.latitud + ",14,0/600x500?access_token=" + apiKey;

        $("p").after("<img src=\"" + url + "\" alt=\"Mapa Estático\" />")
    }

}

var geolocalizacion = new GeoLocalizacion();
