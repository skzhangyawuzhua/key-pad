// src/index.css
var src_default = ".keyboard_container {\n    box-sizing: border-box;\n\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: 32px repeat(4, 1fr);\n  \n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  \n    width: 100%;\n    height: 38vh;\n  \n    background-color: rgb(247, 247, 247);\n  \n    z-index: 99;\n  \n    --gap_px: 10px;\n  \n    padding: 0px var(--gap_px) var(--gap_px);\n    row-gap:  var(--gap_px);\n    column-gap: var(--gap_px);\n  \n    transition: all 0.4s linear;\n    transform-origin: bottom;\n}\n\n.close {\n    transform: rotate(180deg) scaleX(2.5);\n    grid-column: span 4;\n    font-size: 24px;\n    color: #aaaaaa;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n}\n\n.zero {\n    grid-column-start: span 2;\n}\n\n.confirm {\n    grid-row-start: span 3;\n    background-color: #f6a97a;\n    color: white;\n}\n\n.positive {\n    background-color: #ff6505;\n}\n\n.hide {\n    height: 0 !important;\n    bottom: -30px;\n}\n\nbutton {\n    box-sizing: border-box;\n    border:none;\n    border-radius: 8px;\n}";

// src/index.ts
var template = `
    <div id='keypad-template'>
        // <slot name="keypad-content">keypad content</slot>

        <div class='keyboard_container hide'>

            <div class='close' id='close'>^</div>

            <button data-val='1'>
              1
            </button>
    
            <button data-val='2'>
              2
            </button>
    
            <button data-val='3'>
              3
            </button>
    
            <button data-val=undefined>
              \u5220\u9664
            </button>
    
            <button data-val='4'>
              4
            </button>
    
            <button data-val='5'>
              5
            </button>
    
            <button data-val='6'>
              6
            </button>
    
            <button class='confirm'>
              \u786E\u5B9A
            </button>
    
            <button data-val='7'>
              7
            </button>
    
            <button data-val='8'>
              8
            </button>
    
            <button data-val='9'>
              9
            </button>
    
            <button data-val='0' class="zero">
              0
            </button>
    
            <button data-val='.'>
              .
            </button>
        </div>
    </div>
`;
var Keypad = class extends HTMLElement {
  constructor() {
    super();
    this.keyboard_container = null;
    this.current_val = "";
    this.callback = null;
    const shadowRoot = this.attachShadow({ mode: "open" });
    const wrap = document.createElement("div");
    const style = document.createElement("style");
    const parser = new DOMParser();
    const el = parser.parseFromString(template, "text/html").querySelector("#keypad-template");
    if (!el) {
      return;
    }
    wrap.appendChild(el.cloneNode(true));
    this.keyboard_container = wrap.querySelector(
      ".keyboard_container"
    );
    style.textContent = src_default;
    const btn_arr = wrap.querySelectorAll("button[data-val]");
    btn_arr.forEach(
      (button) => button.addEventListener("click", this.handleClick.bind(this))
    );
    const close_btn = wrap.querySelector("#close");
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    close_btn?.addEventListener("click", this.hide);
    const confirm_btn = wrap.querySelector(".confirm");
    console.log("confirm_btn ", confirm_btn);
    confirm_btn?.addEventListener("click", this.hide);
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(wrap);
  }
  handleClick(e) {
    if (!e.target) {
      return;
    }
    const val = e.target.dataset.val;
    this.current_val = this.solve(val);
    if (this.callback) {
      this.callback(this.current_val);
    }
  }
  solve(arg) {
    let pre = this.current_val;
    if (!arg || arg === "undefined") {
      pre = pre.substring(0, pre.length - 1);
      return pre;
    }
    if (pre.length > 10) {
      return pre;
    }
    if (arg === "." && (pre.indexOf(".") !== -1 || !pre)) {
      return pre;
    }
    pre += arg;
    return pre;
  }
  handleConfirm() {
    console.log("confirm");
  }
  hide() {
    console.log("hide ", this);
    this.keyboard_container?.classList.add("hide");
  }
  show() {
    this.keyboard_container?.classList.remove("hide");
  }
  //使用 Proxy?
  setCallback(fn) {
    console.log("setCallback");
  }
};
customElements.define("key-pad", Keypad);
