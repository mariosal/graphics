precision mediump float;

varying vec4 vVertex;
varying vec4 vNormal;

const vec4 dinoColor = vec4( 0.0, 0.2, 0.0, 1.0 );
const vec4 lightPos = vec4( 0.0, 0.0, -60.0, 1.0 );
const vec4 lightAmbient = vec4( 1.0, 1.0, 0.2, 1.0 );
const vec4 lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );

void main( void ) {
  vec4 ambient = dinoColor * lightAmbient;
  vec4 diffuse = max( 0.0, dot( normalize( vNormal ), normalize( lightPos - vVertex ) ) ) * dinoColor * lightDiffuse;
  gl_FragColor = min( vec4( 1.0, 1.0, 1.0, 1.0 ), ambient + diffuse );
}
