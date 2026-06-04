import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createCartoonMouse() {
  const mouse = new THREE.Group();
  mouse.name = 'cursor-runner-mouse';

  const furMaterial = new THREE.MeshStandardMaterial({
    color: 0x9b5b32,
    emissive: 0x2c1408,
    emissiveIntensity: 0.28,
    roughness: 0.46,
    metalness: 0.08,
  });
  const bellyMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3c58d,
    emissive: 0x3c210f,
    emissiveIntensity: 0.18,
    roughness: 0.52,
    metalness: 0.03,
  });
  const earMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0a77c,
    roughness: 0.5,
    metalness: 0.04,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x111820,
    roughness: 0.34,
    metalness: 0.18,
  });
  const techMaterial = new THREE.MeshStandardMaterial({
    color: 0x9cf7e8,
    emissive: 0x1b8a80,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    metalness: 0.38,
  });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.48, 30, 20), furMaterial);
  body.scale.set(0.76, 0.96, 0.56);
  body.position.set(0, 0, 0);
  mouse.add(body);

  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), bellyMaterial);
  belly.scale.set(0.72, 1.02, 0.18);
  belly.position.set(0, -0.04, 0.31);
  mouse.add(belly);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 30, 20), furMaterial);
  head.scale.set(0.92, 0.86, 0.8);
  head.position.set(0, 0.58, 0.08);
  mouse.add(head);

  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), bellyMaterial);
  snout.scale.set(1.1, 0.7, 0.8);
  snout.position.set(0, 0.54, 0.36);
  mouse.add(snout);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), darkMaterial);
  nose.position.set(0, 0.55, 0.5);
  mouse.add(nose);

  const earGeometry = new THREE.SphereGeometry(0.19, 24, 16);
  [-1, 1].forEach((side) => {
    const outerEar = new THREE.Mesh(earGeometry, furMaterial);
    outerEar.scale.set(0.78, 1, 0.18);
    outerEar.position.set(side * 0.24, 0.84, 0.02);
    outerEar.rotation.z = side * -0.42;
    mouse.add(outerEar);

    const innerEar = new THREE.Mesh(new THREE.SphereGeometry(0.125, 20, 14), earMaterial);
    innerEar.scale.set(0.76, 1, 0.12);
    innerEar.position.set(side * 0.245, 0.84, 0.045);
    innerEar.rotation.z = outerEar.rotation.z;
    mouse.add(innerEar);

    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), darkMaterial);
    eye.position.set(side * 0.1, 0.64, 0.37);
    mouse.add(eye);
  });

  const whiskerMaterial = new THREE.LineBasicMaterial({ color: 0xdaf7ff, transparent: true, opacity: 0.72 });
  [-1, 1].forEach((side) => {
    [-0.05, 0.03].forEach((offset, index) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(side * 0.07, 0.52 + offset, 0.49),
        new THREE.Vector3(side * (0.34 + index * 0.03), 0.52 + offset * 1.8, 0.55),
      ]);
      mouse.add(new THREE.Line(geometry, whiskerMaterial));
    });
  });

  const limbGeometry = new THREE.CapsuleGeometry(0.045, 0.32, 6, 12);
  const footGeometry = new THREE.SphereGeometry(0.085, 16, 10);
  const limbs = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(limbGeometry, furMaterial);
    arm.position.set(side * 0.38, 0.08, 0.14);
    arm.rotation.z = side * 0.68;
    mouse.add(arm);
    limbs.push({ mesh: arm, side, phase: side > 0 ? 0 : Math.PI });

    const leg = new THREE.Mesh(limbGeometry, furMaterial);
    leg.position.set(side * 0.24, -0.46, 0.08);
    leg.rotation.z = side * 0.24;
    mouse.add(leg);
    limbs.push({ mesh: leg, side, phase: side > 0 ? Math.PI : 0 });

    const foot = new THREE.Mesh(footGeometry, bellyMaterial);
    foot.scale.set(1.35, 0.48, 0.7);
    foot.position.set(side * 0.28, -0.66, 0.2);
    mouse.add(foot);
    limbs.push({ mesh: foot, side, phase: side > 0 ? Math.PI : 0, isFoot: true });
  });

  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.22, -0.26),
    new THREE.Vector3(-0.24, -0.26, -0.48),
    new THREE.Vector3(-0.44, -0.1, -0.58),
    new THREE.Vector3(-0.6, 0.08, -0.48),
  ]);
  const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 28, 0.025, 8, false), earMaterial);
  mouse.add(tail);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.34, 8), techMaterial);
  antenna.position.set(0, 1.02, 0.03);
  antenna.rotation.x = 0.22;
  mouse.add(antenna);

  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), techMaterial);
  beacon.position.set(0, 1.2, 0.08);
  mouse.add(beacon);

  const runnerLight = new THREE.PointLight(0xffc28a, 1.35, 3.2);
  runnerLight.position.set(0, 0.38, 0.9);
  mouse.add(runnerLight);

  mouse.userData = { limbs, beacon, tail };
  mouse.scale.setScalar(0.68);
  mouse.position.set(2.4, -1.45, 2.1);
  mouse.rotation.y = -0.25;

  return mouse;
}

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
    const pointerTarget = new THREE.Vector3(2.4, -1.45, 2.1);
    const raycaster = new THREE.Raycaster();
    const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2.1);

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

    const cursorMouse = createCartoonMouse();
    scene.add(cursorMouse);

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
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(cursorPlane, pointerTarget);
      pointerTarget.x = THREE.MathUtils.clamp(pointerTarget.x, -4.8, 4.8);
      pointerTarget.y = THREE.MathUtils.clamp(pointerTarget.y, -2.2, 2.7);
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

      const previousX = cursorMouse.position.x;
      cursorMouse.position.lerp(pointerTarget, 0.065);
      const velocityX = cursorMouse.position.x - previousX;
      const runSpeed = Math.min(Math.abs(velocityX) * 42 + 1.6, 8);
      cursorMouse.position.y += Math.sin(elapsed * 11 * runSpeed) * 0.0028;
      cursorMouse.rotation.z = Math.sin(elapsed * 10 * runSpeed) * 0.035;
      cursorMouse.rotation.y += ((velocityX >= 0 ? 0.22 : -0.22) - cursorMouse.rotation.y) * 0.08;
      cursorMouse.userData.beacon.scale.setScalar(1 + Math.sin(elapsed * 6) * 0.18);
      cursorMouse.userData.tail.rotation.y = Math.sin(elapsed * 6) * 0.22;
      cursorMouse.userData.limbs.forEach(({ mesh, side, phase, isFoot }) => {
        const stride = Math.sin(elapsed * 12 * runSpeed + phase);
        mesh.rotation.x = stride * (isFoot ? 0.32 : 0.6);
        mesh.rotation.z += (side * 0.18 - mesh.rotation.z) * 0.04;
      });

      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0018 + index * 0.0008;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
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
      cursorMouse.traverse((object) => {
        if (object.isMesh || object.isLine) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div className="cosmic-scene" ref={mountRef} aria-hidden="true" data-testid="cosmic-scene" />;
}
