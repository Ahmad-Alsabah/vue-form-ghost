function applyGhostEffect(el) {
  el.classList.add("vfg-base");

  const underline = document.createElement("span");
  underline.className = "vfg-underline";
  el.parentNode.insertBefore(underline, el.nextSibling);

  const successIcon = document.createElement("span");
  successIcon.className = "vfg-success";
  successIcon.innerHTML = "✓";
  el.parentNode.insertBefore(successIcon, underline.nextSibling);

  const errorMsg = document.createElement("div");
  errorMsg.className = "vfg-error-msg";
  errorMsg.innerText = "هذا الحقل مطلوب";
  el.parentNode.insertBefore(errorMsg, successIcon.nextSibling);

  const id = el.getAttribute("id");
  if (id) {
    const label = document.querySelector('label[for="' + id + '"]');
    if (label) {
      label.classList.add("vfg-label");
      el.addEventListener("focus", () =>
        label.classList.add("vfg-label-active")
      );
      el.addEventListener("blur", () => {
        if (!el.value) label.classList.remove("vfg-label-active");
      });
    }
  }

  el.addEventListener("blur", () => {
    if (el.required && !el.value) {
      el.classList.add("vfg-error");
      errorMsg.style.display = "block";
      successIcon.style.display = "none";
    } else {
      el.classList.remove("vfg-error");
      errorMsg.style.display = "none";
      if (el.value) {
        successIcon.style.display = "inline";
      } else {
        successIcon.style.display = "none";
      }
    }
  });

  el.addEventListener("input", () => {
    if (el.value && el.classList.contains("vfg-error")) {
      el.classList.remove("vfg-error");
      errorMsg.style.display = "none";
    }
  });
}

const directive = {
  mounted(el) {
    applyGhostEffect(el);
  },
  inserted(el) {
    applyGhostEffect(el);
  },
};

export default {
  install(appOrVue) {
    const isVue3 =
      typeof appOrVue.version === "string" && appOrVue.version.startsWith("3");
    if (isVue3) {
      appOrVue.directive("form-ghost", directive);
    } else {
      appOrVue.directive("form-ghost", {
        inserted: directive.inserted,
      });
    }
  },
};
