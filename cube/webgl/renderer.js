var Renderer = function ( canvas, vertexShaderURL, fragmentShaderURL ) {
    this.H = canvas.height;
    this.W = canvas.width;

    this.theta = 0;
    this.time = new Date();

    this.program = null;
    this.vertexBuffer = null;
    this.colorBuffer = null;
    this.indexBuffer = null;

    this.project = null;
    this.move = null;

    this.gl = canvas.getContext( 'experimental-webgl' );
    this.gl.viewport( 0, 0, this.W, this.H );

    this.gl.enable( this.gl.DEPTH_TEST );
    this.gl.enable( this.gl.CULL_FACE );
    this.gl.cullFace( this.gl.BACK );

    this.gl.clearColor( 1, 1, 1, 1 );

    var self = this;
    wget( vertexShaderURL, function ( vertexShaderSrc ) {
        wget( fragmentShaderURL, function ( fragmentShaderSrc ) {
            var vertexShader = self.gl.createShader( self.gl.VERTEX_SHADER );
            self.gl.shaderSource( vertexShader, vertexShaderSrc );
            self.gl.compileShader( vertexShader );

            var fragmentShader = self.gl.createShader( self.gl.FRAGMENT_SHADER );
            self.gl.shaderSource( fragmentShader, fragmentShaderSrc );
            self.gl.compileShader( fragmentShader );

            self.initShaders( vertexShader, fragmentShader );
            self.initBuffer();
            self.draw();
        } );
    } );
};
Renderer.prototype = {
    animate: function () {
        var now = new Date();
        this.theta += ( now - this.time ) / 10;
        this.time = now;
    },
    draw: function () {
        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

        mat4.identity( this.move );
        mat4.translate( this.move, [ 0, 0, -7 ] );
        mat4.rotate( this.move, this.theta.toRad(), [ 1, 1, 0 ] );
        this.gl.uniformMatrix4fv( this.program.move, false, this.move );

        this.gl.drawElements( this.gl.TRIANGLES, this.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0 );

        this.animate();
        window.webkitRequestAnimationFrame( this.draw.bind( this ) );
    },
    initShaders: function ( vertexShader, fragmentShader ) {
        this.program = this.gl.createProgram();

        this.gl.attachShader( this.program, vertexShader );
        this.gl.attachShader( this.program, fragmentShader );

        this.gl.linkProgram( this.program );
        this.gl.useProgram( this.program );

        this.program.position = this.gl.getAttribLocation( this.program, 'position' );
        this.gl.enableVertexAttribArray( this.program.position );

        this.program.color = this.gl.getAttribLocation( this.program, 'color' );
        this.gl.enableVertexAttribArray( this.program.color );

        this.program.project = this.gl.getUniformLocation( this.program, 'project' );
        this.program.move = this.gl.getUniformLocation( this.program, 'move' );
    },
    initBuffer: function () {
        var vertices = [
            // Front face
            -1, -1,  1,
             1, -1,  1,
             1,  1,  1,
            -1,  1,  1,

            // Back face
            -1, -1, -1,
            -1,  1, -1,
             1,  1, -1,
             1, -1, -1,

            // Top face
            -1,  1, -1,
            -1,  1,  1,
             1,  1,  1,
             1,  1, -1,

            // Bottom face
            -1, -1, -1,
             1, -1, -1,
             1, -1,  1,
            -1, -1,  1,

            // Right face
             1, -1, -1,
             1,  1, -1,
             1,  1,  1,
             1, -1,  1,

            // Left face
            -1, -1, -1,
            -1, -1,  1,
            -1,  1,  1,
            -1,  1, -1
        ];
        this.vertexBuffer = this.gl.createBuffer();
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = 4;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vertexBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( vertices ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.position, this.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

       var colors = [
            [ 1, 0,   0,   1 ], // Front face
            [ 1, 1,   0,   1 ], // Back face
            [ 0, 1,   0,   1 ], // Top face
            [ 1, 0.5, 0.5, 1 ], // Bottom face
            [ 1, 0,   1,   1 ], // Right face
            [ 0, 0,   1,   1 ]  // Left face
        ];
        var unpackedColors = [];
        for ( var i in colors ) {
            var color = colors[ i ];
            for ( var j = 0; j < 4; ++j ) {
                unpackedColors = unpackedColors.concat( color );
            }
        }
        this.colorBuffer = this.gl.createBuffer();
        this.colorBuffer.itemSize = 4;
        this.colorBuffer.numItems = 24;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.colorBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( unpackedColors ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.color, this.colorBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

        var indices = [
            0,  1,  2,  0,  2,  3,  // Front face
            4,  5,  6,  4,  6,  7,  // Back face
            8,  9,  10, 8,  10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23  // Left face
        ];
        this.indexBuffer = this.gl.createBuffer();
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = 36;

        this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
        this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.gl.STATIC_DRAW );

        this.project = mat4.create();
        mat4.perspective( 45, this.W / this.H, 1, 8, this.project );
        this.gl.uniformMatrix4fv( this.program.project, false, this.project );

        this.move = mat4.create();
    }
};

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};
