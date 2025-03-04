let scene, camera, renderer, composer;
let galaxy, galaxyCenterLight;
let starTexture;

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

function animate() {
    requestAnimationFrame(animate);

    if (galaxy) {
        // galaxy.rotation.z += 0.002;
        galaxy.rotation.z += 0.0004;
        const scale = Math.sin(Date.now() * 0.0005) + 2.7;
        galaxy.scale.set(scale, scale, scale);
    }

    composer.render();
}
