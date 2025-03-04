// let scene, camera, renderer, composer;
// let galaxy, galaxyCenterLight;
// let starTexture;
// let zoomedIn = false; // Track if zoom has completed
// let mouseX = 0, mouseY = 0;

// init();
// animate();

// const findPoints = (object) => {
//     if (object.isPoints) return object;
//     for (let child of object.children) {
//         const points = findPoints(child);
//         if (points) return points;
//     }
//     return null;
// };

// function init() {
//     // Scene setup
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 3);

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Lighting
//     galaxyCenterLight = new THREE.PointLight(0xffffff, 0.5);
//     scene.add(galaxyCenterLight);

//     // Load star texture
//     const textureLoader = new THREE.TextureLoader();
//     starTexture = textureLoader.load('/star.png');

//     // Load model
//     const loader = new THREE.GLTFLoader();
//     loader.load('/wp-content/themes/twentytwentyfive/assets/js/scene.gltf', (gltf) => {
//         galaxy = gltf.scene;
//         galaxy.rotation.x = Math.PI / 6; // 30-degree tilt
//         scene.add(galaxy);
//         processGalaxy(gltf);
//     });

//     // Post-processing
//     composer = new THREE.EffectComposer(renderer);
//     composer.addPass(new THREE.RenderPass(scene, camera));

//     const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.225, 0.001);
//     composer.addPass(bloomPass);

//     // Resize handling
//     window.addEventListener('resize', onWindowResize);
//     window.addEventListener('mousemove', onMouseMove);
// }

// function processGalaxy(gltf) {
//     const points = findPoints(gltf.scene);

//     if (!points) {
//         console.error("No Points object found in the model!");
//         return;
//     }

//     const geometry = points.geometry;
//     geometry.computeBoundingBox();
//     const center = geometry.boundingBox.getCenter(new THREE.Vector3());
//     geometry.translate(-center.x, -center.y, -center.z);

//     const positions = new Float32Array(geometry.attributes.position.array.buffer);
//     const colors = new Float32Array(positions.length);
//     const color = new THREE.Color();

//     for (let i = 0; i < positions.length; i += 3) {
//         const x = positions[i], y = positions[i + 1], z = positions[i + 2];
//         const distance = Math.sqrt(x * x + y * y + z * z) / 100;

//         // Coloring closer to R3F version
//         color.setRGB(
//             Math.cos(distance),
//             Math.random() * 0.8,
//             Math.sin(distance)
//         );

//         color.toArray(colors, i);
//     }

//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//     const starMaterial = new THREE.PointsMaterial({
//         size: 0.01, // Closer to the R3F version
//         map: starTexture,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.4,
//         depthWrite: false
//     });

//     const stars = new THREE.Points(geometry, starMaterial);
//     scene.add(stars);
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     composer.setSize(window.innerWidth, window.innerHeight);
// }

// function onMouseMove(event) {
//     mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//     mouseY = (event.clientY / window.innerHeight) * 2 - 1;
// }

// function animate() {
//     requestAnimationFrame(animate);

//     if (galaxy) {
//         if (!zoomedIn) {
//             // Perform initial zoom effect
//             galaxy.scale.lerp(new THREE.Vector3(2.7, 2.7, 2.7), 0.02);
//             if (galaxy.scale.x >= 2.69) {
//                 zoomedIn = true; // Stop zooming after reaching target
//             }
//         } else {
//             // React to mouse movement for rotation
//             galaxy.rotation.y = mouseX * 0.2; // Adjust for subtle effect
//             galaxy.rotation.x = Math.PI / 6 + mouseY * 0.1;
//         }
//     }

//     composer.render();
// }

let scene, camera, renderer, composer;
let galaxy, galaxyCenterLight;
let starTexture;
let zoomedIn = false; // Track if zoom has completed
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0; // Target rotations for smooth transition
let currentRotationX = 0, currentRotationY = 0; // Current rotation values to interpolate from

init();
animate();

const findPoints = (object) => {
    if (object.isPoints) return object;
    for (let child of object.children) {
        const points = findPoints(child);
        if (points) return points;
    }
    return null;
};

function init() {
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

    // Load star texture
    const textureLoader = new THREE.TextureLoader();
    starTexture = textureLoader.load('/star.png');

    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load('/wp-content/themes/twentytwentyfive/assets/js/scene.gltf', (gltf) => {
        galaxy = gltf.scene;
        galaxy.rotation.x = Math.PI / 6; // 30-degree tilt
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
    window.addEventListener('mousemove', onMouseMove);
}

function processGalaxy(gltf) {
    const points = findPoints(gltf.scene);

    if (!points) {
        console.error("No Points object found in the model!");
        return;
    }

    const geometry = points.geometry;
    geometry.computeBoundingBox();
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    geometry.translate(-center.x, -center.y, -center.z);

    const positions = new Float32Array(geometry.attributes.position.array.buffer);
    const colors = new Float32Array(positions.length);
    const color = new THREE.Color();

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i], y = positions[i + 1], z = positions[i + 2];
        const distance = Math.sqrt(x * x + y * y + z * z) / 100;

        // Coloring closer to R3F version
        color.setRGB(
            Math.cos(distance),
            Math.random() * 0.8,
            Math.sin(distance)
        );

        color.toArray(colors, i);
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 0.01, // Closer to the R3F version
        map: starTexture,
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

function onMouseMove(event) {
    // Normalize mouse position
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    // Set target rotation based on mouse position
    targetRotationX = mouseX * 0.2; // Adjust for subtle effect
    targetRotationY = -mouseY * 0.1;
}

function animate() {
    requestAnimationFrame(animate);

    if (galaxy) {
        if (!zoomedIn) {
            // Perform initial zoom effect
            galaxy.scale.lerp(new THREE.Vector3(2.7, 2.7, 2.7), 0.02);
            if (galaxy.scale.x >= 2.69) {
                zoomedIn = true; // Stop zooming after reaching target
            }
        } else {
            // Smooth transition from current rotation to target rotation
            currentRotationX += (targetRotationX - currentRotationX) * 0.1; // Smooth interpolation
            currentRotationY += (targetRotationY - currentRotationY) * 0.1;

            // Apply the smooth rotation to the galaxy
            galaxy.rotation.y = currentRotationX;
            galaxy.rotation.x = Math.PI / 6 + currentRotationY;
        }
    }

    composer.render();
}
