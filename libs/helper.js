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
var drawTriangle = function ( ctx, a, b, c, color ) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo( a[ 0 ], a[ 1 ] );
    ctx.lineTo( b[ 0 ], b[ 1 ] );
    ctx.lineTo( c[ 0 ], c[ 1 ] );
    ctx.closePath();
    ctx.fill();
};
