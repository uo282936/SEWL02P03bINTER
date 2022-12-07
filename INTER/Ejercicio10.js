"use strict";
class Consulter {

    constructor() { 
        this.first = true
        this.lang = "es"
        this.category = "mercados"
        this.widget = "precios-mercados-tiempo-real"
        this.query = ""
        this.url = ""
        this.datos = ""
        this.err = "No se pudieron cargar los datos correctamente"
    }

    getPrecios() {
        var fecha = $("input:first").val()
        this.query = "start_date=" + fecha + "T00:00&end_date=" + fecha + "T23:59&time_trunc=hour"
        this.url = "https://apidatos.ree.es/" + this.lang + "/datos/" + this.category + "/" + this.widget + "?" + this.query
        this.cargarDatos(fecha)
    }

    cargarDatos(fecha) {
        if(this.first) this.first = false
        else $("section:last").remove()

        if(this.falloFecha(fecha)) return

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
                $("section:last").append("<p> " + this.err + " </p>");
            }
        });
    }

    falloFecha(fecha) {
        if(fecha == null || fecha == "") {
            $("section").after("<section> </section>")
            $("section:last").append("<h3> ERROR </h3>")
            $("section:last").append("<p> Debe introducirse una fecha </p>");
            return true
        } else if(fecha.split("-")[0] < 2014 || fecha.split("-")[0] > 2022 || (fecha.split("-")[0] == 2022 && fecha.split("-")[1] == 12)) {
            $("section").after("<section> </section>")
            $("section:last").append("<h3> ERROR </h3>")
            $("section:last").append("<p> La fecha introducida no es válida </p>");
            return true
        }
        return false
    }

    verDatos() {
        $("section").after("<section> </section>")
        $("section:last").append("<h3> " + this.datos.data.attributes.title + " </h3>");
        $("section:last").append("<p> Tipo tarifa: " + this.datos.included[0].attributes.title + " </p>")
        $("section:last").append("<ul> </ul>")
        
        var i = 0
        var total = new Number(0)
        while(i < 24) {
            var instant = this.datos.included[0].attributes.values[i].datetime + ""
            var day = instant.substring(0,10) + ""
            var hour = instant.substring(11,16) + ""
            var precio = this.datos.included[0].attributes.values[i].value + ""

            total += new Number(precio)

            if(this.haveDot(precio) && (precio.split(".")[1] + "").length == 1) precio += "0"
            else if(!this.haveDot(precio)) precio += ".00"

            $("ul").append("<li> " + day + " (" + hour + "h)  ---  " + precio + " €/MWh </li>")
            i++
        }

        var media = new Number(total / 24)
        $("ul").after("<p> Precio medio del día: " + media + "€/MWh </p>")
    }

    haveDot(n) {
        var separated = (n + "").split(".")
        if(separated[1] == null) return false;
        return true;
    }
    
}

var consulter = new Consulter();
