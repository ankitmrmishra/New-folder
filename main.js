import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// import { Scene } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 0.1 , 1000);

// first arguement in perspective camera is field of view 
// Second arguement in perspective camera is Aspect ratio
// Last two arguements are view frustum to control which object to viw relative to camera angle

const renderer = new THREE.WebGLRenderer( {
  canvas : document.querySelector('#bg')
} );

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);
camera.position.setZ(30);

renderer.render(scene , camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xfff89 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// now add lighting to the 3D object 

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20 , 20 )
const ambientlight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight , ambientlight)

// const lightHelper = new THREE.PointLightHelper(pointLight)

// const gridhelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper , gridhelper)
// 0x is a hexadecimal literal
const controls = new OrbitControls(camera , renderer.domElement) ;


function addStar(){
  const geometry = new THREE.SphereGeometry(0.1,24,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
  const star = new THREE.Mesh(geometry , material) ;

  // Now randomly genrating x,y,z values to position stars

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(300).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('kai-pilger-Ef6iL87-vOA-unsplash.jpg');
scene.background = spaceTexture;

const ankitTexture = new THREE.TextureLoader().load('errr6y.jpg')

const ankit = new THREE.Mesh(
new THREE.BoxGeometry(6,6,6),
new THREE.MeshStandardMaterial({ map: ankitTexture})

)
scene.add(ankit);



ankit.position.z = -5;
ankit.position.x= 2;

function moveCamera(){
const t = document.body.getBoundingClientRect().top;



camera.position.z = t * -0.01 ;
camera.position.y = t * -0.0002 ;
camera.position.x = t * -0.0002 ;

}

document.body.onscroll = moveCamera
moveCamera();

function animate(){
  requestAnimationFrame( animate );
 
  torus.rotation.x += 0.01 ;
  torus.rotation.y += 0.005 ;
  torus.rotation.z += 0.01 ;
  renderer.render(scene , camera);
  controls.update();
}

animate()
