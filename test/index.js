// src/index.css
var src_default = ".keyboard_container {\n    --c: #f6a97a;\n\n    box-sizing: border-box;\n\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: 32px repeat(4, 1fr);\n  \n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  \n    width: 100%;\n    height: 38vh;\n  \n    background-color: rgb(247, 247, 247);\n  \n    z-index: 99;\n  \n    --gap_px: 10px;\n  \n    padding: 0px var(--gap_px) var(--gap_px);\n    row-gap:  var(--gap_px);\n    column-gap: var(--gap_px);\n  \n    transition: all 0.4s linear;\n    transform-origin: bottom;\n    box-shadow: 0 -2px 2px #EFEFEF;\n}\n\n.close {\n    transform: rotate(180deg) scaleX(2.5);\n    grid-column: span 4;\n    font-size: 24px;\n    color: #aaaaaa;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n}\n\n.close::after{\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    opacity: 0;\n    transition: .3s;\n    box-shadow: 0 0 0 6px var(--c);\n}\n\n.close:active::after{\n    box-shadow: none;\n    opacity: 0.4;\n    transition: 0s;\n}\n\n.zero {\n    grid-column-start: span 2;\n}\n\n.confirm {\n    grid-row-start: span 3;\n    background-color: #f6a97a !important;\n    color: white;\n}\n\n.positive {\n    background-color: var(--c);\n}\n\n.hide {\n    height: 0 !important;\n    bottom: -30px;\n}\n\n.btn{\n    box-sizing: border-box;\n    border-radius: 8px;\n    position: relative;\n    box-shadow: none;\n    background-color: #EFEFEF;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    user-select: none;\n}\n\n.btn::after{\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    transition: 0.2s;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.btn:active::after{\n    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);\n}";

// src/index.ts
var template = `
    <div id='keypad-template'>

        <div class='keyboard_container hide'>

            <div class='close' id='close'>^</div>

            <div class='btn' data-val='1'>
              1
            </div>
    
            <div class='btn' data-val='2'>
              2
            </div>
    
            <div class='btn' data-val='3'>
              3
            </div>
    
            <div class='btn' data-val=undefined>
              \u5220\u9664
            </div>
    
            <div class='btn' data-val='4'>
              4
            </div>
    
            <div class='btn' data-val='5'>
              5
            </div>
    
            <div class='btn' data-val='6'>
              6
            </div>
    
            <div class='confirm btn '>
              \u786E\u5B9A
            </div>
    
            <div class='btn' data-val='7'>
              7
            </div>
    
            <div class='btn' data-val='8'>
              8
            </div>
    
            <div class='btn' data-val='9'>
              9
            </div>
    
            <div class='btn zero' data-val='0'>
              0
            </div>
    
            <div class='btn' data-val='.'>
              .
            </div>
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
    const btn_arr = wrap.querySelectorAll("div[data-val]");
    btn_arr.forEach(
      (button) => button.addEventListener("click", this.handleClick.bind(this))
    );
    const close_btn = wrap.querySelector("#close");
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    close_btn?.addEventListener("click", this.hide);
    const confirm_btn = wrap.querySelector(".confirm");
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
