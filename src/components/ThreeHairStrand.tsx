import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHairStrandProps {
  activeStep: number;
  revealPercent?: number; // 0 to 100
  isSliderActive?: boolean;
}

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

// Generate an organic micro-pore and fibrous texture procedurally
function createBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Fill neutral bump gray
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);
  
  // Create organic horizontal fiber lines (striations)
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const length = 50 + Math.random() * 100;
    const thickness = 1 + Math.random() * 2.5;
    const alpha = 0.04 + Math.random() * 0.12;
    
    const grad = ctx.createLinearGradient(x, y, x + length, y);
    grad.addColorStop(0, 'rgba(128,128,128,0)');
    const noiseVal = Math.random() > 0.5 ? 255 : 0;
    grad.addColorStop(0.5, `rgba(${noiseVal}, ${noiseVal}, ${noiseVal}, ${alpha})`);
    grad.addColorStop(1, 'rgba(128,128,128,0)');
    
    ctx.strokeStyle = grad;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.stroke();
  }

  // Add micro-speckles/pores to match the SEM reference
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 0.5 + Math.random() * 1.2;
    const alpha = 0.03 + Math.random() * 0.08;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1.5);
  return texture;
}

export default function ThreeHairStrand({ 
  activeStep, 
  revealPercent = 0, 
  isSliderActive = false 
}: ThreeHairStrandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Detect WebGL and prefers-reduced-motion
  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Three.js Setup
  useEffect(() => {
    if (!webglSupported || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 1000);
    camera.position.z = 21;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Main Group for the Hair Strand
    const hairGroup = new THREE.Group();
    scene.add(hairGroup);

    // --- MATERIALS & TEXTURES ---
    const bumpTexture = createBumpTexture();

    // Core (Cortex) Material
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#5E493B'),
      roughness: 0.9,
      metalness: 0.05,
      bumpMap: bumpTexture,
      bumpScale: 0.012,
      sheen: 0.4,
      sheenColor: new THREE.Color('#7A5E4E'),
    });

    const numRows = 30; // High density rows

    // Organic color palettes matching the microscopy reference perfectly
    const damagedColors = [
      new THREE.Color('#715B4C'), // Weathered dusty brown
      new THREE.Color('#826B5C'), // Soft dry beige-brown
      new THREE.Color('#624C3D'), // Dark dry bark brown
      new THREE.Color('#796353'), // Texturized greyish brown
      new THREE.Color('#554032'), // Deep shadowed dry brown
    ];

    const healthyColors = [
      new THREE.Color('#530A14'), // Luxury rich Bordeaux red
      new THREE.Color('#44040B'), // Deep dark Bordeaux
      new THREE.Color('#6E1F2B'), // Radiant bordeaux crimson
      new THREE.Color('#3A0106'), // Velvet mahogany
      new THREE.Color('#5D131F'), // Rich warm ruby Bordeaux
    ];

    // Instantiate unique physical materials for each of the 30 rows to enable left-to-right micro gradients!
    const rowMaterials: THREE.MeshPhysicalMaterial[] = [];
    for (let i = 0; i < numRows; i++) {
      const matIdx = i % 5;
      const mat = new THREE.MeshPhysicalMaterial({
        color: damagedColors[matIdx].clone(),
        roughness: 0.85,
        metalness: 0.08,
        clearcoat: 0.0,
        clearcoatRoughness: 0.4,
        sheen: 0.6,
        sheenColor: new THREE.Color('#8E7362'),
        bumpMap: bumpTexture,
        bumpScale: 0.02,
        side: THREE.DoubleSide,
      });
      rowMaterials.push(mat);
    }

    // Glowing Glass Shield Material (Sela Step 3)
    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#DFB15B'),
      transparent: true,
      opacity: 0.0,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.5,
      thickness: 0.3,
      side: THREE.DoubleSide,
    });

    const listGeometries: THREE.BufferGeometry[] = [];
    const listMaterials: (THREE.Material | THREE.Texture)[] = [
      coreMaterial,
      shieldMaterial,
      bumpTexture,
      ...rowMaterials,
    ];

    // --- GEOMETRIES ---

    // Core Cylinder
    const coreGeo = new THREE.CylinderGeometry(0.95, 0.95, 14.5, 36, 24);
    coreGeo.rotateZ(Math.PI / 2); // Make cylinder horizontal
    listGeometries.push(coreGeo);

    // Perturb core cylinder vertices to make it look organic and microscopically fibrous
    const corePos = coreGeo.attributes.position;
    for (let i = 0; i < corePos.count; i++) {
      const x = corePos.getX(i);
      const y = corePos.getY(i);
      const z = corePos.getZ(i);
      if (Math.abs(x) < 7.1) {
        const angle = Math.atan2(z, y);
        const length = Math.sqrt(y * y + z * z);
        // Vertical fibrous micro-ridges along the hair cylinder
        const noise = (Math.sin(x * 5.0) * 0.02 + Math.cos(angle * 8.0) * 0.015) * length;
        corePos.setY(i, y + Math.cos(angle) * noise);
        corePos.setZ(i, z + Math.sin(angle) * noise);
      }
    }
    coreGeo.computeVertexNormals();

    const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    hairGroup.add(coreMesh);

    // Cuticle Scale Custom Shaped Plate (Curved & Beveled)
    const scaleShape = new THREE.Shape();
    scaleShape.moveTo(0, -0.42);
    scaleShape.lineTo(-0.7, -0.42);
    // Rounded cuticle plate outline matching the SEM reference photo perfectly
    scaleShape.quadraticCurveTo(-1.0, -0.2, -1.0, 0);
    scaleShape.quadraticCurveTo(-1.0, 0.2, -0.7, 0.42);
    scaleShape.lineTo(0, 0.42);
    scaleShape.closePath();

    const extrudeSettings = {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.006,
      bevelThickness: 0.006,
    };

    const scaleGeo = new THREE.ExtrudeGeometry(scaleShape, extrudeSettings);
    listGeometries.push(scaleGeo);

    // Apply the curved cylindrical bend & chipped edges to the scale geometry
    const scalePos = scaleGeo.attributes.position;
    for (let i = 0; i < scalePos.count; i++) {
      const vx = scalePos.getX(i);
      const vy = scalePos.getY(i);
      const vz = scalePos.getZ(i);

      // Cylindrical wrapping math: wrap around standard cylinder of radius 1.0 along cylinder circumference
      const radius = 1.0;
      const angle = vy / radius;
      const newY = Math.sin(angle) * radius;
      const newZ = vz + (Math.cos(angle) - 1) * radius;

      // Chipped edge factor (higher noise at the free outer edge of the scale, vx close to -1.0)
      const edgeFactor = Math.abs(vx) / 1.0;
      const noiseX = (Math.random() - 0.5) * 0.045 * edgeFactor;
      const noiseY = (Math.random() - 0.5) * 0.045 * edgeFactor;
      const noiseZ = (Math.random() - 0.5) * 0.02 * edgeFactor;

      scalePos.setX(i, vx + noiseX);
      scalePos.setY(i, newY + noiseY);
      scalePos.setZ(i, newZ + noiseZ);
    }
    scaleGeo.computeVertexNormals();

    // Populate Overlapping Cuticle Scale Rows
    const scalePivots: { pivot: THREE.Group; baseAngle: number; xPos: number; rowIdx: number }[] = [];
    const scalesPerRow = 13; // Packed overlap
    const hairLength = 13.2;

    for (let r = 0; r < numRows; r++) {
      const xPos = -hairLength / 2 + (r / (numRows - 1)) * hairLength;
      
      for (let s = 0; s < scalesPerRow; s++) {
        // Spiral angle stagger to cover the cylinder fully and naturally
        const baseAngle = (s / scalesPerRow) * Math.PI * 2 + r * 0.22;

        const rowGroup = new THREE.Group();
        rowGroup.position.set(xPos, 0, 0);
        rowGroup.rotation.x = baseAngle;
        hairGroup.add(rowGroup);

        const pivot = new THREE.Group();
        pivot.position.set(0, 0.95, 0); // Hug the core surface
        rowGroup.add(pivot);

        // Assign the row-specific material to enable beautiful micro gradients
        const mesh = new THREE.Mesh(scaleGeo, rowMaterials[r]);
        mesh.rotation.x = -Math.PI / 2; // Keep flat tangent to surface
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        pivot.add(mesh);

        scalePivots.push({
          pivot,
          baseAngle,
          xPos,
          rowIdx: r,
        });
      }
    }

    // Protective Shield Mesh (Sela Step 3)
    const shieldGeo = new THREE.CylinderGeometry(1.3, 1.3, 14.2, 40, 1);
    shieldGeo.rotateZ(Math.PI / 2);
    listGeometries.push(shieldGeo);
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMaterial);
    hairGroup.add(shieldMesh);

    // --- PARTICLE SYSTEM ---
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const numParticles = 55;
    const particlesData: {
      mesh: THREE.Mesh;
      angle: number;
      speed: number;
      radiusSpeed: number;
      yOffset: number;
      xPos: number;
      phase: number;
    }[] = [];

    const particleMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFD27A'),
      transparent: true,
      opacity: 0.9,
    });
    listMaterials.push(particleMaterial);

    const particleGeo = new THREE.SphereGeometry(0.07, 8, 8);
    listGeometries.push(particleGeo);

    for (let i = 0; i < numParticles; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMaterial);
      pMesh.visible = false;
      particleGroup.add(pMesh);

      particlesData.push({
        mesh: pMesh,
        angle: Math.random() * Math.PI * 2,
        speed: 1.4 + Math.random() * 2.2,
        radiusSpeed: 0.6 + Math.random() * 0.8,
        yOffset: (Math.random() - 0.5) * 0.4,
        xPos: (Math.random() - 0.5) * 12.2,
        phase: Math.random() * 100,
      });
    }

    // --- LIGHTING (Studio High Contrast / SEM Style for Extreme Realism) ---
    // Soft overall ambient light
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.65);
    scene.add(ambientLight);

    // Key Light: Dramatic lighting at an angle to create deep shadows under open scales (2048 res for beautiful shadow lines!)
    const keyLight = new THREE.DirectionalLight('#FFF3E8', 3.2);
    keyLight.position.set(-7, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.radius = 2.5;
    scene.add(keyLight);

    // Rim Light: Strong backlight pointing towards camera for a microscopic edge glow
    const rimLight = new THREE.DirectionalLight('#FFE6C9', 3.0);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Soft warm fill light for chocolatey, rich shadows
    const fillLight = new THREE.DirectionalLight('#E7C1AC', 1.4);
    fillLight.position.set(6, -6, 4);
    scene.add(fillLight);

    // Interactive mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION PARAMETERS & INTERPOLATORS ---
    const lerpState = {
      coreScale: 1.0,
      irregularity: 0.25,
      shieldOpacity: 0.0,
      particleVisibility: 0.0,
    };

    // Global step targets for state variables
    const stepTargets = [
      {
        coreScale: 0.88,
        irregularity: 1.0,
        shieldOpacity: 0.0,
        particleVisibility: 0.0,
      },
      {
        coreScale: 0.94,
        irregularity: 0.85,
        shieldOpacity: 0.0,
        particleVisibility: 1.0,
      },
      {
        coreScale: 1.25, // Plump and rebuild the cortex
        irregularity: 0.45,
        shieldOpacity: 0.0,
        particleVisibility: 0.5,
      },
      {
        coreScale: 1.25,
        irregularity: 0.02, // Perfectly smooth and aligned
        shieldOpacity: 0.75, // Golden protective glass shield
        particleVisibility: 0.0,
      },
    ];

    let clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Mouse position interpolation
      mouseX += (targetMouseX - mouseX) * 4.0 * dt;
      mouseY += (targetMouseY - mouseY) * 4.0 * dt;

      // Calculate state targets dynamically based on whether slider is active or step mode is active
      let targetCoreScale = 1.0;
      let targetIrregularity = 1.0;
      let targetShieldOpacity = 0.0;
      let targetParticleVisibility = 0.0;

      if (isSliderActive) {
        // Slider mode: Reveal progress from right to left (0% to 100%)
        const progress = revealPercent / 100;
        
        targetCoreScale = THREE.MathUtils.lerp(0.88, 1.25, progress);
        targetIrregularity = THREE.MathUtils.lerp(1.0, 0.02, progress);
        targetShieldOpacity = progress > 0.85 ? (progress - 0.85) / 0.15 * 0.75 : 0.0;
        targetParticleVisibility = progress > 0.05 && progress < 0.85 ? 0.75 : 0.0;
      } else {
        // Step mode
        const tStep = stepTargets[activeStep] || stepTargets[0];
        targetCoreScale = tStep.coreScale;
        targetIrregularity = tStep.irregularity;
        targetShieldOpacity = tStep.shieldOpacity;
        targetParticleVisibility = tStep.particleVisibility;
      }

      // Smooth state interpolation
      const lerpSpeed = reducedMotion ? 10.0 : 3.5;
      lerpState.coreScale += (targetCoreScale - lerpState.coreScale) * lerpSpeed * dt;
      lerpState.irregularity += (targetIrregularity - lerpState.irregularity) * lerpSpeed * dt;
      lerpState.shieldOpacity += (targetShieldOpacity - lerpState.shieldOpacity) * lerpSpeed * dt;
      lerpState.particleVisibility += (targetParticleVisibility - lerpState.particleVisibility) * lerpSpeed * dt;

      // 1. Core scale & dynamic material properties
      coreMesh.scale.set(1.0, lerpState.coreScale, lerpState.coreScale);

      // Determine average global health for general cortex color blending
      const avgHealth = isSliderActive ? revealPercent / 100 : (activeStep / 3);
      const coreDamagedColor = new THREE.Color('#5E493B');
      const coreHealthyColor = new THREE.Color('#3A0106');
      const targetCoreColor = new THREE.Color().copy(coreDamagedColor).lerp(coreHealthyColor, avgHealth);
      coreMaterial.color.lerp(targetCoreColor, 3.5 * dt);
      coreMaterial.roughness += (THREE.MathUtils.lerp(0.9, 0.35, avgHealth) - coreMaterial.roughness) * 3.5 * dt;
      coreMaterial.bumpScale += (THREE.MathUtils.lerp(0.012, 0.003, avgHealth) - coreMaterial.bumpScale) * 3.5 * dt;

      // 2. Interpolate row-level materials and scale pivot properties for biological realism
      scalePivots.forEach((s) => {
        // Scales hug the cortex surface
        s.pivot.position.y = lerpState.coreScale * 0.95;

        // Position factor from left (0) to right (1)
        const t = (s.xPos + 6.6) / 13.2;

        // Calculate specific row health factor (0 to 1)
        let rowHealth = 0;

        if (isSliderActive) {
          // In slider mode: the healthy zone sweeps from right (t=1) to left (t=0)
          const revealFactor = revealPercent / 100;
          const threshold = 1.0 - revealFactor;
          const distance = t - threshold; // positive if t is in the healthy zone
          rowHealth = THREE.MathUtils.clamp((distance + 0.1) / 0.2, 0.0, 1.0);
        } else {
          // In step mode:
          if (activeStep === 0) {
            rowHealth = 0.0;
          } else if (activeStep === 1) {
            rowHealth = t * 0.4; // Tip is slightly filled first
          } else if (activeStep === 2) {
            rowHealth = 0.2 + t * 0.6; // Redensification expands leftwards
          } else if (activeStep === 3) {
            rowHealth = 1.0; // Fully sealed
          }
        }

        // Interpolate this row's material parameters based on its local rowHealth factor
        const mat = rowMaterials[s.rowIdx];
        const matIdx = s.rowIdx % 5;
        
        // Target physical values
        const targetColor = new THREE.Color().copy(damagedColors[matIdx]).lerp(healthyColors[matIdx], rowHealth);
        const targetRoughness = THREE.MathUtils.lerp(0.85, 0.20, rowHealth);
        const targetMetalness = THREE.MathUtils.lerp(0.08, 0.35, rowHealth);
        const targetClearcoat = THREE.MathUtils.lerp(0.0, 0.92, rowHealth);
        const targetBumpScale = THREE.MathUtils.lerp(0.024, 0.003, rowHealth);

        // Apply smooth lerping to each row's physical values
        mat.color.lerp(targetColor, 4.0 * dt);
        mat.roughness += (targetRoughness - mat.roughness) * 4.0 * dt;
        mat.metalness += (targetMetalness - mat.metalness) * 4.0 * dt;
        mat.clearcoat += (targetClearcoat - mat.clearcoat) * 4.0 * dt;
        mat.bumpScale += (targetBumpScale - mat.bumpScale) * 4.0 * dt;

        // Dynamic scale flare rotation based on local rowHealth
        // Damaged: lifted up to 0.72 rad. Healthy: closed completely down to 0.015 rad.
        const maxAngle = 0.72 - t * 0.35;
        const minAngle = 0.015 - t * 0.01;
        const targetAngle = THREE.MathUtils.lerp(maxAngle, minAngle, rowHealth);
        const scaleIrregularity = THREE.MathUtils.lerp(1.0 - t * 0.5, 0.02, rowHealth);

        // Ambient micro-movements (air/water wave and organic noise)
        const wave = Math.sin(s.xPos * 1.8 + elapsed * 1.4 + s.baseAngle * 3) * 0.035 * scaleIrregularity * lerpState.irregularity;
        const noise = Math.sin(s.baseAngle * 6 + s.rowIdx * 2.5) * 0.16 * scaleIrregularity * lerpState.irregularity;

        const currentFlare = Math.max(0.002, targetAngle + wave + noise);

        // Apply physical orientation to scale mesh
        s.pivot.rotation.z = currentFlare;
        s.pivot.rotation.y = noise * 0.35;
        s.pivot.rotation.x = wave * 0.25;
      });

      // 3. Animate Golden Shield (Step 3)
      shieldMaterial.opacity = lerpState.shieldOpacity;
      if (lerpState.shieldOpacity > 0.01) {
        shieldMesh.visible = true;
        const pulse = 1.0 + Math.sin(elapsed * 2.2) * 0.012;
        shieldMesh.scale.set(1.0, pulse, pulse);
      } else {
        shieldMesh.visible = false;
      }

      // 4. Animate Nutrient Particles (Step 1 & 2)
      if (lerpState.particleVisibility > 0.01) {
        particleGroup.visible = true;
        particlesData.forEach((p, idx) => {
          p.angle += p.speed * dt;
          
          const age = (elapsed * p.radiusSpeed + p.phase) % 3.0;
          const tProgress = age / 3.0; // 0 to 1

          const startR = 3.3;
          const endR = lerpState.coreScale + 0.1;
          const currentR = THREE.MathUtils.lerp(startR, endR, tProgress);

          const px = p.xPos + Math.sin(elapsed * 0.5 + idx) * 0.4;
          const py = Math.cos(p.angle) * currentR;
          const pz = Math.sin(p.angle) * currentR;

          p.mesh.position.set(px, py, pz);

          const particleOpacity = (1.0 - tProgress) * lerpState.particleVisibility;
          const pMat = p.mesh.material as THREE.MeshBasicMaterial;
          pMat.opacity = particleOpacity;
          
          const currentScale = (1.0 - tProgress) * 0.85;
          p.mesh.scale.set(currentScale, currentScale, currentScale);

          p.mesh.visible = particleOpacity > 0.05;
        });
      } else {
        particleGroup.visible = false;
      }

      // 5. Gentle camera/hair rotation based on mouse or ambient idle
      if (!reducedMotion) {
        hairGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.035 + mouseX * 0.16;
        hairGroup.rotation.z = Math.cos(elapsed * 0.28) * 0.015 + mouseY * 0.1;
        hairGroup.rotation.x = elapsed * 0.045; // Specular highlights catching rotation
      } else {
        hairGroup.rotation.y = mouseX * 0.1;
        hairGroup.rotation.z = mouseY * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !canvasRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      listGeometries.forEach((g) => g.dispose());
      listMaterials.forEach((m) => m.dispose());
    };
  }, [activeStep, revealPercent, isSliderActive, webglSupported, reducedMotion]);

  if (!webglSupported) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative animate-fade-in" id="three-canvas-wrapper">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" id="three-hair-canvas" />
    </div>
  );
}
