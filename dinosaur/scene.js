var Scene = function ( canvas ) {
  this.w = canvas.width;
  this.h = canvas.height;

  this.z = 0;
  this.program = null;
  this.indexBuffer = null;

  this.rot = mat4.create();
  mat4.identity( this.rot );

  this.gl = canvas.getContext( 'experimental-webgl' );
  this.gl.viewport( 0, 0, this.w, this.h );
  this.gl.enable( this.gl.DEPTH_TEST );
  this.gl.clearColor( 1, 1, 1, 1 );
};
Scene.prototype = {
  render: function () {
    this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
    this.gl.drawElements( this.gl.TRIANGLES, this.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0 );
    window.webkitRequestAnimationFrame( this.render.bind( this ) );
  },
  initShaders: function ( vShaderSrc, fShaderSrc ) {
    var vShader = this.gl.createShader( this.gl.VERTEX_SHADER );
    this.gl.shaderSource( vShader, vShaderSrc );
    this.gl.compileShader( vShader );

    var fShader = this.gl.createShader( this.gl.FRAGMENT_SHADER );
    this.gl.shaderSource( fShader, fShaderSrc );
    this.gl.compileShader( fShader );

    this.program = this.gl.createProgram();
    this.gl.attachShader( this.program, vShader );
    this.gl.attachShader( this.program, fShader );
    this.gl.linkProgram( this.program );
    this.gl.useProgram( this.program );

    this.program.vertex = this.gl.getAttribLocation( this.program, 'vertex' );
    this.gl.enableVertexAttribArray( this.program.vertex );

    this.program.normal = this.gl.getAttribLocation( this.program, 'normal' );
    this.gl.enableVertexAttribArray( this.program.normal );

    this.program.project = this.gl.getUniformLocation( this.program, 'project' );
    this.program.zoom = this.gl.getUniformLocation( this.program, 'zoom' );
    this.program.rot = this.gl.getUniformLocation( this.program, 'rot' );
  },
  initBuffers: function ( model ) {
    var vBuffer = this.gl.createBuffer();
    vBuffer.itemSize = 3;
    vBuffer.numItems = model.vertices.length / 3;
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, vBuffer );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( model.vertices ), this.gl.STATIC_DRAW );
    this.gl.vertexAttribPointer( this.program.vertex, vBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

    var normalBuffer = this.gl.createBuffer();
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = model.normals.length / 3;
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, normalBuffer );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( model.normals ), this.gl.STATIC_DRAW );
    this.gl.vertexAttribPointer( this.program.normal, normalBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

    this.indexBuffer = this.gl.createBuffer();
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = model.indices.length;
    this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
    this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( model.indices ), this.gl.STATIC_DRAW );

    var project = mat4.create();
    mat4.perspective( 45, this.w / this.h, 0.1, 100, project );
    this.gl.uniformMatrix4fv( this.program.project, false, project );

    this.gl.uniformMatrix4fv( this.program.rot, false, this.rot );
  },
  rotate: function ( thetaY ) {
    mat4.rotate( this.rot, thetaY.toRad(), [ 0, 1, 0 ] );
    this.gl.uniformMatrix4fv( this.program.rot, false, this.rot );
  },
  zoom: function ( z ) {
    this.z = z;
    var zoom = mat4.create();
    mat4.identity( zoom );
    mat4.translate( zoom, [ 0, -20, this.z ] );
    this.gl.uniformMatrix4fv( this.program.zoom, false, zoom );
  }
};

Number.prototype.toRad = function () {
  return this * Math.PI / 180;
};
