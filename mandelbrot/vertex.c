attribute vec2 vertex;
varying vec2 position;

void main() {
    position = vertex;
    gl_Position = vec4( vertex, 0, 1 );
}
