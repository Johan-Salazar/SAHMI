    // Scroll dinámico de menú
    const topMenu = document.getElementById('topMenu');
    const heroBg = document.getElementById('heroBg');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Mover la imagen de fondo con el scroll (más lento)
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;

      // Cambiar menú al hacer scroll
      if (scrollY > 20) {
        topMenu.classList.add('scrolled');
      } else {
        topMenu.classList.remove('scrolled');
      }
    });