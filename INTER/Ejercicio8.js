"use strict";
class Meteo {

    first
    apikey
    ciudad
    unidades
    idioma
    url
    error
    datos

    constructor() {
        this.first = true
        this.apikey = "1baa2cbfe0fa6cdd6404a5db7839d6a5"
        this.ciudad = ""
        this.unidades = "&units=metric"
        this.idioma = "&lang=es"
        this.url = ""
        this.error = "¡Problemas! No se pudo obtener información de <a href='http://openweathermap.org'> OpenWeatherMap </a>"
        this.datos = ""
    }

    cargarCiudadYUrl(n) {
        if(n == 1) this.ciudad = "Gijon"
        else if(n == 2) this.ciudad = "Oviedo"
        else if(n == 3) this.ciudad = "Madrid"
        else if(n == 4) this.ciudad = "Barcelona"
        else if(n == 5) this.ciudad = "Salamanca"

        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey
    }

    cargarDatos(n) {
        if(this.first)
            this.first = false
        else
            $("section:last").remove()

        this.cargarCiudadYUrl(n)

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: data => {
                this.datos = data;
                this.verDatos();           
            },
            error: () => {
                $("section").after("<section> </section>")
                $("section:last").append("<h3> ERROR </h3>")
                $("section:last").append("<p> " + this.error + " </p>");
            }
        });
    }

    verDatos() {
        $("section").after("<section> </section>")
        $("section:last").append("<h3> DATOS </h3>");
        $("section:last").append("<p> Ciudad: " + this.datos.name + " </p>");
        $("section:last").append("<p> País: " + this.datos.sys.country + " </p>");
        $("section:last").append("<p> Latitud: " + this.datos.coord.lat + " grados </p>");
        $("section:last").append("<p> Longitud: " + this.datos.coord.lon + " grados </p>");
        $("section:last").append("<p> Temperatura: " + this.datos.main.temp + " grados Celsius </p>");
        $("section:last").append("<p> Temperatura máxima: " + this.datos.main.temp_max + " grados Celsius </p>");
        $("section:last").append("<p> Temperatura mínima: " + this.datos.main.temp_min + " grados Celsius </p>");
        $("section:last").append("<p> Presión: " + this.datos.main.pressure + " milímetros </p>");
        $("section:last").append("<p> Humedad: " + this.datos.main.humidity + "% </p>"); 
        $("section:last").append("<p> Amanece a las: " + new Date(this.datos.sys.sunrise *1000).toLocaleTimeString() + " </p>"); 
        $("section:last").append("<p> Oscurece a las: " + new Date(this.datos.sys.sunset *1000).toLocaleTimeString() + " </p>"); 
        $("section:last").append("<p> Dirección del viento: " + this.datos.wind.deg + "  grados </p>");
        $("section:last").append("<p> Velocidad del viento: " + this.datos.wind.speed + " metros/segundo </p>");
        $("section:last").append("<p> Hora de la medida: " + new Date(this.datos.dt *1000).toLocaleTimeString() + " </p>");
        $("section:last").append("<p> Fecha de la medida: " + new Date(this.datos.dt *1000).toLocaleDateString() + " </p>");
        $("section:last").append("<p> Descripción: " + this.datos.weather[0].description + " </p>");
        $("section:last").append("<p> Visibilidad: " + this.datos.visibility + " metros </p>");
        $("section:last").append("<p> Nubosidad: " + this.datos.clouds.all + " % </p>");
        $("section:last").append("<picture> <img src=\"https://openweathermap.org/img/w/" + this.datos.weather[0].icon + ".png\" alt=\"Icono\" /> </picture>")
    }

}

var meteo = new Meteo();
