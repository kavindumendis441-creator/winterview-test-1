document.addEventListener('DOMContentLoaded', function () {

  /* ---- Header scroll state ---- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-close');
  if(toggle && mobileNav){
    toggle.addEventListener('click', function(){ mobileNav.classList.add('open'); });
  }
  if(mobileClose && mobileNav){
    mobileClose.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
  }
  if(mobileNav){
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---- Gallery filters ---- */
  var filterBtns = document.querySelectorAll('.gallery-filters button');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      galleryItems.forEach(function(item){
        if(cat === 'all' || item.getAttribute('data-cat') === cat){
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---- Lightbox ---- */
  var lightbox = document.querySelector('.lightbox');
  if(lightbox){
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var current = 0;

    function openAt(i){
      current = i;
      var item = items[current];
      lbImg.src = item.getAttribute('data-full') || item.querySelector('img').src;
      lbCap.textContent = item.getAttribute('data-title') || '';
      lightbox.classList.add('open');
    }
    items.forEach(function(item, i){
      item.addEventListener('click', function(){ openAt(i); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    if(closeBtn) closeBtn.addEventListener('click', function(){ lightbox.classList.remove('open'); });
    if(prevBtn) prevBtn.addEventListener('click', function(){
      var visible = items.filter(function(it){ return !it.classList.contains('hidden'); });
      var idx = visible.indexOf(items[current]);
      idx = (idx - 1 + visible.length) % visible.length;
      openAt(items.indexOf(visible[idx]));
    });
    if(nextBtn) nextBtn.addEventListener('click', function(){
      var visible = items.filter(function(it){ return !it.classList.contains('hidden'); });
      var idx = visible.indexOf(items[current]);
      idx = (idx + 1) % visible.length;
      openAt(items.indexOf(visible[idx]));
    });
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox){ lightbox.classList.remove('open'); }
    });
    document.addEventListener('keydown', function(e){
      if(!lightbox.classList.contains('open')) return;
      if(e.key === 'Escape') lightbox.classList.remove('open');
      if(e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if(e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

});
