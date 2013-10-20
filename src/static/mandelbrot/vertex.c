attribute vec2 vertex;
varying vec2 position;

const float zoom = 2.0;
void main() {
  position = vertex;
  gl_Position = vec4( vertex.x / zoom, vertex.y / zoom, 0, 1 );
}
