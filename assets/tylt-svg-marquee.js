document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tylt-svg-marquee-wrapper').forEach(function (wrapper) {
    var track = wrapper.querySelector('.tylt-svg-marquee-track');
    var block = wrapper.closest('.tylt-svg-marquee-block');
    if (!track || !block) return;

    var originalHTML = track.innerHTML;
    for (var i = 0; i < 2; i++) {
      track.insertAdjacentHTML('beforeend', originalHTML);
    }

    var speed = parseFloat(block.dataset.speed) || 1;
    var position = 0;
    var itemWidth = track.children[0] ? track.children[0].getBoundingClientRect().width + 32 : 0;
    var totalItems = track.children.length / 3;

    function animate() {
      position -= speed;
      var resetPoint = -(itemWidth * totalItems);
      if (position <= resetPoint) position = 0;
      track.style.transform = 'translateX(' + position + 'px)';
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
});
