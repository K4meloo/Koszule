import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


let koszulaBase = "koszula_";
let koszulaMod1 = "dlugi";
let koszulaMod2 = "_kolnierz";
let koszulaFileType = ".fbx";
let koszulaString = koszulaBase + koszulaMod1 + koszulaMod2 + koszulaFileType;
const slider = document.querySelector("#rangeRotation");
let sliderValueA = slider.value;
let sliderValueB = slider.value;

let color = 0xff0000;
let scale = 2;

const viewportPlaceholder = document.getElementById("threeViewportPlaceholder");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, viewportPlaceholder.offsetWidth/viewportPlaceholder.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewportPlaceholder.offsetWidth, viewportPlaceholder.offsetHeight);
viewportPlaceholder.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xffffff);
camera.position.y = 1.2;
camera.rotation.x = -0.25;
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial( { color: color } );
let koszula = new THREE.Mesh( geometry, material );
koszula.scale.set(scale,scale,scale);
// const controls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 5;
camera.position.y = 1.2;



window.addEventListener( 'resize', onWindowResize);

function onWindowResize(){

    camera.aspect = viewportPlaceholder.offsetWidth / viewportPlaceholder.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( viewportPlaceholder.offsetWidth, viewportPlaceholder.offsetHeight );

}

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

const fbxLoader = new FBXLoader();
loadKoszula();
function loadKoszula(){
  fbxLoader.load(
    'res/'+koszulaString,
    (object) => {
        object.traverse((child)=>{
            if(child.isMesh){
              child.material= new THREE.MeshStandardMaterial({color: color});
            }
        });
        koszula = object;
        scene.add(koszula);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
  )
}

let isMouseDown = false;
slider.onmousedown = function() { isMouseDown = true  };
slider.onmouseup   = function() { isMouseDown = false };
slider.onmousemove = function() { if(isMouseDown) {
  sliderValueA = slider.value;
  koszula.rotation.y = sliderValueA / 100;
} };





function animate() {
  if(!isMouseDown) koszula.rotation.y -= 0.005;
  console.log(koszula.rotation.y)
requestAnimationFrame( animate );
renderer.render( scene, camera );
}
animate();







let selectedSex = "W";
let selectedSize = "m";
let selectedColor = "red";
let selectedSleeves = "long";
let selectedCollar = "collar";
let basePrice = 99.99;
let priceMod1 = 0;
let priceMod2 = 0;

document.getElementById("men").onclick = () => {
    selectedSex = "M";
    sexHandle(selectedSex);
};

document.getElementById("women").onclick = () => {
    selectedSex = "W";
    sexHandle(selectedSex);
};

document.getElementById("s").onclick = () => {
    scale = 0.9;
    selectedSize = "s";
    sizeHandle(selectedSize);
    basePrice = 89.99;
    priceHandle();
};
document.getElementById("m").onclick = () => {
    scale = 1;
    selectedSize = "m";
    sizeHandle(selectedSize);
    basePrice = 99.99;
    priceHandle();
};

document.getElementById("l").onclick = () => {
    scale = 1.1;
    selectedSize = "l";
    sizeHandle(selectedSize);
    basePrice = 109.99;
    priceHandle();
};
document.getElementById("red").onclick = () => {
    color = 0xff0000;
    selectedColor = "red";
    colorHandle(selectedColor);
};
document.getElementById("blue").onclick = () => {
    color = 0x0000ff;
    selectedColor = "blue";
    colorHandle(selectedColor);
};
document.getElementById("black").onclick = () => {
    color = 0x444444;
    selectedColor = "black";
    colorHandle(selectedColor);
};
document.getElementById("white").onclick = () => {
    color = 0xeeeeee;
    selectedColor = "white";
    colorHandle(selectedColor);
};
document.getElementById("long").onclick = () => {
    koszulaMod1 = "dlugi";
    selectedSleeves = "long";
    sleevesHandle(selectedSleeves);
    priceMod1 = 0;
    priceHandle();
    
};
document.getElementById("short").onclick = () => {
    koszulaMod1 = "krotki";
    selectedSleeves = "short";
    sleevesHandle(selectedSleeves);
    priceMod1 = -5;
    priceHandle();
};
document.getElementById("collar").onclick = () => {
    koszulaMod2 = "_kolnierz";
    selectedCollar = "collar";
    collarHandle(selectedCollar);
    priceMod2 = 0;
    priceHandle();
};
document.getElementById("noCollar").onclick = () => {
    koszulaMod2 = "";
    selectedCollar = "noCollar";
    collarHandle(selectedCollar);
    priceMod2 = -5;
    priceHandle();
};


function sexHandle(selectedSex){
    switch (selectedSex) {
        case "W":
            document.getElementById("men").classList.add("selector");
            document.getElementById("men").classList.remove("selector-active");
            document.getElementById("women").classList.add("selector-active");
            document.getElementById("women").classList.remove("selector");
            break;
        case "M":
            document.getElementById("men").classList.remove("selector");
            document.getElementById("men").classList.add("selector-active");
            document.getElementById("women").classList.remove("selector-active");
            document.getElementById("women").classList.add("selector");
            break;
    }
}
function sizeHandle(selectedSize){
    koszula.scale.set(scale,scale,scale);
    switch (selectedSize) {
        case "s":
            document.getElementById("s").classList.remove("selector");
            document.getElementById("s").classList.add("selector-active");
            document.getElementById("m").classList.remove("selector-active");
            document.getElementById("m").classList.add("selector");
            document.getElementById("l").classList.remove("selector-active");
            document.getElementById("l").classList.add("selector");
            break;
        case "m":
            document.getElementById("s").classList.add("selector");
            document.getElementById("s").classList.remove("selector-active");
            document.getElementById("m").classList.add("selector-active");
            document.getElementById("m").classList.remove("selector");
            document.getElementById("l").classList.remove("selector-active");
            document.getElementById("l").classList.add("selector");
            break;
        case "l":
            document.getElementById("s").classList.add("selector");
            document.getElementById("s").classList.remove("selector-active");
            document.getElementById("m").classList.remove("selector-active");
            document.getElementById("m").classList.add("selector");
            document.getElementById("l").classList.add("selector-active");
            document.getElementById("l").classList.remove("selector");
            break;
    }
}
function colorHandle(selectedColor){
    koszula.traverse((child)=>{
      child.material = new THREE.MeshStandardMaterial({color: color});
    });
    switch (selectedColor) {
        case "red":
            document.getElementById("red").classList.remove("selector");
            document.getElementById("red").classList.add("selector-active");
            document.getElementById("blue").classList.remove("selector-active");
            document.getElementById("blue").classList.add("selector");
            document.getElementById("black").classList.remove("selector-active");
            document.getElementById("black").classList.add("selector");
            document.getElementById("white").classList.remove("selector-active");
            document.getElementById("white").classList.add("selector");
            break;
        case "blue":
            document.getElementById("red").classList.add("selector");
            document.getElementById("red").classList.remove("selector-active");
            document.getElementById("blue").classList.add("selector-active");
            document.getElementById("blue").classList.remove("selector");
            document.getElementById("black").classList.remove("selector-active");
            document.getElementById("black").classList.add("selector");
            document.getElementById("white").classList.remove("selector-active");
            document.getElementById("white").classList.add("selector");
            break;
        case "black":
            document.getElementById("red").classList.add("selector");
            document.getElementById("red").classList.remove("selector-active");
            document.getElementById("blue").classList.remove("selector-active");
            document.getElementById("blue").classList.add("selector");
            document.getElementById("black").classList.add("selector-active");
            document.getElementById("black").classList.remove("selector");
            document.getElementById("white").classList.remove("selector-active");
            document.getElementById("white").classList.add("selector");
            break;
        case "white":
            document.getElementById("red").classList.add("selector");
            document.getElementById("red").classList.remove("selector-active");
            document.getElementById("blue").classList.remove("selector-active");
            document.getElementById("blue").classList.add("selector");
            document.getElementById("black").classList.add("selector");
            document.getElementById("black").classList.remove("selector-active");
            document.getElementById("white").classList.remove("selector");
            document.getElementById("white").classList.add("selector-active");
            break;
    }
}
function sleevesHandle(selectedSleeves){
  koszulaString = koszulaBase + koszulaMod1 + koszulaMod2 + koszulaFileType;
  scene.remove(koszula);
  loadKoszula();
    switch (selectedSleeves) {
        case "long":
            document.getElementById("short").classList.add("selector");
            document.getElementById("short").classList.remove("selector-active");
            document.getElementById("long").classList.add("selector-active");
            document.getElementById("long").classList.remove("selector");
            break;
        case "short":
            document.getElementById("short").classList.remove("selector");
            document.getElementById("short").classList.add("selector-active");
            document.getElementById("long").classList.remove("selector-active");
            document.getElementById("long").classList.add("selector");
            break;
    }
}
function collarHandle(selectedCollar){
  koszulaString = koszulaBase + koszulaMod1 + koszulaMod2 + koszulaFileType;
  scene.remove(koszula);
  loadKoszula();
    switch (selectedCollar) {
        case "noCollar":
            document.getElementById("collar").classList.add("selector");
            document.getElementById("collar").classList.remove("selector-active");
            document.getElementById("noCollar").classList.add("selector-active");
            document.getElementById("noCollar").classList.remove("selector");
            break;
        case "collar":
            document.getElementById("collar").classList.remove("selector");
            document.getElementById("collar").classList.add("selector-active");
            document.getElementById("noCollar").classList.remove("selector-active");
            document.getElementById("noCollar").classList.add("selector");
            break;
    }
}
function priceHandle() {
    document.getElementById("price").innerText = basePrice + priceMod1 + priceMod2 + " PLN";
}