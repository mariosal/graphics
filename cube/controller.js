var dx = 0, dy = 0;

document.onmousewheel = function ( e ) {
    var d = e.wheelDeltaY / 1000;
    if ( cube.position.z + d >= NEAR && cube.position.z + d <= FAR - 1 ) {
        cube.position.z += d;
        console.log( cube.position.z );
    }
    return false;
};
document.onmousedown = function ( e ) {
    if ( e.which == 1 ) {
        mouse = [ e.clientX, e.clientY ];
        document.onmousemove = function ( e ) {
            dx += ( e.clientY - mouse[ 1 ] ) / 50;
            dy += ( e.clientX - mouse[ 0 ] ) / 50;
            cube.rotation.set( dx, dy, 0 );

            mouse = [ e.clientX, e.clientY ];
        };
    }
};
document.onmouseup = function () {
    document.onmousemove = function () {
    };
};
