/**
 * YatraSutra — Interactive Sticker Peel & Drag Experience
 * Allows visitors to drag stickers around, click to bring them to top,
 * and experience a tactile scrapbook feeling.
 */

(function () {
  function initStickers() {
    const stickers = document.querySelectorAll('.scatter-sticker');
    if (!stickers.length) return;

    let highestZ = 20;

    stickers.forEach((sticker) => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;
      let hasMoved = false;

      // Bring to top on click/touch
      sticker.addEventListener('pointerdown', (e) => {
        // Prevent default drag behaviors
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        highestZ += 1;
        sticker.style.zIndex = highestZ;
        sticker.classList.add('dragging');

        const rect = sticker.getBoundingClientRect();
        const parentRect = sticker.parentElement.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;

        // Current offset relative to parent
        initialLeft = rect.left - parentRect.left;
        initialTop = rect.top - parentRect.top;

        // Switch positioning to precise px on first drag
        sticker.style.left = `${initialLeft}px`;
        sticker.style.top = `${initialTop}px`;
        sticker.style.right = 'auto';
        sticker.style.bottom = 'auto';

        sticker.setPointerCapture(e.pointerId);
      });

      sticker.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved = true;
        }

        sticker.style.left = `${initialLeft + dx}px`;
        sticker.style.top = `${initialTop + dy}px`;
      });

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        sticker.classList.remove('dragging');
        try {
          sticker.releasePointerCapture(e.pointerId);
        } catch (err) {}

        // If it was just a click, give a playful micro-pop
        if (!hasMoved) {
          sticker.style.transform = `scale(1.22) rotate(${sticker.style.getPropertyValue('--rot') || '10deg'})`;
          setTimeout(() => {
            sticker.style.transform = '';
          }, 260);
        }
      };

      sticker.addEventListener('pointerup', endDrag);
      sticker.addEventListener('pointercancel', endDrag);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickers);
  } else {
    initStickers();
  }
})();
