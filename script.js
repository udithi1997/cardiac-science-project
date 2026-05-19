// 3D Beating Heart using Three.js
function initHeart() {
    const container = document.getElementById('heart-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create heart geometry
    const heartShape = new THREE.Shape();
    
    // Heart curve
    const x = 0, y = 0;
    heartShape.moveTo(x + 2.5, y + 2.5);
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x + 0, y);
    heartShape.bezierCurveTo(x - 3, y, x - 3, y + 2.5, x - 3, y + 2.5);
    heartShape.bezierCurveTo(x - 3, y + 5, x - 0.5, y + 7.7, x + 0, y + 9.5);
    heartShape.bezierCurveTo(x + 0.5, y + 7.7, x + 3, y + 5, x + 3, y + 2.5);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelSegments: 3
    });

    const material = new THREE.MeshPhongMaterial({
        color: 0xFF1744,
        emissive: 0xFF5252,
        shininess: 100
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.position.set(0, 0, 0);
    scene.add(heart);

    // Lighting
    const light1 = new THREE.PointLight(0xFFFFFF, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xFF1744, 0.5);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
    scene.add(ambientLight);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.02;
        
        // Rotate
        heart.rotation.x += 0.003;
        heart.rotation.y += 0.005;
        
        // Beat animation (scale pulse)
        const beatCycle = Math.sin(time * 2) * 0.1;
        heart.scale.set(1 + beatCycle * 0.15, 1 + beatCycle * 0.15, 1 + beatCycle * 0.15);
        
        // Glow effect
        material.emissive.setHex(0xFF5252 + Math.floor(Math.sin(time) * 20000));
        
        renderer.render(scene, camera);
    }
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeart);
} else {
    initHeart();
}
