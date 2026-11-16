// Alle reviews in een carousel even hoog maken, zodat de pagina eronder niet verspringt
// en lange reviews nooit over de knoppen eronder lopen
function gelijkeReviewHoogte() {
  document
    .querySelectorAll("#reviewCarousel, #singleReviewCarousel")
    .forEach((carousel) => {
      const inner = carousel.querySelector(".carousel-inner");
      inner.style.minHeight = "";
      const breedte = inner.getBoundingClientRect().width;
      let max = 0;
      carousel.querySelectorAll(".carousel-item").forEach((item) => {
        const oud = item.style.cssText;
        item.style.cssText =
          "display:block;visibility:hidden;position:absolute;width:" + breedte + "px";
        max = Math.max(max, item.offsetHeight);
        item.style.cssText = oud;
      });
      if (breedte > 0 && max > 0) inner.style.minHeight = max + "px";
    });
}
window.addEventListener("resize", gelijkeReviewHoogte);
window.addEventListener("load", gelijkeReviewHoogte);
if (document.fonts) document.fonts.ready.then(gelijkeReviewHoogte);

// Carousels starten pas bij het load-event; de pagina's komen daarna via fetch binnen
function startCarousels(selector) {
  document
    .querySelectorAll(selector + " .carousel")
    .forEach((c) => bootstrap.Carousel.getOrCreateInstance(c).cycle());
}

function navUp() {
  document.getElementById("navbar").classList.add("scrolled-down");
  document.getElementById("navbar").classList.remove("scrolled-up");
  document.getElementById("contentMask").style.height = "120px";
}

function navDown() {
  document.getElementById("navbar").classList.add("scrolled-up");
  document.getElementById("navbar").classList.remove("scrolled-down");
  document.getElementById("contentMask").style.height = "169px";
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (window.innerWidth > 768) {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      navUp();
    } else {
      navDown();
    }
  } else {
    navDown();
  }
}

function triggerBtn() {
  var triggetContact = document.getElementById("nav-contact-tab");
  triggetContact.click();
}

document.getElementById("logo").addEventListener("mouseover", function () {
  if (window.innerWidth > 768) {
    navDown();
  }
});

fetch("home.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav-home").innerHTML = html;
    startCarousels("#nav-home");
    gelijkeReviewHoogte();
  });

fetch("events.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav-events").innerHTML = html;
    startCarousels("#nav-events");
  });

  document.addEventListener("DOMContentLoaded", function () {
    function addMenuToggleEvents() {
        document.querySelectorAll("#card-menu").forEach(card => {
            const header = card.querySelector(".toggle-header");
            const content = card.querySelector(".content");
            const button = card.querySelector(".toggle-btn");

            if (header && content && button) {
                header.addEventListener("click", function () {
                    if (content.classList.contains("show")) {
                        content.style.maxHeight = "0"; // Collapse
                        content.style.padding = "0";
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px"; // Expand dynamically
                        content.style.padding = "15px";
                    }
                    content.classList.toggle("show"); // Add/remove class
                    button.style.transform = content.classList.contains("show") ? "rotate(180deg)" : "rotate(0deg)";
                });
            }
        });
    }

    // Wait for menu.html to load before adding toggle functionality
    fetch("menu.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("nav-menu").innerHTML = html;
            startCarousels("#nav-menu");
            addMenuToggleEvents(); // Apply event listeners after menu loads
        });
});


fetch("contact.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav-contact").innerHTML = html;
    addMenuToggleEvents();
  });


function openTab(id) {
  document.getElementById(id).click();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Directe links vanaf andere pagina's, bijv. index.html#contact
var tabVoorHash = {
  "#events": "nav-events-tab",
  "#menu": "nav-menu-tab",
  "#contact": "nav-contact-tab",
};
if (tabVoorHash[window.location.hash]) {
  document.getElementById(tabVoorHash[window.location.hash]).click();
}

// Bij wisselen van hoofdtabblad de pagina weer bovenaan laten beginnen
document.querySelectorAll("#nav-tab button").forEach((knop) => {
  knop.addEventListener("shown.bs.tab", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
});
