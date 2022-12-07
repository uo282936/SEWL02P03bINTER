"use strict";
class GeoLocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(posicion){
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;    
    }

    showPosition(){
        $("ul").remove()

        $("input").after("<ul> </ul>")
        $("ul").append("<li> Longitud: " + this.longitud + " grados </li>")
        $("ul").append("<li> Latitud: " + this.latitud + " grados </li>")
        $("ul").append("<li> Precisión de la latitud y longitud: " + this.precision + " metros </li>")
    }

}

var geolocalizacion = new GeoLocalizacion();
