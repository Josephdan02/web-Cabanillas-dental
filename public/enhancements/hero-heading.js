// Conserva el H1 visible y su estilo desde la versión original.
(function () {
  var HERO_ID = "inicio";
  var HERO_COPY = "Atención integral en todas las especialidades odontológicas";
  var MAX_WAIT_MS = 10000;

  function improveHeroHeading() {
    var hero = document.getElementById(HERO_ID);
    if (!hero) return false;
    if (hero.querySelector("h1")) return true;

    var paragraphs = hero.querySelectorAll("p");
    var copy = null;
    for (var i = 0; i < paragraphs.length; i += 1) {
      if (paragraphs[i].textContent.indexOf(HERO_COPY) !== -1) {
        copy = paragraphs[i];
        break;
      }
    }
    if (!copy) return false;

    var heading = document.createElement("h1");
    heading.className = copy.className;

    var location = document.createElement("span");
    location.className = "text-blue-700";
    location.textContent = "Clínica dental en Huánuco. ";
    heading.appendChild(location);

    while (copy.firstChild) {
      heading.appendChild(copy.firstChild);
    }

    copy.parentNode.replaceChild(heading, copy);
    return true;
  }

  function start() {
    if (improveHeroHeading()) return;

    var observer = new MutationObserver(function () {
      if (improveHeroHeading()) {
        observer.disconnect();
        window.clearTimeout(timeoutId);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    var timeoutId = window.setTimeout(function () {
      observer.disconnect();
    }, MAX_WAIT_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
