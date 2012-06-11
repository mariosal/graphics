attribute vec3 position;
attribute vec4 color;

uniform mat4 project;
uniform mat4 move;

varying vec4 fragmentColor;

void main( void ) {
    gl_Position = project * move * vec4( position, 1.0 );
    fragmentColor = color;
}
