import * as THREE from 'three';

let camera, scene, renderer;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scene, camera, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('splash-screen').appendChild(renderer.domElement);

  // Particle sphere setup
  const particleCount = 2000;
  const particles = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((2 * Math.random()) - 1);
    const radius = 150;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Particle material
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x66ccff,
    size: 1.5,
    opacity: 0.75,
    transparent: true
  });

  // Create points (particles)
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Camera position
  camera.position.z = 400;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.002;
    particleSystem.rotation.x += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  // Fade out splash screen
  setTimeout(() => {
    document.getElementById('splash-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
      document.getElementById('content').style.display = 'block';
    }, 1000);
  }, 4000);
});

// Resize event handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
