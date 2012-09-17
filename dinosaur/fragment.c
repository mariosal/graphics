precision mediump float;

varying vec4 vVertex;
varying vec4 vNormal;

varying mat4 vProject;
varying mat4 vMove;
varying mat4 vRot;

vec4 dinoColor = vec4( 0.0, 0.2, 0.0, 1.0 );
vec4 lightPos = vProject * vMove * vRot * vec4( 0.0, 50.0, -20.0, 1.0 );
vec4 lightAmbient = vec4( 0.5, 0.5, 0.5, 1.0 );
vec4 lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );

void main( void ) {
  vec4 ambient = dinoColor * lightAmbient;
  vec4 diffuse = max( 0.0, dot( normalize( vNormal ), normalize( lightPos - vVertex ) ) ) * dinoColor * lightDiffuse;
  gl_FragColor = min( vec4( 1.0, 1.0, 1.0, 1.0 ), ambient + diffuse );
}
