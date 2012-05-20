var Render = function ( ctx ) {
    this.ctx = ctx;
    this.WIDTH = ctx.canvas.width;
    this.HEIGHT = ctx.canvas.height;
};
Render.prototype = {
    ccw: function ( a, b, c ) {
        return ( b[ 0 ] - a[ 0 ] ) * ( c[ 1 ] - a[ 1 ] ) - ( b[ 1 ] - a[ 1 ] ) * ( c[ 0 ] - a[ 0 ] );
    },
    drawTriangle: function ( a, b, c, fill, stroke ) {
        this.ctx.strokeStyle = stroke;
        this.ctx.fillStyle = fill;
        this.ctx.beginPath();
        this.ctx.moveTo( a[ 0 ], a[ 1 ] );
        this.ctx.lineTo( b[ 0 ], b[ 1 ] );
        this.ctx.lineTo( c[ 0 ], c[ 1 ] );
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    },
    draw: function ( cube ) {
        this.ctx.clearRect( -250, -250, this.WIDTH, this.HEIGHT );

        // Transform the coords:
        //      x' = x / z
        //      y' = y / z
        cube.vertices.forEach( function ( vector ) {
            vector[ 0 ] /= vector[ 2 ];
            vector[ 1 ] /= vector[ 2 ];
        } );

        cube.vertices = $M( cube.vertices ).x( $M( [
            [ this.WIDTH / 4, 0,               0, 0 ],
            [ 0,              this.HEIGHT / 4, 0, 0 ],
            [ 0,              0,               1, 0 ],
            [ 0,              0,               0, 1 ]
        ] ) ).elements;

        var colorId = 0;
        var scope = this;
        cube.indices.forEach( function ( index ) {
            var a = cube.vertices[ index[ 0 ] ];
            var b = cube.vertices[ index[ 1 ] ];
            var c = cube.vertices[ index[ 2 ] ];

            if ( scope.ccw( a, b, c ) > 0 ) {
                var color = cube.colors[ Math.floor( colorId / 2 ) ];
                scope.drawTriangle( a, b, c, color, color );
            }
            ++colorId;
        } );
    }
};
