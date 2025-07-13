// Mock Three.js setup for browsers that don't support WebGL
export function setupThreeScene(container: HTMLElement): () => void {
  try {
    // Check if Three.js is available globally
    if (typeof window !== 'undefined' && (window as any).THREE) {
      const THREE = (window as any).THREE;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      
      // Create floating particles
      const particleCount = 100;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.02,
        transparent: true,
        opacity: 0.8
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      
      camera.position.z = 5;
      
      const animate = () => {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }
  } catch (error) {
    console.log('Three.js not available, using fallback');
  }
  
  // Fallback: Create a simple animated background
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
  }> = [];
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  };
  
  container.appendChild(canvas);
  animate();
  
  const handleResize = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    if (container.contains(canvas)) {
      container.removeChild(canvas);
    }
  };
}
