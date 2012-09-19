precision mediump float;

varying vec3 vVertex;
varying vec3 vNormal;

void main( void ) {
  vec4 dinoColor = vec4( 0.0, 0.2, 0.0, 1.0 );
  vec4 dinoSpecular = vec4( 0.3, 0.3, 0.3, 1.0 );

  vec4 lightAmbient = vec4( 0.3, 0.3, 0.3, 1.0 );
  vec4 lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
  vec4 lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

  vec3 lightPos = vec3( 0.0, 20.0, 30.0 );

  vec3 LV = normalize( lightPos - vVertex );
  vec3 N = normalize( vNormal );

  vec4 ambient = dinoColor * lightAmbient;
  vec4 diffuse = max( 0.0, dot( N, LV ) ) * dinoColor * lightDiffuse;
  vec4 specular = pow( max( 0.0, dot( dot( 2.0 * LV, N ) * N - LV, normalize( -vVertex ) ) ), 3.0 ) * dinoSpecular * lightSpecular;

  gl_FragColor = min( vec4( 1.0, 1.0, 1.0, 1.0 ), ambient + diffuse + specular );
}
