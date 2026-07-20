(function () {
  const config = window.CARTA_CONFIG || {
    passwordDate: "14/02/2024",
    signature: "— Carlos",
    letterText: "Lorem ipsum dolor sit amet...",
  };

  const gate = document.getElementById("gate");
  const letter = document.getElementById("letter");
  const form = document.getElementById("gate-form");
  const input = document.getElementById("date-input");
  const error = document.getElementById("gate-error");
  const body = document.getElementById("letter-body");
  const sign = document.getElementById("letter-sign");
  const title = document.getElementById("letter-title");
  const petals = document.getElementById("petals");

  if (title && config.title) {
    title.textContent = config.title;
  }
  sign.textContent = config.signature || "— Con amor";

  createPetals();
  setupDateMask();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = normalizeDate(input.value);

    if (value === normalizeDate(config.passwordDate)) {
      error.hidden = true;
      openLetter();
      return;
    }

    error.hidden = false;
    input.classList.add("is-wrong");
    input.focus();
    input.select();
  });

  function openLetter() {
    gate.classList.add("is-leaving");

    window.setTimeout(() => {
      gate.hidden = true;
      letter.hidden = false;
      typeLetter(config.letterText);
    }, 520);
  }

  function typeLetter(text) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      body.textContent = text;
      sign.hidden = false;
      return;
    }

    let index = 0;
    body.innerHTML = '<span class="caret" aria-hidden="true"></span>';

    const tick = () => {
      if (index >= text.length) {
        const caret = body.querySelector(".caret");
        if (caret) caret.remove();
        sign.hidden = false;
        return;
      }

      const char = text.charAt(index);
      const caret = body.querySelector(".caret");
      const node = document.createTextNode(char);
      body.insertBefore(node, caret);
      index += 1;

      const delay =
        char === "\n" ? 280 : char === "." || char === "," ? 90 : 28 + Math.random() * 35;

      window.setTimeout(tick, delay);
    };

    window.setTimeout(tick, 400);
  }

  function setupDateMask() {
    input.addEventListener("input", () => {
      error.hidden = true;
      const digits = input.value.replace(/\D/g, "").slice(0, 8);
      let formatted = digits;

      if (digits.length > 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
      } else if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      }

      input.value = formatted;
    });
  }

  function normalizeDate(value) {
    return String(value || "")
      .trim()
      .replace(/[-.]/g, "/");
  }

  function createPetals() {
    const count = window.matchMedia("(max-width: 600px)").matches ? 10 : 16;

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${7 + Math.random() * 9}s`;
      petal.style.animationDelay = `${Math.random() * 8}s`;
      petal.style.width = `${8 + Math.random() * 8}px`;
      petal.style.height = `${12 + Math.random() * 10}px`;
      petal.style.opacity = `${0.3 + Math.random() * 0.4}`;
      petals.appendChild(petal);
    }
  }
})();
