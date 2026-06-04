import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CosmicMachineScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 100);
    camera.position.set(0, 1.2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x03050a, 1);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);
    const pointer = { x: 0, y: 0 };

    const ambient = new THREE.AmbientLight(0x8bd7ff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x4fc3ff, 4.8, 28);
    keyLight.position.set(-4, 3, 5);
    scene.add(keyLight);

    const amberLight = new THREE.PointLight(0xffb86b, 2.4, 20);
    amberLight.position.set(4, -2, 4);
    scene.add(amberLight);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x172033,
      emissive: 0x10243a,
      metalness: 0.76,
      roughness: 0.28,
      wireframe: true,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.42, 2), coreMaterial);
    root.add(core);

    const rings = [
      { radius: 2.05, tube: 0.018, color: 0x5cc8ff, rotation: [Math.PI / 2.8, 0, 0.18] },
      { radius: 2.65, tube: 0.014, color: 0xffb86b, rotation: [Math.PI / 2, 0.52, -0.24] },
      { radius: 3.15, tube: 0.01, color: 0x9f7aea, rotation: [Math.PI / 2.15, -0.8, 0.5] },
    ].map((ring) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(ring.radius, ring.tube, 12, 160),
        new THREE.MeshBasicMaterial({ color: ring.color, transparent: true, opacity: 0.78 }),
      );
      mesh.rotation.set(...ring.rotation);
      root.add(mesh);
      return mesh;
    });

    const moduleGroup = new THREE.Group();
    const moduleMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7e3ed,
      emissive: 0x10243a,
      metalness: 0.82,
      roughness: 0.34,
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b8a80,
      emissive: 0x1b8a80,
      emissiveIntensity: 0.55,
      metalness: 0.35,
      roughness: 0.22,
    });

    for (let index = 0; index < 10; index += 1) {
      const angle = (index / 10) * Math.PI * 2;
      const radius = 3.55 + (index % 2) * 0.48;
      const module = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 0.42), moduleMaterial);
      module.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.35) * 0.55, Math.sin(angle) * radius);
      module.rotation.set(angle * 0.3, angle, angle * 0.17);
      moduleGroup.add(module);

      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), accentMaterial);
      fin.position.copy(module.position);
      fin.position.y += 0.34;
      fin.rotation.copy(module.rotation);
      moduleGroup.add(fin);
    }
    root.add(moduleGroup);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 900;
    const starPositions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 28;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 16;
      starPositions[index * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xc8f3ff,
        size: 0.024,
        transparent: true,
        opacity: 0.8,
      }),
    );
    scene.add(stars);

    const grid = new THREE.GridHelper(18, 28, 0x1b8a80, 0x233044);
    grid.position.y = -3.1;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.28;
    });
    scene.add(grid);

    function resize() {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    }

    function handlePointerMove(event) {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
    }

    const clock = new THREE.Clock();
    let frameId = 0;

    function animate() {
      const elapsed = clock.getElapsedTime();
      camera.position.x += (pointer.x * 0.34 - camera.position.x) * 0.035;
      camera.position.y += (1.2 - pointer.y * 0.22 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);
      root.rotation.y = elapsed * 0.18 + pointer.x * 0.08;
      root.rotation.x = Math.sin(elapsed * 0.36) * 0.08 + pointer.y * 0.05;
      core.rotation.y = elapsed * 0.36;
      core.rotation.z = elapsed * 0.18;
      moduleGroup.rotation.y = -elapsed * 0.24;
      stars.rotation.y = elapsed * 0.012;
      grid.position.z = (elapsed * 0.22) % 1;

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0018 + index * 0.0008;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
    mount.addEventListener('pointermove', handlePointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', handlePointerMove);
      mount.removeChild(renderer.domElement);
      starGeometry.dispose();
      core.geometry.dispose();
      core.material.dispose();
      grid.geometry.dispose();
      gridMaterials.forEach((material) => material.dispose());
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      moduleGroup.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div className="cosmic-scene" ref={mountRef} aria-hidden="true" data-testid="cosmic-scene" />;
}
