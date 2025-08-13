(function ($) {
  "use strict";

  var cfg = {
    scrollDuration: 800,
  };

  function initPreloader() {
    $(window).on("load", function () {
      $("#preloader").fadeOut(600);
      $("html").removeClass("cl-preload").addClass("cl-loaded");
    });
  }

  function initMobileMenu() {
    var $menuToggle = $(".header-menu-toggle");
    var $nav = $(".header-nav");
    var $body = $("body");

    $menuToggle.on("click", function (e) {
      e.preventDefault();
      $body.toggleClass("menu-is-open");
    });

    $(".header-nav__close").on("click", function (e) {
      e.preventDefault();
      $body.removeClass("menu-is-open");
    });

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 150) {
        $menuToggle.addClass("opaque");
      } else {
        $menuToggle.removeClass("opaque");
      }
    });

    $body.on("click", function (e) {
      if (!$(e.target).closest(".header-nav, .header-menu-toggle").length) {
        $body.removeClass("menu-is-open");
      }
    });
  }

  function initGallery() {
    $(".thumb-link").on("click", function (e) {
      e.preventDefault();
      var src = $(this).attr("href");
      var title = $(this).attr("title");

      var modal = $(`
                <div class="simple-modal-overlay">
                    <div class="simple-modal-content">
                        <img src="${src}" alt="${title}">
                        <button class="simple-modal-close">&times;</button>
                    </div>
                </div>
            `);

      $("body").append(modal);
      modal.fadeIn(300);

      modal.on("click", function (e) {
        if (e.target === this || $(e.target).hasClass("simple-modal-close")) {
          modal.fadeOut(300, function () {
            modal.remove();
          });
        }
      });
    });
  }

  function initStatsCounter() {
    var $stats = $(".stats__count");
    var hasRun = false;

    function runCounter() {
      if (hasRun) return;
      hasRun = true;

      $stats.each(function () {
        var $this = $(this);
        var target = parseInt($this.text());
        var current = 0;
        var increment = target / 50;

        var timer = setInterval(function () {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          $this.text(Math.ceil(current));
        }, 40);
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCounter();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      var statsSection = document.querySelector(".s-stats");
      if (statsSection) observer.observe(statsSection);
    } else {
      $(window).on("scroll", function () {
        var statsSection = $(".s-stats");
        if (statsSection.length) {
          var scrollTop = $(window).scrollTop();
          var elementTop = statsSection.offset().top;
          if (scrollTop + $(window).height() > elementTop + 100) {
            runCounter();
          }
        }
      });
    }
  }

  function initTestimonialSlider() {
    var $slider = $(".testimonials__slider");
    var $slides = $slider.find(".testimonials__slide");
    var currentSlide = 0;
    var totalSlides = $slides.length;

    if (totalSlides <= 1) return;

    $slides.hide().eq(0).show();

    var dotsHtml = '<div class="slider-dots">';
    for (var i = 0; i < totalSlides; i++) {
      dotsHtml += `<button class="slider-dot${
        i === 0 ? " active" : ""
      }" data-slide="${i}"></button>`;
    }
    dotsHtml += "</div>";
    $slider.after(dotsHtml);

    var $dots = $(".slider-dot");

    setInterval(function () {
      $slides.eq(currentSlide).fadeOut(300);
      $dots.eq(currentSlide).removeClass("active");

      currentSlide = (currentSlide + 1) % totalSlides;

      $slides.eq(currentSlide).fadeIn(300);
      $dots.eq(currentSlide).addClass("active");
    }, 4000);

    $dots.on("click", function () {
      var targetSlide = parseInt($(this).data("slide"));
      if (targetSlide !== currentSlide) {
        $slides.eq(currentSlide).fadeOut(300);
        $dots.eq(currentSlide).removeClass("active");

        currentSlide = targetSlide;

        $slides.eq(currentSlide).fadeIn(300);
        $dots.eq(currentSlide).addClass("active");
      }
    });
  }

  function initSmoothScroll() {
    $(".smoothscroll").on("click", function (e) {
      var target = this.hash;
      var $target = $(target);

      if ($target.length) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration
        );

        $("body").removeClass("menu-is-open");
      }
    });
  }

  function initContactForm() {
    $("#mc-form").on("submit", function (e) {
      e.preventDefault();
      var $form = $(this);
      var email = $form.find('input[type="email"]').val();
      var $message = $form.find(".subscribe-message");

      if (email && email.includes("@") && email.includes(".")) {
        $message.html("✓ Thank you for subscribing!").css("color", "#4CAF50");
        $form.find('input[type="email"]').val("");
      } else {
        $message
          .html("⚠ Please enter a valid email address.")
          .css("color", "#f44336");
      }
    });
  }

  function initBackToTop() {
    var $backToTop = $(".cl-go-top");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 500) {
        $backToTop.fadeIn(400);
      } else {
        $backToTop.fadeOut(400);
      }
    });

    $backToTop.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }

  function initAnimations() {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("aos-animate");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll("[data-aos]").forEach(function (el) {
        observer.observe(el);
      });
    } else {
      $("[data-aos]").addClass("aos-animate");
    }
  }

  $(document).ready(function () {
    initPreloader();
    initMobileMenu();
    initGallery();
    initStatsCounter();
    initTestimonialSlider();
    initSmoothScroll();
    initContactForm();
    initBackToTop();
    initAnimations();
  });
})(jQuery);
