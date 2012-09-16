attribute vec3 vertex;
uniform mat4 project;
uniform mat4 zoom;
uniform mat4 rot;

void main( void ) {
  gl_Position = project * zoom * rot * vec4( vertex, 1.0 );
}
