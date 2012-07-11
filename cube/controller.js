document.onmousewheel = function ( e ) {
  var d = e.wheelDeltaY / 1000;
  if ( cube.z + d > -15 && cube.z + d < -5 ) {
    cube.setZoom( cube.z + d );
  }
  return false;
};
document.onmousedown = function ( e ) {
  if ( e.which == 1 ) {
    mouse = [ e.clientX, e.clientY ];
    document.onmousemove = function ( e ) {
      cube.rotate( e.clientY - mouse[ 1 ], e.clientX - mouse[ 0 ], 0 );
      mouse = [ e.clientX, e.clientY ];
    };
  }
};
document.onmouseup = function () {
  document.onmousemove = function () {
  };
};
