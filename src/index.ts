//@ts-ignore
import cssContent from "./index.css";

const template = `
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
              删除
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
              确定
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

class Keypad extends HTMLElement {
  keyboard_container: HTMLElement | null = null;
  current_val: string = "";
  callback: ((arg: string) => void) | null = null;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const wrap = document.createElement("div");

    const style = document.createElement("style");

    const parser = new DOMParser();

    const el = parser
      .parseFromString(template, "text/html")
      .querySelector("#keypad-template");

    if (!el) {
      return;
    }

    wrap.appendChild(el.cloneNode(true));

    this.keyboard_container = wrap.querySelector<HTMLElement>(
      ".keyboard_container"
    );

    style.textContent = cssContent;

    const btn_arr = wrap.querySelectorAll("button[data-val]");

    btn_arr.forEach(button =>
      button.addEventListener("click", this.handleClick.bind(this))
    );

    const close_btn = wrap.querySelector("#close");

    this.hide = this.hide.bind(this);

    this.show = this.show.bind(this);

    // this.solve = this.solve.bind(this);

    close_btn?.addEventListener("click", this.hide);

    const confirm_btn = wrap.querySelector(".confirm");

    confirm_btn?.addEventListener("click", this.hide);

    shadowRoot.appendChild(style);

    shadowRoot.appendChild(wrap);
  }

  handleClick(e: Event) {
    if (!e.target) {
      return;
    }

    const val = (e.target as HTMLElement).dataset.val;

    this.current_val = this.solve(val);

    if (this.callback) {
      this.callback(this.current_val);
    }
  }

  solve(arg: string | undefined): string {
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
  setCallback(fn: (str: string) => void) {
    console.log("setCallback");

    // fn();
  }
}

customElements.define("key-pad", Keypad);
