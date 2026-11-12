/* ====== SHOP SETTINGS: edit these ====== */
const SHOP = {
  name: "Azhar Cloth Shop",
  // WhatsApp number in international format, digits only (Pakistan example: 923001234567)
  whatsapp: "923000000000",
  phoneDisplay: "03XX-XXXXXXX",
  address: "Shop address here"
};
/* ======================================= */

function waLink(text) {
  return "https://wa.me/" + SHOP.whatsapp + "?text=" + encodeURIComponent(text);
}

// Fill contact details
document.getElementById("shopPhone").textContent = SHOP.phoneDisplay;
document.getElementById("shopAddress").textContent = SHOP.address;
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp links
document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
  var item = el.getAttribute("data-item");
  var msg = item
    ? "Assalam o Alaikum, I would like to ask about " + item + " at " + SHOP.name + "."
    : "Assalam o Alaikum, I would like to know more about your fabrics.";
  el.setAttribute("href", waLink(msg));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

// Mobile menu
var toggle = document.getElementById("navToggle");
var nav = document.getElementById("nav");
toggle.addEventListener("click", function () {
  var open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  });
});

// Collection filters
var chips = document.querySelectorAll(".chip");
var cards = document.querySelectorAll(".card");
chips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    chips.forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    var f = chip.getAttribute("data-filter");
    cards.forEach(function (card) {
      var tags = card.getAttribute("data-tags").split(" ");
      card.classList.toggle("hide", f !== "all" && tags.indexOf(f) === -1);
    });
  });
});

// Enquiry form -> WhatsApp
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("fName").value.trim();
  var item = document.getElementById("fItem").value;
  var note = document.getElementById("fMsg").value.trim();
  var text = "Assalam o Alaikum, I am " + name + ". I am looking for " + item + "." +
    (note ? " " + note : "");
  window.open(waLink(text), "_blank", "noopener");
});
