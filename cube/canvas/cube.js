var Cube = function () {
    this.vertices = [
        [ -1,  1,  1, 1 ],
        [  1,  1,  1, 1 ],
        [  1, -1,  1, 1 ],
        [ -1, -1,  1, 1 ],
        [ -1,  1, -1, 1 ],
        [  1,  1, -1, 1 ],
        [  1, -1, -1, 1 ],
        [ -1, -1, -1, 1 ]
    ];
    this.indices = [
        // Front
        [ 0, 2, 1 ], 
        [ 0, 3, 2 ],

        // Back
        [ 5, 7, 4 ],
        [ 7, 5, 6 ],

        // Up
        [ 5, 4, 1 ],
        [ 1, 4, 0 ],

        // Down
        [ 2, 3, 7 ],
        [ 7, 6, 2 ],

        // Left
        [ 0, 4, 3 ],
        [ 3, 4, 7 ],

        // Right
        [ 1, 6, 5 ],
        [ 1, 2, 6 ]
    ];
    this.colors = [
        'red',
        'green',
        'blue',
        'cyan',
        'magenta',
        'yellow'
    ];
};
Cube.prototype = {
    project: function () {
        this.vertices = $M( this.vertices ).x( $M( [
            [ 1, 0,  0,   0 ],
            [ 0, 1,  0,   0 ],
            [ 0, 0, -0.2, 0 ],
            [ 0, 0,  1.5,   1 ]
        ] ) ).elements;
    },
    rotateX: function ( theta ) {
        this.vertices = $M( this.vertices ).x( $M( [
            [ 1, 0,                  0,                  0 ],
            [ 0, Math.cos( theta ), -Math.sin( theta ),  0 ],
            [ 0, Math.sin( theta ),  Math.cos( theta ),  0 ],
            [ 0, 0,                  0,                  1 ]
        ] ) ).elements;
    },
    rotateY: function ( theta ) {
        this.vertices = $M( this.vertices ).x( $M( [
            [  Math.cos( theta ), 0,  Math.sin( theta ),  0 ],
            [  0,                 1,  0,                  0 ],
            [ -Math.sin( theta ), 0,  Math.cos( theta ),  0 ],
            [  0,                 0,  0,                  1 ]
        ] ) ).elements;
    }
};
