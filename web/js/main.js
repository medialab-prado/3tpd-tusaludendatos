(function(){
    var map = L.map('mapa').setView([40.423852777777775, -3.6823194444444445], 13).invalidateSize();

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

})();
