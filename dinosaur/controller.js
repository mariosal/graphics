document.onmousewheel = function ( e ) {
  var d = e.wheelDeltaY / 1000;
  if ( scene.z + d > -90 && scene.z + d < -30 ) {
    scene.zoom( scene.z + d );
  }
  return false;
};
document.onmousedown = function ( e ) {
  if ( e.which == 1 ) {
    mouse = [ e.clientX, e.clientY ];
    document.onmousemove = function ( e ) {
      scene.rotate( e.clientX - mouse[ 0 ] );
      mouse = [ e.clientX, e.clientY ];
    };
  }
};
document.onmouseup = function () {
  document.onmousemove = function () {
  };
};
