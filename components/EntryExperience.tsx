import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';
import { COLORS } from '../constants';
import InteractiveParticleBackground from './InteractiveParticleBackground';
import { preloadProfileImage } from '../utils/profileImagePreload';

interface EntryExperienceProps {
  onComplete: () => void;
}

interface SparkVelocity {
  vx: number;
  vy: number;
  vz: number;
  life: number;
  decay: number;
}

interface SmokeVelocity {
  vx: number;
  vy: number;
  vz: number;
  life: number;
  scaleSpeed: number;
  rotationSpeed: number;
}

const TIMELINE = {
  // Start compression immediately on load.
  idleEnd: 0.2,
  compressEnd: 1.45,
  // Shorten the explosion window before text reveal.
  revealAt: 1.75,
  // Keep pre-reveal phases unchanged, but move to main page sooner after text appears.
  fadeOutAt: 4.9,
  completeAt: 5.85,
};

const HERO_NAME = 'Muneeb Ashraf';
const HERO_ROLE = 'AI & Data Science Developer';
const HERO_TAGLINE = 'Building intelligent solutions with mathematics and technology';

const createGlowTexture = (rgb: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, `rgba(${rgb}, 1)`);
  gradient.addColorStop(0.25, `rgba(${rgb}, 0.78)`);
  gradient.addColorStop(0.55, `rgba(${rgb}, 0.24)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const EntryExperience: React.FC<EntryExperienceProps> = ({ onComplete }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showDynamicBackground, setShowDynamicBackground] = useState(false);

  useEffect(() => {
    // Warm the hero profile image while intro animation plays.
    void preloadProfileImage();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const revealTimer = window.setTimeout(() => setRevealed(true), 160);
      const fadeTimer = window.setTimeout(() => setExiting(true), 1200);
      const completeTimer = window.setTimeout(() => onComplete(), 1820);
      return () => {
        window.clearTimeout(revealTimer);
        window.clearTimeout(fadeTimer);
        window.clearTimeout(completeTimer);
      };
    }

    const container = canvasContainerRef.current;
    if (!container) {
      const fallback = window.setTimeout(() => onComplete(), 1200);
      return () => window.clearTimeout(fallback);
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120d18, 0.03);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.34);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xf6e6ff, 1.35);
    keyLight.position.set(6, 11, 7);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.55;
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(new THREE.Color(COLORS.lavender), 0.75);
    backLight.position.set(-6, -4, -6);
    scene.add(backLight);

    const brightGlowTexture = createGlowTexture('214,186,244');
    const smokeGlowTexture = createGlowTexture('69,40,99');

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(COLORS.lavender),
      emissive: new THREE.Color(COLORS.violet),
      emissiveIntensity: 0.42,
      metalness: 0.65,
      roughness: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    structureGroup.add(core);

    const latticeGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const edgesGeometry = new THREE.EdgesGeometry(latticeGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLORS.lavender),
      transparent: true,
      opacity: 0.28,
    });
    const latticeLines = new THREE.LineSegments(edgesGeometry, lineMaterial);
    structureGroup.add(latticeLines);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: brightGlowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color('#e8d8fb'),
    });
    const latticeNodes = new THREE.Points(latticeGeometry, nodeMaterial);
    structureGroup.add(latticeNodes);

    const sparkCount = 720;
    const sparkGeometry = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities: SparkVelocity[] = [];

    for (let i = 0; i < sparkCount; i += 1) {
      sparkPositions[i * 3] = 0;
      sparkPositions[i * 3 + 1] = 0;
      sparkPositions[i * 3 + 2] = 0;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.09 + Math.random() * 0.33;

      sparkVelocities.push({
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed,
        vz: Math.cos(phi) * speed,
        life: 1,
        decay: 0.018 + Math.random() * 0.024,
      });
    }

    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMaterial = new THREE.PointsMaterial({
      size: 0.105,
      map: brightGlowTexture,
      color: new THREE.Color('#e7d5ff'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    sparks.visible = false;
    scene.add(sparks);

    const smokeGroup = new THREE.Group();
    smokeGroup.visible = false;
    scene.add(smokeGroup);

    const smokeCount = 42;
    const smokeSprites: THREE.Sprite[] = [];

    for (let i = 0; i < smokeCount; i += 1) {
      const smokeMaterial = new THREE.SpriteMaterial({
        map: smokeGlowTexture,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const sprite = new THREE.Sprite(smokeMaterial);
      sprite.scale.set(1, 1, 1);
      sprite.position.set(0, 0, 0);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.018 + Math.random() * 0.048;

      sprite.userData = {
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed + 0.022,
        vz: Math.cos(phi) * speed,
        life: 1,
        scaleSpeed: 1.01 + Math.random() * 0.032,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      } as SmokeVelocity;

      smokeGroup.add(sprite);
      smokeSprites.push(sprite);
    }

    const ringGeometry = new THREE.RingGeometry(0.1, 0.22, 72);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#d5b7f3'),
      transparent: true,
      opacity: 0.84,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shockwave = new THREE.Mesh(ringGeometry, ringMaterial);
    shockwave.visible = false;
    shockwave.rotation.x = Math.PI / 3;
    scene.add(shockwave);

    let phase = 0;
    let totalTime = 0;
    let cameraShake = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let hasTriggeredReveal = false;
    let frameId = 0;
    let particleBackgroundTimer: number | null = null;

    const clock = new THREE.Clock();

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      totalTime += delta;

      targetX = mouseX * 2;
      targetY = mouseY * 2;

      if (totalTime < TIMELINE.idleEnd) {
        structureGroup.rotation.y += 0.22 * delta;
        structureGroup.rotation.x += 0.11 * delta;
        structureGroup.rotation.z += 0.055 * delta;

        const scale = 1 + Math.sin(totalTime * 2) * 0.024;
        structureGroup.scale.set(scale, scale, scale);
      } else if (totalTime < TIMELINE.compressEnd) {
        const progress = (totalTime - TIMELINE.idleEnd) / (TIMELINE.compressEnd - TIMELINE.idleEnd);
        const easeIn = progress * progress * progress;

        const scale = 1 - easeIn * 0.94;
        structureGroup.scale.set(scale, scale, scale);

        structureGroup.rotation.y += (0.25 + easeIn * 2.3) * delta;
        structureGroup.rotation.x += (0.14 + easeIn * 1.7) * delta;

        coreMaterial.opacity = 0.72 - easeIn * 0.72;
        lineMaterial.opacity = 0.28 + easeIn * 0.56;
      } else if (phase < 2) {
        phase = 2;
        structureGroup.visible = false;
        sparks.visible = true;
        smokeGroup.visible = true;
        shockwave.visible = true;
        cameraShake = 0.48;

        // The dynamic particles appear as a direct after-effect of the blast.
        particleBackgroundTimer = window.setTimeout(() => {
          setShowDynamicBackground(true);
        }, 120);
      } else {
        if (shockwave.visible) {
          shockwave.scale.x += 14 * delta;
          shockwave.scale.y += 14 * delta;
          ringMaterial.opacity -= 2.2 * delta;
          if (ringMaterial.opacity <= 0) {
            shockwave.visible = false;
          }
        }

        const positions = sparkGeometry.attributes.position.array as Float32Array;
        let activeSparks = false;

        for (let i = 0; i < sparkCount; i += 1) {
          const velocity = sparkVelocities[i];
          if (velocity.life <= 0) {
            positions[i * 3] = 999;
            positions[i * 3 + 1] = 999;
            positions[i * 3 + 2] = 999;
            continue;
          }

          activeSparks = true;
          velocity.vx *= 0.92;
          velocity.vy *= 0.92;
          velocity.vz *= 0.92;

          positions[i * 3] += velocity.vx;
          positions[i * 3 + 1] += velocity.vy;
          positions[i * 3 + 2] += velocity.vz;
          velocity.life -= velocity.decay;
        }

        sparkGeometry.attributes.position.needsUpdate = true;
        if (!activeSparks && phase === 2) {
          sparkMaterial.opacity = Math.max(0, sparkMaterial.opacity - 0.8 * delta);
        }

        for (let i = 0; i < smokeCount; i += 1) {
          const sprite = smokeSprites[i];
          const smoke = sprite.userData as SmokeVelocity;

          if (smoke.life <= 0) {
            continue;
          }

          sprite.position.x += smoke.vx;
          sprite.position.y += smoke.vy;
          sprite.position.z += smoke.vz;
          sprite.scale.multiplyScalar(smoke.scaleSpeed);

          const material = sprite.material as THREE.SpriteMaterial;
          material.rotation += smoke.rotationSpeed;
          smoke.life -= 0.0085;
          material.opacity = Math.max(0, smoke.life * 0.58);
        }

        if (!hasTriggeredReveal && totalTime > TIMELINE.revealAt) {
          hasTriggeredReveal = true;
          setRevealed(true);
        }
      }

      let shakeX = 0;
      let shakeY = 0;
      if (cameraShake > 0) {
        shakeX = (Math.random() - 0.5) * cameraShake;
        shakeY = (Math.random() - 0.5) * cameraShake;
        cameraShake = Math.max(0, cameraShake - delta * 0.78);
      }

      camera.position.x += (targetX - camera.position.x) * 0.05 + shakeX;
      camera.position.y += (-targetY - camera.position.y) * 0.05 + shakeY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const fadeTimer = window.setTimeout(() => setExiting(true), TIMELINE.fadeOutAt * 1000);
    const completeTimer = window.setTimeout(() => onComplete(), TIMELINE.completeAt * 1000);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
      if (particleBackgroundTimer !== null) {
        window.clearTimeout(particleBackgroundTimer);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      coreGeometry.dispose();
      coreMaterial.dispose();
      latticeGeometry.dispose();
      edgesGeometry.dispose();
      lineMaterial.dispose();
      nodeMaterial.dispose();
      sparkGeometry.dispose();
      sparkMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();

      smokeSprites.forEach((sprite) => {
        const material = sprite.material as THREE.SpriteMaterial;
        material.dispose();
      });

      brightGlowTexture.dispose();
      smokeGlowTexture.dispose();

      scene.clear();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="entry-scene"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(circle at 50% 28%, rgba(199,170,230,0.15) 0%, rgba(41,28,58,0.62) 42%, rgba(10,8,18,1) 100%)',
            }}
          />

          <AnimatePresence>
            {showDynamicBackground ? (
              <motion.div
                key="post-explosion-particles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
              >
                <InteractiveParticleBackground theme="dark" spawnFromCenter />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div ref={canvasContainerRef} className="absolute inset-0 z-[1]" />

          <div className="relative z-10 w-full px-6 text-center pointer-events-none flex flex-col items-center">
            <div
              className={`mb-5 rounded-full border border-lavender/30 bg-lavender/10 px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-lavender transition-all duration-[1400ms] ${
                revealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[3px] translate-y-4'
              }`}
            >
              Mathematics + Technology
            </div>

            <h1
              className={`m-0 font-extrabold uppercase tracking-[0.12em] text-[2.2rem] sm:text-[3rem] md:text-[4.35rem] leading-[1.1] transition-all duration-[2300ms] ease-out ${
                revealed ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-[10px] scale-95'
              }`}
              style={{
                backgroundImage: `linear-gradient(180deg, ${COLORS.white} 0%, #d8c2ec 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 42px rgba(107,59,142,0.36)',
              }}
            >
              {HERO_NAME}
            </h1>

            <h2
              className={`mt-4 text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] transition-all duration-[2000ms] ${
                revealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[6px] translate-y-5'
              }`}
              style={{
                transitionDelay: '480ms',
                color: 'rgba(227,211,244,0.95)',
              }}
            >
              {HERO_ROLE}
            </h2>

            <p
              className={`mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed transition-all duration-[1800ms] ${
                revealed ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[5px] translate-y-4'
              }`}
              style={{
                transitionDelay: '900ms',
                color: 'rgba(212,191,234,0.78)',
              }}
            >
              {HERO_TAGLINE}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EntryExperience;
