document.onmousewheel = function ( e ) {
    var d = e.wheelDeltaY / 1000;
    if ( renderer.z + d > -15 && renderer.z + d < -5 ) {
        renderer.setZoom( renderer.z + d );
    }
    return false;
};
document.onmousedown = function ( e ) {
    if ( e.which == 1 ) {
        mouse = [ e.clientX, e.clientY ];
        document.onmousemove = function ( e ) {
            renderer.rotate( e.clientY - mouse[ 1 ], e.clientX - mouse[ 0 ], 0 );
            mouse = [ e.clientX, e.clientY ];
        };
    }
};
document.onmouseup = function () {
    document.onmousemove = function () {
    };
};
