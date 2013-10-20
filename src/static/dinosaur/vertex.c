attribute vec3 vertex;
attribute vec3 normal;

varying vec3 vVertex;
varying vec3 vNormal;

uniform mat4 project;
uniform mat4 move;
uniform mat4 rot;

void main( void ) {
  gl_Position = project * move * rot * vec4( vertex, 1.0 );
  vVertex = ( move * rot * vec4( vertex, 1.0 ) ).xyz;
  vNormal = ( rot * vec4( normal, 0.0 ) ).xyz;
}
