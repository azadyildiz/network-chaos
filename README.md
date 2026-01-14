
# 😈 Network Chaos

> **Zero-Config Network Simulation for Frontend Developers.**

[![npm version](https://img.shields.io/npm/v/network-chaos?color=blue&style=flat-square)](https://www.npmjs.com/package/network-chaos)
[![npm downloads](https://img.shields.io/npm/dm/network-chaos?style=flat-square)](https://www.npmjs.com/package/network-chaos)
[![bundle size](https://img.shields.io/bundlephobia/minzip/network-chaos?style=flat-square)](https://bundlephobia.com/package/network-chaos)
[![license](https://img.shields.io/npm/l/network-chaos?style=flat-square)](./LICENSE)

**Network Chaos** is a developer tool that intercepts `fetch` and `XMLHttpRequest` (Axios) requests to simulate **latency** (lag) and **network errors**.

It helps you verify your application's resilience:

* ⏳ Do loading spinners show up correctly?
* 🛑 Does the app crash when the API fails?
* 🛡️ Is the error handling user-friendly?

---

## ✨ Features

* **🛡️ Safety First:** Works **ONLY** on allowed domains (default: `localhost`). Automatically disables itself in production.
* **⚡ Zero Config:** Just install and import. No complex setup required.
* **🌍 Universal:** Works with **React, Vue, Next.js, Angular, Svelte**, and **Vanilla JS**.
* **🧠 Smart Filters:** Automatically ignores static assets (images, CSS, fonts) to keep your UI intact.
* **📦 Lightweight:** Tiny bundle size, written in TypeScript.

---

## 🚀 Installation

Install it as a dev dependency:

```bash
npm install network-chaos --save-dev
# or
yarn add network-chaos --dev
# or
pnpm add -D network-chaos
```

---

## 🛠 Quick Start

### 1. Generate Config

Run the CLI to generate a `chaos.config.json` file in your project root.

```bash
npx network-chaos
```

*This creates a config file with default settings (1.5s delay, 10% error rate).*

### 2. Import

Import the package **once** in your main entry file (`main.tsx`, `index.js`, `App.tsx`, etc.).

```typescript
// main.tsx or App.tsx
import 'network-chaos';

// That's it! Your network requests are now chaotic. 😈
```

---

## ⚙️ Configuration

You can customize the chaos behavior in `chaos.config.json`:

```json
{
  "enabled": true,
  "domains": ["localhost", "127.0.0.1"],
  "delay": 1500,
  "errorRate": 0.1,
  "includes": [],
  "excludes": [".png", ".jpg", ".css", "node_modules"]
}
```

### Options

| Option        | Type         | Default           | Description                                                                            |
| :------------ | :----------- | :---------------- | :------------------------------------------------------------------------------------- |
| `enabled`   | `boolean`  | `true`          | Master switch to turn chaos on/off.                                                    |
| `domains`   | `string[]` | `["localhost"]` | **Safety Net:** Chaos only runs if `window.location.hostname` is in this list. |
| `delay`     | `number`   | `1500`          | Latency added to requests in milliseconds.                                             |
| `errorRate` | `number`   | `0.1`           | Probability of error (0.0 - 1.0).`0.1` means 10% failure.                            |
| `includes`  | `string[]` | `[]`            | Specific URL patterns to target (e.g.,`["/api"]`). If empty, targets all.            |
| `excludes`  | `string[]` | `[...]`         | URL patterns to ignore (e.g.,`[".png"]`). Keeps your UI assets fast.                 |

---

## 🛡️ Production Safety

You might worry: *"What if I accidentally ship this to production?"*

**Don't panic.** Network Chaos includes a runtime safety check:

1. It reads `window.location.hostname`.
2. If the domain is **NOT** in your `domains` allowlist (e.g., `www.myapp.com`), it **disables itself immediately**.
3. It performs **0** interceptions and adds **0** latency.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Azad Yıldız**

* Github: [@azadyildiz](https://github.com/azadyildiz)
* LinkedIn: [Azad Yıldız](https://www.linkedin.com/in/azadyildiz/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.
