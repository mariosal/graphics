var Cube = function ( canvas, vertexShaderURL, fragmentShaderURL ) {
    this.H = canvas.height;
    this.W = canvas.width;

    this.z = -7;
    this.oldRotation = null;

    this.program = null;
    this.indexBuffer = null;

    this.gl = canvas.getContext( 'experimental-webgl' );
    this.gl.viewport( 0, 0, this.W, this.H );

    this.gl.enable( this.gl.DEPTH_TEST );
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
            self.initBuffers();

            var projection = mat4.create();
            mat4.perspective( 45, self.W / self.H, 1, 16, projection );
            self.gl.uniformMatrix4fv( self.program.projection, false, projection );

            self.oldRotation = mat4.create();
            mat4.identity( self.oldRotation );
            self.gl.uniformMatrix4fv( self.program.rotation, false, self.oldRotation );

            self.setZoom( self.z );
            self.draw();
        } );
    } );
};
Cube.prototype = {
    draw: function () {
        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
        this.gl.drawElements( this.gl.TRIANGLES, this.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0 );

        window.webkitRequestAnimationFrame( this.draw.bind( this ) );
    },
    initBuffers: function () {
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
        var vertexBuffer = this.gl.createBuffer();
        vertexBuffer.itemSize = 3;
        vertexBuffer.numItems = 24;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, vertexBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( vertices ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.vertex, vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

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
        var colorBuffer = this.gl.createBuffer();
        colorBuffer.itemSize = 4;
        colorBuffer.numItems = 24;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, colorBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( unpackedColors ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.color, colorBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

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
    },
    initShaders: function ( vertexShader, fragmentShader ) {
        this.program = this.gl.createProgram();

        this.gl.attachShader( this.program, vertexShader );
        this.gl.attachShader( this.program, fragmentShader );

        this.gl.linkProgram( this.program );
        this.gl.useProgram( this.program );

        this.program.vertex = this.gl.getAttribLocation( this.program, 'vertex' );
        this.gl.enableVertexAttribArray( this.program.vertex );

        this.program.color = this.gl.getAttribLocation( this.program, 'color' );
        this.gl.enableVertexAttribArray( this.program.color );

        this.program.projection = this.gl.getUniformLocation( this.program, 'projection' );
        this.program.zoom = this.gl.getUniformLocation( this.program, 'zoom' );
        this.program.rotation = this.gl.getUniformLocation( this.program, 'rotation' );
    },
    rotate: function ( thetaX, thetaY ) {
        var rotation = mat4.create();
        mat4.identity( rotation );
        mat4.rotate( rotation, thetaX.toRad(), [ 1, 0, 0 ] );
        mat4.rotate( rotation, thetaY.toRad(), [ 0, 1, 0 ] );
        mat4.multiply( rotation, this.oldRotation );
        this.gl.uniformMatrix4fv( this.program.rotation, false, rotation );

        mat4.set( rotation, this.oldRotation );
        this.gl.uniformMatrix4fv( this.program.oldRotation, false, this.oldRotation );
    },
    setZoom: function ( z ) {
        this.z = z;

        var zoom = mat4.create();
        mat4.identity( zoom );
        mat4.translate( zoom, [ 0, 0, this.z ] );
        this.gl.uniformMatrix4fv( this.program.zoom, false, zoom );
    }
};

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};
