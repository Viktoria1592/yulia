ymaps.ready(init);
 
function init(){     
 
    var myMap;
 
    myMap = new ymaps.Map("map", {
        center: [52.4284, 31.0035],
        zoom: 16,
        controls: []
    });
 
    myMap.behaviors.disable('scrollZoom');
 
    myMap.controls.add("zoomControl", {
        position: {top: 15, left: 15}
    });
 
    var myPlacemark = new ymaps.Placemark([52.4284, 31.0035] , {},
        { iconLayout: 'default#image',
          iconImageHref: ('img/mouth.svg'),
          iconImageSize: [70, 70],
          iconImageOffset: [-20, -47] });     
 
    myMap.geoObjects.add(myPlacemark);
 
}
