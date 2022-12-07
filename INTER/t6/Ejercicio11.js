"use strict"
class Mapa {

    constructor () { }

    initMap(){
        $("input:last").after("<section id='map'></section>")
        mapboxgl.accessToken = "pk.eyJ1IjoidW8yODI5MzYiLCJhIjoiY2xiMjgwYWdnMDIwNTNxcGM2YWxzNHhwaiJ9.lt1wwIkdINyVR_cVjdIpDA"
        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [-3.70381, 40.41664], zoom: 5 });
    }

    sudafrica() {
        $("section").remove()
        $("input:last").after("<section id='map'></section>")

        var latSud = [-26.23479, -33.90344, -29.82900, -26.19750, -25.75322, -33.93775, -23.92473, -25.46169, -29.11734, -25.57873]
        var lonSud = [27.98264, 18.41116, 31.03033, 28.06079, 28.22295, 25.59941, 29.46879, 30.92967, 26.20880, 27.16095]

        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [24.58291, -29.61747], zoom: 5 });

        var i = 0
        while(i < 10) {
            var marker = new mapboxgl.Marker({color: "red"}).setLngLat([lonSud[i], latSud[i]]).addTo(map);
            i++
        }
    }

    brasil() {
        $("section").remove()
        $("input:last").after("<section id='map'></section>")

        var latBra = [-19.86591, -15.78354, -15.60400, -25.44822, -3.80729, -3.08325, -5.82681, -30.0655, -8.04069, -22.91215, -12.97883, -23.54531]
        var lonBra = [-43.97107, -47.89919, -56.12163, -49.27693, -38.52245, -60.02813, -35.21238, -51.23585, -35.00821, -43.23019, -38.50427, -46.47424]

        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [-51.94576, -16.89853], zoom: 3 });

        var i = 0
        while(i < 12) {
            var marker = new mapboxgl.Marker({color: "red"}).setLngLat([lonBra[i], latBra[i]]).addTo(map);
            i++
        }
    }

    rusia() {
        $("section").remove()
        $("input:last").after("<section id='map'></section>")

        var latRus = [55.71564, 55.81778, 59.97305, 54.69818, 55.82108, 56.33741, 53.27808, 48.73433, 54.18160, 47.20949, 43.40196, 56.83249]
        var lonRus = [37.55363, 37.44021, 30.22026, 20.53366, 49.16073, 43.96348, 50.23727, 44.54844, 45.20369, 39.73772, 39.95591, 60.57357]

        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [37.21565, 52.56856], zoom: 3.5 });

        var i = 0
        while(i < 12) {
            var marker = new mapboxgl.Marker({color: "red"}).setLngLat([lonRus[i], latRus[i]]).addTo(map);
            i++
        }
    }

    qatar() {
        $("section").remove()
        $("input:last").after("<section id='map'></section>")

        var latQat = [25.65210, 25.42080, 25.28881, 25.23522, 25.31086, 25.32963, 25.26362, 25.15979]
        var lonQat = [51.48780, 51.49040, 51.56643, 51.53217, 51.42447, 51.34236, 51.44811, 51.57421]

        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [51.39864, 25.30829], zoom: 8 });

        var i = 0
        while(i < 8) {
            var marker = new mapboxgl.Marker({color: "red"}).setLngLat([lonQat[i], latQat[i]]).addTo(map);
            i++
        }
    }
    
}

var mapa = new Mapa();
mapa.initMap();
