(function (window, document) {
  "use strict";

  var docElement = document.documentElement;
  var tests = {};

  function addTest(property, test) {
    tests[property] = test;
  }

  addTest("touchevents", function () {
    return (
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)
    );
  });

  addTest("csstransforms", function () {
    var style = document.createElement("div").style;
    return (
      "transform" in style ||
      "webkitTransform" in style ||
      "MozTransform" in style
    );
  });

  addTest("csstransitions", function () {
    var style = document.createElement("div").style;
    return (
      "transition" in style ||
      "webkitTransition" in style ||
      "MozTransition" in style
    );
  });

  addTest("flexbox", function () {
    var style = document.createElement("div").style;
    return "flex" in style || "webkitFlex" in style || "MozFlex" in style;
  });

  addTest("svg", function () {
    return (
      !!document.createElementNS &&
      !!document.createElementNS("http://www.w3.org/2000/svg", "svg")
        .createSVGRect
    );
  });

  var classes = [];
  for (var test in tests) {
    var result =
      typeof tests[test] === "function" ? tests[test]() : tests[test];
    classes.push((result ? "" : "no-") + test);
  }

  docElement.className = docElement.className.replace(/\bno-js\b/, "js");
  docElement.className += " " + classes.join(" ");

  window.Modernizr = tests;
})(window, document);
