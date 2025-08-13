(function ($) {
  "use strict";

  var test = document.createElement("input");
  var placeholder = "placeholder" in test;

  if (!placeholder) {
    $("[placeholder]").each(function () {
      var $this = $(this);
      var placeholderText = $this.attr("placeholder");

      $this.val(placeholderText).addClass("placeholder");

      $this.on("focus", function () {
        if ($this.val() === placeholderText) {
          $this.val("").removeClass("placeholder");
        }
      });

      $this.on("blur", function () {
        if ($this.val() === "") {
          $this.val(placeholderText).addClass("placeholder");
        }
      });
    });
  }

  $.fn.placeholder = function () {
    return this;
  };
})(jQuery);

(function ($) {
  "use strict";

  $.fn.simpleGrid = function (options) {
    var settings = $.extend(
      {
        itemSelector: ".grid-item",
        columns: 3,
        gap: 20,
      },
      options
    );

    return this.each(function () {
      var $container = $(this);
      var $items = $container.find(settings.itemSelector);

      $container.css({
        display: "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
        gap: settings.gap + "px",
      });
    });
  };
})(jQuery);

(function ($) {
  "use strict";

  $.fn.imagesLoaded = function (callback) {
    var $images = this.find("img");
    var totalImages = $images.length;
    var loadedImages = 0;

    function imageLoaded() {
      loadedImages++;
      if (loadedImages === totalImages && callback) {
        callback.call(this);
      }
    }

    if (totalImages === 0 && callback) {
      callback.call(this);
      return this;
    }

    $images.each(function () {
      var img = new Image();
      img.onload = imageLoaded;
      img.onerror = imageLoaded;
      img.src = this.src;
    });

    return this;
  };
})(jQuery);
