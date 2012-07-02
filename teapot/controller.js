document.onmousewheel = function ( e ) {
    var d = e.wheelDeltaY / 100;
    if ( teapot.z + d > -200 && teapot.z + d < -100 ) {
        teapot.setZoom( teapot.z + d );
    }
    return false;
};
document.onmousedown = function ( e ) {
    if ( e.which == 1 ) {
        mouse = [ e.clientX, e.clientY ];
        document.onmousemove = function ( e ) {
            teapot.rotate( e.clientY - mouse[ 1 ], e.clientX - mouse[ 0 ], 0 );
            mouse = [ e.clientX, e.clientY ];
        };
    }
};
document.onmouseup = function () {
    document.onmousemove = function () {
    };
};
