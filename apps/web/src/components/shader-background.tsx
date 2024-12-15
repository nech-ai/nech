"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = time * 0.2;

    // Create flowing noise pattern
    float noise = sin(uv.x * 10.0 + t) * sin(uv.y * 10.0 + t) * 0.5;
    noise += sin(uv.x * 20.0 - t) * sin(uv.y * 20.0 + t) * 0.25;

    // Gradient from dark to light
    float gradient = mix(0.1, 0.2, uv.y + noise);

    gl_FragColor = vec4(vec3(gradient), 1.0);
  }
`;

export function ShaderBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl");
		if (!gl) return;

		// Create shader program
		const program = gl.createProgram();
		if (!program) return;

		// Vertex shader
		const vertShader = gl.createShader(gl.VERTEX_SHADER);
		if (!vertShader) return;
		gl.shaderSource(vertShader, vertexShader);
		gl.compileShader(vertShader);

		// Fragment shader
		const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
		if (!fragShader) return;
		gl.shaderSource(fragShader, fragmentShader);
		gl.compileShader(fragShader);

		gl.attachShader(program, vertShader);
		gl.attachShader(program, fragShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		const position = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const timeLocation = gl.getUniformLocation(program, "time");
		if (!timeLocation) return;

		const startTime = Date.now();

		const render = gl.isContextLost()
			? undefined
			: function render() {
					const time = (Date.now() - startTime) / 1000;
					gl.uniform1f(timeLocation, time);
					gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
					requestAnimationFrame(render);
				};

		if (render) {
			window.addEventListener("resize", resize);
			resize();
			render();
		}

		function resize() {
			if (!canvas || !gl) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		return () => {
			window.removeEventListener("resize", resize);
			if (!gl || !program || !vertShader || !fragShader || !buffer) return;
			gl.deleteProgram(program);
			gl.deleteShader(vertShader);
			gl.deleteShader(fragShader);
			gl.deleteBuffer(buffer);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="-z-10 fixed top-0 left-0 h-full w-full"
		/>
	);
}
