attribute vec3 vertex;

uniform mat4 projection;
uniform mat4 zoom;
uniform mat4 rotation;

void main( void ) {
  gl_Position = projection * zoom * rotation * vec4( vertex, 1.0 );
}
