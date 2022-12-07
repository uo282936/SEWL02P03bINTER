"use strict"
class Mapa {

    contructor() { }

    initMap(){
        $("header").after("<section id='map'></section>")
        mapboxgl.accessToken = "pk.eyJ1IjoidW8yODI5MzYiLCJhIjoiY2xiMjgwYWdnMDIwNTNxcGM2YWxzNHhwaiJ9.lt1wwIkdINyVR_cVjdIpDA"
        var map = new mapboxgl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v12', center: [-5.649302, 43.491062], zoom: 15 });
        var marker = new mapboxgl.Marker({color: "red"}).setLngLat([-5.649302, 43.491062]).addTo(map);
    }
    
}

var mapa = new Mapa();
mapa.initMap()
