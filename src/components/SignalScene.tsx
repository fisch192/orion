import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SignalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(-0.18, 0.38, -0.12);
    scene.add(group);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x79f5e5,
      transparent: true,
      opacity: 0.18
    });

    const rings: THREE.LineLoop[] = [];
    [1.05, 1.5, 1.95].forEach((radius, index) => {
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          new THREE.EllipseCurve(0, 0, radius, radius * 0.38, 0, Math.PI * 2, false, 0).getPoints(96)
        ),
        ringMaterial
      );
      ring.rotation.z = index * 0.38;
      rings.push(ring);
      group.add(ring);
    });

    const coreGeometry = new THREE.CircleGeometry(0.08, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x79f5e5,
      transparent: true,
      opacity: 0.58
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const particleCount = 54;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const angle = (index / particleCount) * Math.PI * 2;
      const radius = 1.15 + (index % 3) * 0.36;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius * 0.38;
      positions[index * 3 + 2] = (index % 5) * 0.012;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({
      color: 0xf3b45a,
      size: 0.026,
      transparent: true,
      opacity: 0.46
    });
    group.add(new THREE.Points(pointGeometry, pointMaterial));

    const sweep = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.05, 0, 0)]),
      new THREE.LineBasicMaterial({
        color: 0xf3b45a,
        transparent: true,
        opacity: 0.28
      })
    );
    group.add(sweep);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    let animationFrame = 0;
    const animate = () => {
      if (!reduceMotion) {
        const time = Date.now() * 0.001;
        group.rotation.z += 0.0014;
        rings.forEach((ring, index) => {
          ring.scale.setScalar(1 + Math.sin(time * 0.65 + index) * 0.028);
        });
        coreMaterial.opacity = 0.42 + Math.sin(time * 1.4) * 0.12;
        sweep.rotation.z -= 0.006;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      rings.forEach((ring) => ring.geometry.dispose());
      ringMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      sweep.geometry.dispose();
      if (Array.isArray(sweep.material)) sweep.material.forEach((material) => material.dispose());
      else sweep.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-scene" ref={mountRef} aria-hidden="true" />;
}
