# 👻 vue-form-ghost

[![npm](https://img.shields.io/npm/v/vue-form-ghost)](https://www.npmjs.com/package/vue-form-ghost)

A Vue.js directive that adds **elegant, animated input effects** to your forms — including floating labels, error messages, success icons, and smart underline transitions.  
Supports both **Vue 2** and **Vue 3** ✅

---

## ✨ Features

- 🪄 Floating label effect (animated label based on focus and input)
- ❗ Built-in required field validation with error shake
- ✅ Shows success icon automatically on valid input
- 🎨 Smart underline animation on focus
- 🌙 Automatic Dark Mode support based on `prefers-color-scheme`
- 🌐 Multilingual error messages (English / Arabic) based on `navigator.language`
- 🎯 Allows global config with `app.use(VueFormGhost, options)`
- 🧩 Supports theme class for custom styling (`themeClass`)
- 🌀 Compatible with Tailwind / Bootstrap inputs
- ⚙️ Works with both Vue 2 & Vue 3
- 🪶 Tiny & dependency-free

---

## 📦 Installation

```bash
npm install vue-form-ghost
```

---

## 🚀 Usage

### Vue 3

```js
import { createApp } from "vue";
import VueFormGhost from "vue-form-ghost";

const app = createApp(App);
app.use(VueFormGhost, {
  themeClass: "my-theme", // Optional
});
```

### Vue 2

```js
import Vue from "vue";
import VueFormGhost from "vue-form-ghost";

Vue.use(VueFormGhost);
```

---

## 🧪 Example

```html
<div class="form-group">
  <label for="email">Email</label>
  <input id="email" type="email" required v-form-ghost placeholder="Email" />
</div>
```

---

## ⚙️ Options

| Option       | Type     | Description                                 |
| ------------ | -------- | ------------------------------------------- |
| `themeClass` | `string` | Optional custom class applied to each field |

---

## 📁 File Structure

```
vue-form-ghost/
├── dist/              # Compiled plugin (minified)
├── examples/          # Example usage (HTML)
├── src/               # Directive source code
├── package.json
├── README.md
└── rollup.config.js
```

---

## 📜 License

[ISC](LICENSE)
