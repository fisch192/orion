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
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particleCount = 170;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 0.44;
      const radius = 1.2 + (index % 19) * 0.085;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle * 0.72) * 1.45;
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.42;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x75f4e6,
      size: 0.035,
      transparent: true,
      opacity: 0.78
    });
    group.add(new THREE.Points(pointGeometry, pointMaterial));

    const linePositions: number[] = [];
    for (let index = 0; index < particleCount - 8; index += 4) {
      linePositions.push(
        positions[index * 3],
        positions[index * 3 + 1],
        positions[index * 3 + 2],
        positions[(index + 8) * 3],
        positions[(index + 8) * 3 + 1],
        positions[(index + 8) * 3 + 2]
      );
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf6b95b,
      transparent: true,
      opacity: 0.18
    });
    group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 2.55, 0.12),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      })
    );
    frame.rotation.set(0.2, -0.5, -0.08);
    group.add(frame);

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
        group.rotation.y += 0.0038;
        group.rotation.x = Math.sin(Date.now() * 0.00028) * 0.12;
        frame.rotation.z += 0.0016;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      frame.geometry.dispose();
      if (Array.isArray(frame.material)) {
        frame.material.forEach((material) => material.dispose());
      } else {
        frame.material.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="signal-scene" ref={mountRef} aria-hidden="true" />;
}
