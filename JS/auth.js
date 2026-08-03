(function () {
 "use strict";

 function validateField(field) {
 const wrapper = field.closest(".field");
 if (!wrapper) return true;
 const valid = field.checkValidity();
 wrapper.classList.toggle("error", !valid);
 return valid;
 }

 function wireForm(formId, submitBtnId, successId) {
 const form = document.getElementById(formId);
 if (!form) return;
 const submitBtn = document.getElementById(submitBtnId);
 const success = document.getElementById(successId);

 form.querySelectorAll("input, select, textarea").forEach((f) => {
 f.addEventListener("blur", () => validateField(f));
 });

 form.addEventListener("submit", (e) => {
 e.preventDefault();
 const fields = [...form.querySelectorAll("input, select, textarea")];
 const allValid = fields.map(validateField).every(Boolean);
 if (!allValid) {
 const firstError = form.querySelector(".field.error input, .field.error select");
 if (firstError) firstError.focus();
 return;
 }

 submitBtn.classList.add("loading");
 submitBtn.setAttribute("disabled", "true");

 setTimeout(() => {
 submitBtn.classList.remove("loading");
 submitBtn.removeAttribute("disabled");
 form.style.display = "none";
 if (success) success.classList.add("show");
 }, 1200);
 });
 }

 document.addEventListener("DOMContentLoaded", () => {
 wireForm("loginForm", "login-submit", "login-success");
 wireForm("registerForm", "register-submit", "register-success");
 });
})();
