document.onmousedown = function ( e ) {
  if ( e.which == 1 ) {
    prevX = e.clientX;
    document.onmousemove = function ( e ) {
      scene.rotate( e.clientX - prevX );
      prevX = e.clientX;
    };
  }
};
document.onmouseup = function () {
  document.onmousemove = function () {
  };
};
