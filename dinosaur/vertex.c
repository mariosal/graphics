attribute vec3 vertex;
attribute vec3 normal;

varying vec4 vVertex;
varying vec4 vNormal;

uniform mat4 project;
uniform mat4 move;
uniform mat4 rot;

void main( void ) {
  gl_Position = project * move * rot * vec4( vertex, 1.0 );
  vVertex = vec4( vertex, 1.0 );
  vNormal = vec4( normal, 1.0 );
}
