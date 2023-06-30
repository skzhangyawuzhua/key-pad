// src/index.css
var src_default = ".hide {\n    height: 0 !important;\n    bottom: -30px;\n}  ";

// src/index.ts
var template = `
    <template id='keypad-template'>
        <slot name="keypad-content">keypad content</slot>

        <div
            class='keyboard_container'
            onclick={e => e.stopPropagation()}
        >
            <button
            // onclick='handleClick("1")'
            >
            1
            </button>
    
            <button
            onclick='handleClick("2")'
            >
            2
            </button>
    
            <button
            onclick='handleClick("3")'
            >
            3
            </button>
    
            <button
            onclick='handleClick(undefined)'
            >
            \u5220\u9664
            </button>
    
            <button
            onclick='handleClick("4")'
            >
            4
            </button>
    
            <button
            onclick='handleClick("5")'
            >
            5
            </button>
    
            <button
            onclick='handleClick("6")'
            >
            6
            </button>
    
            <button class='confirm' onclick='handleConfirm()'>
            \u786E\u5B9A
            </button>
    
            <button
            onclick='handleClick("7")'
            >
            7
            </button>
    
            <button
            onclick='handleClick("8")'
            >
            8
            </button>
    
            <button
            onclick='handleClick("9")'
            >
            9
            </button>
    
            <button
            className="zero"
            onclick='handleClick("0")'
            >
            0
            </button>
    
            <button
            onclick='handleClick(".")'
            >
            .
            </button>
        </div>
    </template>
`;
var Keypad = class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const wrap = document.createElement("div");
    const style = document.createElement("style");
    const parser = new DOMParser();
    const el = parser.parseFromString(template, "text/html").querySelector("#keypad-template");
    if (!el) {
      return;
    }
    wrap.appendChild(el.cloneNode(true));
    style.textContent = src_default;
    shadowRoot.appendChild(wrap);
  }
  handleClick(arg) {
    console.log("arg ", arg);
  }
  handleConfirm() {
    console.log("confirm");
  }
};
customElements.define("key-pad", Keypad);
