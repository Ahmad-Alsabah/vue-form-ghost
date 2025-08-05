let globalOptions = {};

function applyGhostEffect(el, options = {}) {
  const finalOptions = { ...globalOptions, ...options };

  if (finalOptions.themeClass) {
    el.classList.add(finalOptions.themeClass);
  }

  if (
    !el.classList.contains("form-control") &&
    !el.classList.contains("input")
  ) {
    el.classList.add("vfg-base");
  }

  const underline = document.createElement("span");
  underline.className = "vfg-underline";
  el.parentNode.insertBefore(underline, el.nextSibling);

  const successIcon = document.createElement("span");
  successIcon.className = "vfg-success";
  successIcon.innerHTML = "✓";
  successIcon.style.display = "none";
  el.parentNode.insertBefore(successIcon, underline.nextSibling);

  const lang = (document.documentElement.lang || navigator.language || "en")
    .toLowerCase()
    .startsWith("ar")
    ? "ar"
    : "en";

  const messages = {
    ar: "هذا الحقل مطلوب",
    en: "This field is required",
    ...(finalOptions.errorMessages || {}),
  };

  const errorMsg = document.createElement("div");
  errorMsg.className = "vfg-error-msg";
  errorMsg.innerText = messages[lang] || messages["en"];
  errorMsg.style.display = "none";
  el.parentNode.insertBefore(errorMsg, successIcon.nextSibling);

  const id = el.getAttribute("id");
  if (id) {
    const label = document.querySelector('label[for="' + id + '"]');
    if (label) {
      label.classList.add("vfg-label");
      if (document.dir === "rtl" || finalOptions.rtl) {
        label.style.left = "auto";
        label.style.right = "10px";
      }
      el.addEventListener("focus", () =>
        label.classList.add("vfg-label-active")
      );
      el.addEventListener("blur", () => {
        if (!el.value) label.classList.remove("vfg-label-active");
      });
    }
  }

  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark) {
    el.style.borderBottomColor = "#aaa";
    if (id) {
      const label = document.querySelector('label[for="' + id + '"]');
      if (label) label.style.color = "#ccc";
    }
    successIcon.style.color = "#0f0";
  }

  el.addEventListener("blur", () => {
    if (el.required && !el.value) {
      el.classList.add("vfg-error");
      errorMsg.style.display = "block";
      successIcon.style.display = "none";
    } else {
      el.classList.remove("vfg-error");
      errorMsg.style.display = "none";
      successIcon.style.display = el.value ? "inline" : "none";
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
  mounted(el, binding) {
    applyGhostEffect(el, binding?.value);
  },
  inserted(el, binding) {
    applyGhostEffect(el, binding?.value);
  },
};

export default {
  install(appOrVue, options = {}) {
    globalOptions = options;

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
