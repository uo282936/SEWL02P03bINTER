"use strict";
class Meteo {

    first
    apikey
    ciudad
    tipo
    unidades
    idioma
    url
    error

    constructor() {
        this.first = true
        this.apikey = "1baa2cbfe0fa6cdd6404a5db7839d6a5"
        this.ciudad = ""
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric"
        this.idioma = "&lang=es"
        this.url = ""
        this.error = "¡Problemas! No se pudo obtener información de <a href='http://openweathermap.org'> OpenWeatherMap </a>"
    }

    cargarCiudadYUrl(n) {
        if(n == 1) this.ciudad = "Gijon"
        else if(n == 2) this.ciudad = "Oviedo"
        else if(n == 3) this.ciudad = "Madrid"
        else if(n == 4) this.ciudad = "Barcelona"
        else if(n == 5) this.ciudad = "Salamanca"

        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey
    }

    cargarDatos(n) {
        if(this.first)
            this.first = false
        else
            $("section:last").remove()

        this.cargarCiudadYUrl(n)

        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                var totalNodos            = $('*',datos).length;
                var ciudad                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer) - minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");          
                var oscurecerMiliSeg1970  = Date.parse(oscurecer) - minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var presion               = $('pressure',datos).attr("value");
                var presionUnit           = $('pressure',datos).attr("unit");
                var velocidadViento       = $('speed',datos).attr("value");
                var nombreViento          = $('speed',datos).attr("name");
                var direccionViento       = $('direction',datos).attr("value");
                var codigoViento          = $('direction',datos).attr("code");
                var nombreDireccionViento = $('direction',datos).attr("name");
                var nubosidad             = $('clouds',datos).attr("value");
                var nombreNubosidad       = $('clouds',datos).attr("name");
                var visibilidad           = $('visibility',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var precipitacionMode     = $('precipitation',datos).attr("mode");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida) - minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icono                 = $('weather',datos).attr("icon");

                $("section").after("<section> </section>")
                $("section:last").append("<h3> DATOS </h3>");
                $("section:last").append("<p> Número de elementos del XML: " + totalNodos + " </p>");
                $("section:last").append("<p> Ciudad: " + ciudad + " </p>");
                $("section:last").append("<p> País: " + pais + " </p>");
                $("section:last").append("<p> Latitud: " + latitud + " grados </p>");
                $("section:last").append("<p> Longitud: " + longitud + " grados </p>");
                $("section:last").append("<p> Temperatura: " + temperatura + " grados Celsius </p>");
                $("section:last").append("<p> Temperatura máxima: " + temperaturaMax + " grados Celsius </p>");
                $("section:last").append("<p> Temperatura mínima: " + temperaturaMin + " grados Celsius </p>");
                $("section:last").append("<p> Temperatura (unidades): " + temperaturaUnit + " </p>");
                $("section:last").append("<p> Presión: " + presion + " " + presionUnit + " </p>");
                $("section:last").append("<p> Humedad: " + humedad + " " + humedadUnit + " </p>"); 
                $("section:last").append("<p> Amanece a las: " + amanecerLocal + " </p>"); 
                $("section:last").append("<p> Oscurece a las: " + oscurecerLocal + " </p>"); 
                $("section:last").append("<p> Dirección del viento: " + direccionViento + "  grados </p>");
                $("section:last").append("<p> Nombre de la dirección del viento: " + nombreDireccionViento + " </p>");
                $("section:last").append("<p> Velocidad del viento: " + velocidadViento + " metros/segundo </p>");
                $("section:last").append("<p> Nombre del viento: " + nombreViento + " </p>");
                $("section:last").append("<p> Codigo del viento: " + codigoViento + " </p>");
                $("section:last").append("<p> Hora de la medida: " + horaMedidaLocal + " </p>");
                $("section:last").append("<p> Fecha de la medida: " + fechaMedidaLocal + " </p>");
                $("section:last").append("<p> Descripción: " + descripcion + " </p>");
                $("section:last").append("<p> Visibilidad: " + visibilidad + " metros </p>");
                $("section:last").append("<p> Nubosidad: " + nubosidad + " </p>");
                $("section:last").append("<p> Nombre de la nubosidad: " + nombreNubosidad + " </p>");
                $("section:last").append("<p> Precipitación valor: " + precipitacionValue + " </p>");
                $("section:last").append("<p> Precipitación modo: " + precipitacionMode + " </p>");
                $("section:last").append("<picture> <img src=\"https://openweathermap.org/img/w/" + icono + ".png\" alt=\"Icono\" /> </picture>")
            },
            error: function(){
                $("section").after("<section> </section>")
                $("section:last").append("<h3> ERROR </h3>")
                $("section:last").append("<p> " + this.error + " </p>");
            }
        });
    }

}

var meteo = new Meteo();
