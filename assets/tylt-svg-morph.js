document.addEventListener('DOMContentLoaded', function () {
  var colors = ['#5118FB', '#E30742', '#FF9900', '#FFEE00'];

  document.querySelectorAll('.tylt-svg-morph-container').forEach(function (container) {
    var shapes = container.querySelectorAll('.tylt-svg-shape');
    if (!shapes.length) return;

    function randomShapeIndex() {
      return Math.floor(Math.random() * shapes.length);
    }
    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    function randomInterval() {
      return Math.floor(Math.random() * 3000) + 2000;
    }

    function morphShape() {
      shapes.forEach(function (shape) {
        shape.style.display = 'none';
      });

      var nextShape = shapes[randomShapeIndex()];
      var nextColor = randomColor();
      var randomRotation = Math.floor(Math.random() * 360);

      nextShape.style.display = 'block';
      nextShape.style.transform = 'rotate(' + randomRotation + 'deg)';
      var path = nextShape.querySelector('path');
      if (path) path.style.fill = nextColor;

      setTimeout(morphShape, randomInterval());
    }

    var initialRotation = Math.floor(Math.random() * 360);
    var initialColor = randomColor();
    shapes[0].style.transform = 'rotate(' + initialRotation + 'deg)';
    var initialPath = shapes[0].querySelector('path');
    if (initialPath) initialPath.style.fill = initialColor;

    setTimeout(morphShape, randomInterval());
  });
});
