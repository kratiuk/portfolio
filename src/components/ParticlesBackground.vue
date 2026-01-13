<template>
    <div ref="container" class="particles-background"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

const container = ref(null);

const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const int = parseInt(hex, 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const props = {
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleColors: ['#ffffff', '#ffffff', '#ffffff'],
    moveParticlesOnHover: false,
    particleHoverFactor: 1,
    alphaParticles: false,
    particleBaseSize: 100,
    sizeRandomness: 1,
    cameraDistance: 20,
    disableRotation: false
};

let renderer, camera, particles, animationFrameId;
const mouseRef = { x: 0, y: 0 };
let colorAttribute;

const updateParticleColors = () => {
    const isLight = document.body.classList.contains('light-theme');
    const palette = isLight ? ['#000000', '#000000', '#000000'] : ['#ffffff', '#ffffff', '#ffffff'];
    const count = props.particleCount;
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
        colors.set(col, i * 3);
    }

    if (colorAttribute) {
        colorAttribute.data = colors;
        colorAttribute.needsUpdate = true;
    }
};

onMounted(() => {
    if (!container.value) return;

    renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.value.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, props.cameraDistance);

    const resize = () => {
        const width = container.value.clientWidth;
        const height = container.value.clientHeight;

        // Skip if container has no dimensions
        if (width === 0 || height === 0) return;

        renderer.setSize(width, height);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize);

    // Wait for container to have dimensions
    const initResize = () => {
        if (container.value.clientWidth > 0 && container.value.clientHeight > 0) {
            resize();
        } else {
            requestAnimationFrame(initResize);
        }
    };
    initResize();

    const handleMouseMove = (e) => {
        const rect = container.value.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.x = x;
        mouseRef.y = y;
    };

    if (props.moveParticlesOnHover) {
        container.value.addEventListener('mousemove', handleMouseMove);
    }

    const count = props.particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = props.particleColors;

    for (let i = 0; i < count; i++) {
        let x, y, z, len;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
            len = x * x + y * y + z * z;
        } while (len > 1 || len === 0);
        const r = Math.cbrt(Math.random());
        positions.set([x * r, y * r, z * r], i * 3);
        randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
        const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
        colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors }
    });

    colorAttribute = geometry.attributes.color;

    const observer = new MutationObserver(() => {
        updateParticleColors();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            uTime: { value: 0 },
            uSpread: { value: props.particleSpread },
            uBaseSize: { value: props.particleBaseSize },
            uSizeRandomness: { value: props.sizeRandomness },
            uAlphaParticles: { value: props.alphaParticles ? 1 : 0 }
        },
        transparent: true,
        depthTest: false
    });

    particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t) => {
        animationFrameId = requestAnimationFrame(update);
        const delta = t - lastTime;
        lastTime = t;
        elapsed += delta * props.speed;

        program.uniforms.uTime.value = elapsed * 0.001;

        if (props.moveParticlesOnHover) {
            particles.position.x = -mouseRef.x * props.particleHoverFactor;
            particles.position.y = -mouseRef.y * props.particleHoverFactor;
        } else {
            particles.position.x = 0;
            particles.position.y = 0;
        }

        if (!props.disableRotation) {
            particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
            particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
            particles.rotation.z += 0.01 * props.speed;
        }

        renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
        observer.disconnect();
    };
});

onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (container.value && renderer) {
        const canvas = renderer.gl.canvas;
        if (container.value.contains(canvas)) {
            container.value.removeChild(canvas);
        }
    }
});
</script>

<style scoped>
.particles-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
</style>
