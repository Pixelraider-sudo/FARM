/* ===================== Landing Page Behaviour ===================== */
(function () {
 "use strict";

 /* ---------- FAQ accordion ---------- */
 function initFaq() {
 document.querySelectorAll(".faq-question").forEach((btn) => {
 btn.addEventListener("click", () => {
 const item = btn.closest(".faq-item");
 const isOpen = item.classList.contains("open");
 document.querySelectorAll(".faq-item.open").forEach((el) => {
 el.classList.remove("open");
 el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
 });
 if (!isOpen) {
 item.classList.add("open");
 btn.setAttribute("aria-expanded", "true");
 }
 });
 });
 }

 /* ---------- Testimonial auto-slider ---------- */
 function initTestimonials() {
 const track = document.getElementById("testimonial-track");
 const dotsMount = document.getElementById("testimonial-dots");
 if (!track || !dotsMount) return;
 const slides = track.children.length;
 let index = 0;

 for (let i = 0; i < slides; i++) {
 const dot = document.createElement("button");
 if (i === 0) dot.classList.add("active");
 dot.addEventListener("click", () => goTo(i));
 dotsMount.appendChild(dot);
 }

 function goTo(i) {
 index = i;
 track.style.transform = `translateX(-${index * 100}%)`;
 [...dotsMount.children].forEach((d, idx) => d.classList.toggle("active", idx === index));
 }

 let timer = setInterval(() => goTo((index + 1) % slides), 5000);
 track.closest(".testimonial-slider").addEventListener("mouseenter", () => clearInterval(timer));
 track.closest(".testimonial-slider").addEventListener("mouseleave", () => {
 timer = setInterval(() => goTo((index + 1) % slides), 5000);
 });
 }

 /* ---------- Contact form ---------- */
 function initContactForm() {
 const form = document.getElementById("contact-form");
 if (!form) return;
 const submitBtn = document.getElementById("contact-submit");
 const successBox = document.getElementById("contact-success");

 function validateField(field) {
 const wrapper = field.closest(".field");
 const valid = field.checkValidity();
 wrapper.classList.toggle("error", !valid);
 return valid;
 }

 form.querySelectorAll("input, textarea").forEach((f) => {
 f.addEventListener("blur", () => validateField(f));
 });

 form.addEventListener("submit", (e) => {
 e.preventDefault();
 const fields = [...form.querySelectorAll("input, textarea")];
 const allValid = fields.map(validateField).every(Boolean);
 if (!allValid) return;

 submitBtn.classList.add("loading");
 submitBtn.setAttribute("disabled", "true");

 setTimeout(() => {
 submitBtn.classList.remove("loading");
 submitBtn.removeAttribute("disabled");
 form.style.display = "none";
 successBox.classList.add("show");
 }, 1200);
 });
 }

 document.addEventListener("DOMContentLoaded", () => {
 initFaq();
 initTestimonials();
 initContactForm();
 });
})();
