
document.addEventListener('DOMContentLoaded', function() {
  const marquee = document.querySelector('.marquee-content');
  if (marquee) {
    // Duplicate content for seamless looping
    marquee.innerHTML += marquee.innerHTML;
  }
});

// Auto-generate mirrored images for perfect loop
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee-banner-track');
  if (track) {
    const images = track.innerHTML;
    track.innerHTML = images + images; // Duplicate content
  }
});