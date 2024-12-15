"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function GeometricBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (!containerRef.current) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });

		renderer.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(renderer.domElement);

		// Create grid of cubes
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.05,
			wireframe: true,
		});

		const grid = new THREE.Group();
		const isMobile = window.innerWidth < 768;
		const size = isMobile ? 2 : 3;
		const gap = isMobile ? 2 : 1.5;

		for (let x = -size; x <= size; x++) {
			for (let y = -size; y <= size; y++) {
				for (let z = -size; z <= size; z++) {
					const cube = new THREE.Mesh(geometry, material);
					cube.position.set(x * gap, y * gap, z * gap);
					grid.add(cube);
				}
			}
		}

		scene.add(grid);

		// Add ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		// Add point light
		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(10, 10, 10);
		scene.add(pointLight);

		camera.position.z = 10;

		let time = 0;

		// Animation
		function animate() {
			requestAnimationFrame(animate);

			time += 0.005;

			// Autonomous movement
			const autonomousRotationX = Math.sin(time) * 0.05;
			const autonomousRotationY = Math.cos(time * 0.5) * 0.05;

			// Use mouse position to influence rotation
			const targetRotationX =
				(mousePosition.y / window.innerHeight) * Math.PI * 0.1 +
				autonomousRotationX;
			const targetRotationY =
				(mousePosition.x / window.innerWidth) * Math.PI * 0.1 +
				autonomousRotationY;

			grid.rotation.x += (targetRotationX - grid.rotation.x) * 0.05;
			grid.rotation.y += (targetRotationY - grid.rotation.y) * 0.05;

			// Add subtle pulsing effect
			const scale = 1 + Math.sin(time * 2) * 0.03;
			grid.scale.set(scale, scale, scale);

			// Add subtle vertical floating motion
			grid.position.y = Math.sin(time) * 0.2;

			renderer.render(scene, camera);
		}

		// Handle resize
		function handleResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		// Handle mouse move
		function handleMouseMove(event: MouseEvent) {
			setMousePosition({ x: event.clientX, y: event.clientY });
		}

		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);
		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			containerRef.current?.removeChild(renderer.domElement);
		};
	}, [mousePosition]);

	return (
		<div
			ref={containerRef}
			className="-z-10 fixed inset-0"
			aria-hidden="true"
		/>
	);
}
