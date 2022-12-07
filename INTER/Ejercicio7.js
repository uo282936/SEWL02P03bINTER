"use strict";
class Editor {

    num
    displayed
    added

    constructor () { 
        this.num = 1
        this.displayed = false;
        this.added = false;
    }

    mostrar(){
        $("p:first").show()
    }

    ocultar(){
        $("p:first").hide()
    }

    modificacionAmpliar() {
        $("h3:first").text("Tabla de gastos completa")
    }

    modificacionReducir() {
        $("h3:first").text("Tabla de gastos")
    }

    añadirElemento() {
        $("ul").append("<li> Maquina " + this.num++ + " </li>")
    }

    borrarElemento() {
        $("li:last").remove()
        if(this.num > 1) this.num--
    }

    recorrido() {
        if(!this.displayed) {
            this.displayed = true

            var i = 1
            $("*", document.body).each(function() {
                var str = i + " Etiqueta padre : "  + $(this).parent().get(0).tagName + " - Elemento : " + $(this).get(0).tagName
                if(i == 1)
                    $("ul").after("<p>" + str + "</p>")
                else 
                    $("p:last").after("<p>" + str + "</p>")
                i++
            });
        }
    }

    deshacerRecorrido() {
        if(this.displayed) {
            this.displayed = false

            while(true) {
                var a = ($("p:last").text() + "").split(" ")[0]
                if(! isNaN(a) && a != "")
                    $("p:last").remove();
                else
                    break;
            }
        }
    }

    sumasTabla() {
        if(!this.added) {
            this.added = true;

            var accum = [] //f1, f2, f3, f4, f5, f6, f7, f8, c1, c2, c3, c4, c5, c6
            this.iniciarAccum(accum)

            $("table td").each(function() {
                var header = $(this).attr("headers")
                var fila = header.split(" ")[0]
                var col = header.split(" ")[1]

                // Cuando estamos sobre una celda con un número -> Hacemos la suma aumentando el acumulado
                // correspondiente a su fila y columna
                if($(this).text() != "" && !isNaN($(this).text())) {
                    var num = new Number($(this).text())

                    // Suma al acumulador de la fila
                    if(fila == "maquina1") accum[0] += num
                    else if(fila == "maquina2") accum[1] += num
                    else if(fila == "maquina3") accum[2] += num
                    else if(fila == "luz") accum[3] += num
                    else if(fila == "agua") accum[4] += num
                    else if(fila == "gas") accum[5] += num
                    else if(fila == "trabajadores") accum[6] += num
                    else if(fila == "impuestos") accum[7] += num

                    // Suma al acumulador de la columna
                    if(col == "enero") accum[8] += num
                    else if(col == "febrero") accum[9] += num
                    else if(col == "marzo") accum[10] += num
                    else if(col == "abril")  accum[11] += num
                    else if(col == "mayo") accum[12] += num
                    else if(col == "junio") accum[13] += num
                } 
                
                // Cuando estamos sobre una celda sin un número -> Estamos en la fila/columna del lateral, 
                // depositamos la suma correspondiente a esa celda según la fila o columna
                else {
                    var total = accum[8] + accum[9] + accum[10] + accum[11] + accum[12] + accum[13]

                    if(fila == "maquina1") $(this).text(accum[0])
                    else if(fila == "maquina2") $(this).text(accum[1])
                    else if(fila == "maquina3") $(this).text(accum[2])
                    else if(fila == "luz") $(this).text(accum[3])
                    else if(fila == "agua") $(this).text(accum[4])
                    else if(fila == "gas") $(this).text(accum[5])
                    else if(fila == "trabajadores") $(this).text(accum[6])
                    else if(fila == "impuestos") $(this).text(accum[7])
                    else if(col == "enero") $(this).text(accum[8])
                    else if(col == "febrero") $(this).text(accum[9])
                    else if(col == "marzo") $(this).text(accum[10])
                    else if(col == "abril") $(this).text(accum[11])
                    else if(col == "mayo") $(this).text(accum[12])
                    else if(col == "junio") $(this).text(accum[13])
                    else if(col == "totalf") $(this).text(total)
                }
            });
        }
    }

    deshacerSuma() {
        if(this.added) {
            this.added = false

            $("table td").each(function() {
                var header = $(this).attr("headers")
                var fila = header.split(" ")[0]
                var col = header.split(" ")[1]

                if(fila == "totalc" || col == "totalf")
                    $(this).text("")
            });
        }
    }

    iniciarAccum(accum) {
        accum[0] = 0; accum[1] = 0; accum[2] = 0; accum[3] = 0; accum[4] = 0; 
        accum[5] = 0; accum[6] = 0; accum[7] = 0; accum[8] = 0; accum[9] = 0; 
        accum[10] = 0; accum[11] = 0; accum[12] = 0; accum[13] = 0;
    }

    receiveKeyPressed(e) {
        if(e.key == "1") this.ocultar();
        else if(e.key == "2") this.mostrar();
        else if(e.key == "3") this.modificacionAmpliar();
        else if(e.key == "4") this.modificacionReducir();
        else if(e.key == "5") this.añadirElemento();
        else if(e.key == "6") this.borrarElemento();
        else if(e.key == "7") this.recorrido();
        else if(e.key == "8") this.deshacerRecorrido();
        else if(e.key == "9") this.sumasTabla();
        else if(e.key == "0") this.deshacerSuma();
    }

}

var editor = new Editor();

document.addEventListener('keydown', (e) => editor.receiveKeyPressed(e));
