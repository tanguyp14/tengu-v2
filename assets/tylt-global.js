document.addEventListener('DOMContentLoaded', function () {
  // Burger nav (inner pages sidebar drawer)
  var toggle = document.querySelector('.tylt-menu-toggle');
  var header = document.querySelector('.tylt-header');
  var nav = document.querySelector('.tylt-main-navigation');
  var drawer = document.querySelector('.tylt-menu-drawer');
  var sidebarActions = document.querySelector('.tylt-hero-actions-sidebar');

  if (toggle && header && drawer) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      header.classList.toggle('tylt-header--menu-open');
      nav && nav.classList.toggle('tylt-menu-is-open');
      drawer.classList.toggle('tylt-menu-is-open');
      sidebarActions && sidebarActions.classList.toggle('tylt-menu-open');
    });

    drawer.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      if (drawer.classList.contains('tylt-menu-is-open')) {
        header.classList.remove('tylt-header--menu-open');
        nav && nav.classList.remove('tylt-menu-is-open');
        drawer.classList.remove('tylt-menu-is-open');
        sidebarActions && sidebarActions.classList.remove('tylt-menu-open');
      }
    });
  }

  // Random accent color on unordered lists (star bullets)
  var listColors = ['tylt-color-red', 'tylt-color-blue', 'tylt-color-orange', 'tylt-color-yellow'];
  document.querySelectorAll('.tylt-rich-text ul, .rte ul').forEach(function (ul) {
    ul.classList.add(listColors[Math.floor(Math.random() * listColors.length)]);
  });

  // Smooth scroll back to top
  var backTop = document.querySelector('.tylt-back-top');
  if (backTop) {
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Sticky filter/anchor menu (formations + blog grids)
  document.querySelectorAll('.tylt-cpt-list-menu').forEach(function (menu) {
    var offsetTop = menu.getBoundingClientRect().top + window.scrollY;
    var placeholder = document.createElement('div');
    placeholder.className = 'tylt-cpt-list-menu-placeholder';
    placeholder.style.height = menu.offsetHeight + 'px';
    placeholder.style.display = 'none';
    menu.insertAdjacentElement('afterend', placeholder);

    window.addEventListener('scroll', function () {
      if (window.scrollY >= offsetTop) {
        menu.classList.add('tylt-is-sticky');
        placeholder.style.display = 'block';
      } else {
        menu.classList.remove('tylt-is-sticky');
        placeholder.style.display = 'none';
      }
    });

    menu.querySelectorAll('a.tylt-cpt-list-menu-item').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId.charAt(0) !== '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - menu.offsetHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      });
    });
  });

  // Random radial gradients on menu buttons / card overlays
  var themeColors = ['#E30742', '#FF9900', '#FFEE00', '#5118FB'];
  var overlayColors = [
    'rgba(227, 7, 66, 0.5)',
    'rgba(255, 153, 0, 0.5)',
    'rgba(255, 238, 0, 0.5)',
    'rgba(81, 24, 251, 0.5)',
  ];

  function applyRandomGradient(el, palette) {
    var shuffled = palette.slice().sort(function () {
      return 0.5 - Math.random();
    });
    for (var i = 1; i <= 2; i++) {
      var x = Math.floor(Math.random() * 100);
      var y = Math.floor(Math.random() * 100);
      var size = Math.floor(Math.random() * 70) + 80;
      el.style.setProperty('--gradient-' + i + '-x', x + '%');
      el.style.setProperty('--gradient-' + i + '-y', y + '%');
      el.style.setProperty('--gradient-' + i + '-size', size + '%');
      el.style.setProperty('--gradient-' + i + '-color', shuffled[i - 1]);
    }
  }

  document.querySelectorAll('.tylt-cpt-list-menu-item > span').forEach(function (span) {
    applyRandomGradient(span, themeColors);
  });

  document.querySelectorAll('.tylt-cpt-card-overlay').forEach(function (overlay) {
    applyRandomGradient(overlay, overlayColors);
  });

  // Tag filter for project/work/design grids
  var filterButtons = document.querySelectorAll('.tylt-filter-tag');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var tag = btn.dataset.tag;
      document.querySelectorAll('.tylt-cpt-card').forEach(function (card) {
        if (tag === 'all') {
          card.style.display = '';
          return;
        }
        var tags = (card.dataset.tags || '').split(' ');
        card.style.display = tags.indexOf(tag) !== -1 ? '' : 'none';
      });
    });
  });
});
