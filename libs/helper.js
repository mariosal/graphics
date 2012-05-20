// Maths
var ccw = function ( a, b, c ) {
    return ( b[ 0 ] - a[ 0 ] ) * ( c[ 1 ] - a[ 1 ] ) - ( b[ 1 ] - a[ 1 ] ) * ( c[ 0 ] - a[ 0 ] );
};

var rotateX = function ( theta ) {
    return [
        [ 1, 0,                  0,                  0 ],
        [ 0, Math.cos( theta ), -Math.sin( theta ),  0 ],
        [ 0, Math.sin( theta ),  Math.cos( theta ),  0 ],
        [ 0, 0,                  0,                  1 ]
    ];
};
var rotateY = function ( theta ) {
    return [
        [  Math.cos( theta ), 0,  Math.sin( theta ),  0 ],
        [  0,                 1,  0,                  0 ],
        [ -Math.sin( theta ), 0,  Math.cos( theta ),  0 ],
        [  0,                 0,  0,                  1 ]
    ];
};

// Canvas
var drawTriangle = function ( ctx, a, b, c, fill, stroke ) {
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo( a[ 0 ], a[ 1 ] );
    ctx.lineTo( b[ 0 ], b[ 1 ] );
    ctx.lineTo( c[ 0 ], c[ 1 ] );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
};
function flatShading( a, b, c ) {
   a = $V( [ a[ 0 ], a[ 1 ], a[ 2 ] ] );
   b = $V( [ b[ 0 ], b[ 1 ], b[ 2 ] ] );
   c = $V( [ c[ 0 ], c[ 1 ], c[ 2 ] ] );

   var ab = b.subtract( a );
   var ac = c.subtract( a );
   var n = ab.cross( ac );
   n = n.multiply( 1 / n.distanceFrom( $V( [ 0, 0, 0 ] ) ) );
   var d = n.dot( $V( [ 0, 0, 1 ] ) );
   var v = Math.floor( 255 * d );

   return 'rgb( ' + v + ', ' + v + ', ' + v + ' )';
};
