
let scene, camera, renderer, composer;
let galaxy, galaxyCenterLight;

init();
animate();



function init() {
    // THREE.CopyShader = {

    //     uniforms: {
    //         'tDiffuse': { value: null },
    //         'opacity': { value: 1.0 }
    //     },

    //     vertexShader: `
    //         varying vec2 vUv;

    //         void main() {
    //             vUv = uv;
    //             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //         }
    //     `,

    //     fragmentShader: `
    //         uniform float opacity;
    //         uniform sampler2D tDiffuse;
    //         varying vec2 vUv;

    //         void main() {
    //             gl_FragColor = texture2D(tDiffuse, vUv) * opacity;
    //         }
    //     `
    // };


    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    galaxyCenterLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(galaxyCenterLight);

    // Load model
    const loader = new THREE.GLTFLoader()
    loader.load('/wp-content/themes/twentytwentyfive/assets/js/scene.gltf', (gltf) => {
        galaxy = gltf.scene;
        scene.add(galaxy);
        processGalaxy(gltf);
    });

    // Post-processing
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.225, 0.001);
    composer.addPass(bloomPass);

    // Resize handling
    window.addEventListener('resize', onWindowResize);
}

function processGalaxy(gltf) {
    const nodes = gltf.scene.children[0]; // Assuming the first child is the galaxy mesh
    const geometry = nodes.geometry;
    geometry.center();

    const positions = new Float32Array(geometry.attributes.position.array.buffer);
    const colors = new Float32Array(positions.length);
    const color = new THREE.Color();

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i], y = positions[i + 1], z = positions[i + 2];
        const distance = Math.sqrt(x * x + y * y + z * z) / 100;
        color.setRGB(Math.cos(distance), Math.random() * 0.8, Math.sin(distance));
        color.toArray(colors, i);
    }

    const starMaterial = new THREE.PointsMaterial({
        size: 0.01,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
    });

    const stars = new THREE.Points(geometry, starMaterial);
    scene.add(stars);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (galaxy) {
        galaxy.rotation.z += 0.002;
        const scale = Math.sin(Date.now() * 0.0005) + 1.5;
        galaxy.scale.set(scale, scale, scale);
    }
    composer.render();
}


// // Setup Three.js Scene
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Keep renderer fixed
// renderer.domElement.style.position = "fixed";
// renderer.domElement.style.top = "0";
// renderer.domElement.style.left = "0";
// renderer.domElement.style.width = "100vw";
// renderer.domElement.style.height = "100vh";
// renderer.domElement.style.transition = "opacity 0.5s ease-in-out";
// renderer.domElement.style.zIndex = "1";

// // Set background to black
// document.body.style.backgroundColor = "#000";
// renderer.setClearColor(0x000000, 1);

// // Lighting
// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

// // Load the model
// const loader = new THREE.GLTFLoader();
// let model;
// loader.load('/wp-content/themes/twentytwentyfive/assets/js/scene.gltf', (gltf) => {
//     model = gltf.scene;
//     scene.add(model);
// });

// // Initial Camera Position
// // camera.position.z = 0;
// camera.position.set(1.5, 1.5, 0)

// // Zoom Limits
// const minZoom = -10; // Minimum zoom (when zoomed in completely)
// const maxZoom = 0; // Maximum zoom (no further zoom out)

// // Fade out when zoomed in fully
// let isCanvasFaded = false;

// // Scroll and zoom behavior control
// let lastZoom = camera.position.z;

// // Scroll event listener for zoom in/out
// window.addEventListener("wheel", (event) => {
//     if (event.deltaY > 0 && camera.position.z > minZoom) {
//         // Zoom in (scroll down), but not beyond minZoom
//         camera.position.z = Math.max(minZoom, camera.position.z - event.deltaY * 0.05);
//     } else if (event.deltaY < 0 && camera.position.z < maxZoom) {
//         // Zoom out (scroll up), but not beyond maxZoom
//         camera.position.z = Math.min(maxZoom, camera.position.z - event.deltaY * 0.05);
//     }

//     // Check if the model should be faded out
//     if (camera.position.z <= minZoom && !isCanvasFaded) {
//         isCanvasFaded = true;
//         // Fade out the model and show content
//         renderer.domElement.style.opacity = "0"; // Fade out the model
//         contentDiv.style.opacity = "1"; // Show the content
//         document.body.style.overflow = "auto"; // Enable page scroll
//     } else if (camera.position.z > minZoom && isCanvasFaded) {
//         isCanvasFaded = false;
//         // Fade in the model and hide content
//         renderer.domElement.style.opacity = "1"; // Fade back in the model
//         contentDiv.style.opacity = "0"; // Hide the content
//         document.body.style.overflow = "hidden"; // Disable page scroll
//     }
// }, { passive: false });


// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();
