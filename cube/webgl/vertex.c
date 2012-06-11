attribute vec3 vertex;
attribute vec4 color;

uniform mat4 projection;
uniform mat4 zoom;
uniform mat4 rotation;

varying vec4 fragmentColor;

void main( void ) {
    gl_Position = projection * zoom * rotation * vec4( vertex, 1.0 );
    fragmentColor = color;
}
