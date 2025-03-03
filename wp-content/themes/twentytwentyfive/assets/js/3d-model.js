
// 3d-model.js
// document.addEventListener('DOMContentLoaded', function () {
//     // Set up the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Load the 3D model
//     const loader = new THREE.GLTFLoader();
//     const modelPath = '/wp-content/themes/twentytwentyfive/assets/js/scene.gltf';  // Replace with the correct path to your uploaded model

//     loader.load(
//         modelPath,
//         function (gltf) {
//             scene.add(gltf.scene);
//             gltf.scene.scale.set(0.5, 0.5, 0.5); // Scale the model as needed
//         },
//         undefined,
//         function (error) {
//             console.error('Error loading model:', error);
//         }
//     );

//     // Add a simple ambient light
//     const light = new THREE.AmbientLight(0x404040); // Soft white light
//     scene.add(light);

//     // Position the camera
//     camera.position.z = 5;

//     // Animate the scene
//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     }
//     animate();
// });

// Setup Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Keep renderer fixed
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100vw";
renderer.domElement.style.height = "100vh";
renderer.domElement.style.transition = "opacity 0.5s ease-in-out";
renderer.domElement.style.zIndex = "1";

// Set background to black
document.body.style.backgroundColor = "#000";
renderer.setClearColor(0x000000, 1);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load the model
const loader = new THREE.GLTFLoader();
let model;
loader.load('/wp-content/themes/twentytwentyfive/assets/js/scene.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);
});

// Initial Camera Position
camera.position.z = 10;

// Zoom Limits
const minZoom = 3; // Minimum zoom (when zoomed in completely)
const maxZoom = 15; // Maximum zoom (no further zoom out)

// Fade out when zoomed in fully
let isCanvasFaded = false;

// Scroll and zoom behavior control
let lastZoom = camera.position.z;

// Scroll event listener for zoom in/out
window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 && camera.position.z > minZoom) {
        // Zoom in (scroll down), but not beyond minZoom
        camera.position.z = Math.max(minZoom, camera.position.z - event.deltaY * 0.05);
    } else if (event.deltaY < 0 && camera.position.z < maxZoom) {
        // Zoom out (scroll up), but not beyond maxZoom
        camera.position.z = Math.min(maxZoom, camera.position.z - event.deltaY * 0.05);
    }

    // Check if the model should be faded out
    if (camera.position.z <= minZoom && !isCanvasFaded) {
        isCanvasFaded = true;
        // Fade out the model and show content
        renderer.domElement.style.opacity = "0"; // Fade out the model
        contentDiv.style.opacity = "1"; // Show the content
        document.body.style.overflow = "auto"; // Enable page scroll
    } else if (camera.position.z > minZoom && isCanvasFaded) {
        isCanvasFaded = false;
        // Fade in the model and hide content
        renderer.domElement.style.opacity = "1"; // Fade back in the model
        contentDiv.style.opacity = "0"; // Hide the content
        document.body.style.overflow = "hidden"; // Disable page scroll
    }
}, { passive: false });


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
