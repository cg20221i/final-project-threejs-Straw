// Code goes here

$(document).ready(function(){
  
  var scene, camera, renderer;
  var width = 1500;
  var height = 725;
  //var material = new THREE.MeshBasicMaterial( { envmap: texture1, side: THREE.DoubleSide } );
  

  function init(){
    scene = new THREE.Scene();
    // set:
    // Field of view
    // Aspect ratio - width of the element divided by the height
    // Near and far clipping ends
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height ); //set the size of the model - more is more tasking for the browser
    document.body.appendChild( renderer.domElement ); //create the canvas

    // Cylinder
    var cylinderGeometry = new THREE.CylinderGeometry( 6, 6, 300, 32,32,false );
    var cylinderMesh = new THREE.Mesh( cylinderGeometry, new THREE.MeshLambertMaterial() );
    //scene.add( cylinder );
    //cylinder.position.set(0,0,100);
    var cylinder_bsp = new ThreeBSP (cylinderMesh);
    
    cylinderGeometry = new THREE.CylinderGeometry( 3.5, 3.5, 300, 32,1,false );
    cylinderMesh = new THREE.Mesh( cylinderGeometry, new THREE.MeshLambertMaterial() );
    var cylinder_bsp_sub = new ThreeBSP (cylinderMesh);
    
		var subtract_bsp = cylinder_bsp.subtract( cylinder_bsp_sub );
		var result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('assets/bambu.png') }) );
		
		result.geometry.computeVertexNormals();
		result.position.set(0,0,0);
		scene.add( result );
    
    // set camera and controls
    camera.position.set(0,300,75); //move camera a bit
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    
    // Light
    // create a point light
    var pointLight =
      new THREE.PointLight(0xFFFFFF);
    
    // set its position
    pointLight.position = camera.position; //light will follow the camera
    
    // add light to the scene
    scene.add(pointLight);
  }
  
  init();
  animate();
  
  function animate() 
  {
    requestAnimationFrame( animate );
  	render();		
  	update();
  }

function update()
{
	controls.update();
}

function render() 
{	
	renderer.render( scene, camera );
}
})