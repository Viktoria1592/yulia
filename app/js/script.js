
var mapFrame = document.getElementById('map');
if (mapFrame) {
    ymaps.ready(initMap)
};

function initMap() {
    var myMap;
    myMap = new ymaps.Map("map", {
        center: [59.938816, 30.323244]
        , zoom: 16
        , controls: []
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add("zoomControl", {
        position: {
            top: 15
            , left: 15
        }
    });
    var myPlacemark = new ymaps.Placemark([59.938816, 30.323244], {}, {
        iconLayout: 'default#image'
        , iconImageHref: ('../img/ser-4.png')
        , iconImageSize: [218, 142]
        , iconImageOffset: [-20, -47]
    });
    myMap.geoObjects.add(myPlacemark);
};
