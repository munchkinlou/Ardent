window.onload = () => {
  const containers = document.querySelectorAll('.blocky');
  
  containers.forEach((container, index) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'flower-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.insertBefore(canvas, container.firstChild);
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const lights = [];

    function createLight() {
      const lifespan = Math.random() * 800 + 600;
      const hue = Math.random() * 60 + 250;
      const saturation = 80;
      const lightness = 70;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        dx: (Math.random() - 0.5) * 0.1,
        dy: -(Math.random() * 0.3 + 0.2),
        life: lifespan,
        maxLife: lifespan,
        age: 0,
        alpha: 0,
        hue: hue,
        saturation: saturation,
        lightness: lightness
      };
    }

      let frameCount = 0;
  const spawnDelay = 30;
  const maxLights = 15;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = lights.length - 1; i >= 0; i--) {
      const light = lights[i];
      light.age++;
      const t = light.age / light.maxLife;
      light.alpha = Math.sin(Math.PI * t);

      if (light.alpha > 0.01) {
        const gradient = ctx.createRadialGradient(
          light.x, light.y, 0,
          light.x, light.y, light.radius * 2
        );
        
        const mainColor = `hsla(${light.hue}, ${light.saturation}%, ${light.lightness}%, ${light.alpha * 0.4})`;
        const glowColor = `hsla(${light.hue}, ${light.saturation - 20}%, ${light.lightness - 20}%, ${light.alpha * 0.15})`;
        
        gradient.addColorStop(0, mainColor);
        gradient.addColorStop(0.5, glowColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `hsla(${light.hue}, ${light.saturation + 10}%, ${light.lightness + 10}%, ${light.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      light.x += light.dx;
      light.y += light.dy;

      if (light.age >= light.maxLife) lights.splice(i, 1);
    }

    frameCount++;
    if (frameCount % spawnDelay === 0 && lights.length < maxLights) {
      lights.push(createLight());
    }

    requestAnimationFrame(draw);
  }

    draw();
  });
};
