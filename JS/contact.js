(function () {
  "use strict";

  function validateField(field) {
    const wrapper = field.closest(".field");
    const valid = field.checkValidity();
    wrapper.classList.toggle("error", !valid);
    return valid;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-page-form");
    if (!form) return;
    const submitBtn = document.getElementById("contact-page-submit");
    const success = document.getElementById("contact-page-success");

    form.querySelectorAll("input, textarea").forEach((f) => {
      f.addEventListener("blur", () => validateField(f));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll("input, textarea")];
      if (!fields.map(validateField).every(Boolean)) return;

      submitBtn.classList.add("loading");
      submitBtn.setAttribute("disabled", "true");

      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.removeAttribute("disabled");
        form.querySelectorAll(".field, button[type=submit]").forEach((el) => (el.style.display = "none"));
        success.classList.add("show");
      }, 1000);
    });
  });
})();
