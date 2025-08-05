function applyGhostEffect(el) {
  el.classList.add("vfg-base");

  const underline = document.createElement("span");
  underline.className = "vfg-underline";
  el.parentNode.insertBefore(underline, el.nextSibling);

  el.addEventListener("blur", () => {
    if (el.required && !el.value) {
      el.classList.add("vfg-error");
    } else {
      el.classList.remove("vfg-error");
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
