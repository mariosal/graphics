precision mediump float;

varying vec2 position;

const int MAX_ITER = 1000;
bool inside() {
    float zx, zy;
    vec2 z = vec2( 0, 0 );

    for ( int i = 0; i < MAX_ITER; ++i ) {
        zx = z.x * z.x - z.y * z.y + position.x;
        zy = 2.0 * z.x * z.y + position.y;
        z.x = zx;
        z.y = zy;

        if ( length( z ) > 2.0 ) {
            return false;
        }
    }
    return true;
}

void main() {
    if ( inside() ) {
        gl_FragColor = vec4( 0, 0, 0, 1 );
    }
    else {
        gl_FragColor = vec4( 1, 1, 1, 1 );
    }
}
