(function () {
  "use strict";

  var progress = 0;
  var progressBar;
  var isComplete = false;

  function createProgressBar() {
    progressBar = document.createElement("div");
    progressBar.className = "simple-progress";
    progressBar.innerHTML = '<div class="simple-progress-bar"></div>';

    var styles = document.createElement("style");
    styles.textContent = `
            .simple-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                z-index: 9999;
                background: transparent;
            }
            .simple-progress-bar {
                height: 100%;
                background: #cc147f;
                width: 0%;
                transition: width 0.3s ease;
            }
        `;

    document.head.appendChild(styles);
    document.body.appendChild(progressBar);
  }

  function updateProgress(percent) {
    if (progressBar && !isComplete) {
      var bar = progressBar.querySelector(".simple-progress-bar");
      bar.style.width = percent + "%";

      if (percent >= 100) {
        setTimeout(function () {
          progressBar.style.opacity = "0";
          setTimeout(function () {
            if (progressBar && progressBar.parentNode) {
              progressBar.parentNode.removeChild(progressBar);
            }
          }, 300);
        }, 100);
        isComplete = true;
      }
    }
  }

  function startProgress() {
    createProgressBar();

    var increment = function () {
      progress += Math.random() * 30;
      if (progress > 90) progress = 90;
      updateProgress(progress);

      if (progress < 90) {
        setTimeout(increment, 100 + Math.random() * 200);
      }
    };

    increment();
  }

  function completeProgress() {
    progress = 100;
    updateProgress(100);
  }

  if (document.readyState === "loading") {
    startProgress();
    window.addEventListener("load", completeProgress);
  } else {
    completeProgress();
  }
})();
