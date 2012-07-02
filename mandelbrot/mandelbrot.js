var Mandelbrot = function ( canvas, vertexShaderURL, fragmentShaderURL ) {
    this.H = canvas.height;
    this.W = canvas.width;

    this.program = null;
    this.vertexBuffer = null;

    this.gl = canvas.getContext( 'experimental-webgl' );
    this.gl.viewport( 0, 0, this.W, this.H );

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
Mandelbrot.prototype = {
    draw: function () {
        this.gl.drawArrays( this.gl.TRIANGLE_STRIP, 0, this.vertexBuffer.numItems );
    },
    initBuffer: function () {
        var vertices = [
             1,  1,
            -2,  1,
             1, -1,
            -2, -1
        ];
        this.vertexBuffer = this.gl.createBuffer();
        this.vertexBuffer.itemSize = 2;
        this.vertexBuffer.numItems = 4;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.vertexBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( vertices ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.vertex, this.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );
    },
    initShaders: function ( vertexShader, fragmentShader ) {
        this.program = this.gl.createProgram();

        this.gl.attachShader( this.program, vertexShader );
        this.gl.attachShader( this.program, fragmentShader );

        this.gl.linkProgram( this.program );
        this.gl.useProgram( this.program );

        this.program.vertex = this.gl.getAttribLocation( this.program, 'vertex' );
        this.gl.enableVertexAttribArray( this.program.vertex );
    }
};
