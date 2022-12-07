"use strict";
class GeoLocalizacion {

    constructor (){
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
        $("ul").remove()
        $("p").remove()

        $("input").after("<p> " + this.mensaje + " </p>")
        $("p").after("<ul> </ul>")
        $("ul").append("<li> Longitud: " + this.longitud + " grados </li>")
        $("ul").append("<li> Latitud: " + this.latitud + " grados </li>")
        $("ul").append("<li> Precisión de la latitud y longitud: " + this.precision + " metros </li>")
    }

}

var geolocalizacion = new GeoLocalizacion();
