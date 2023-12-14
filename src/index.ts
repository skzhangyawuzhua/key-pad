//@ts-ignore
import cssContent from "./index.css";

const template = `

        <div class='keyboard_container hide' id='keypad-template'>

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
              删除
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
              确定
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
`;

class Keypad extends HTMLElement {
  keyboard_container: HTMLElement | null = null;
  current_val: string = "";
  callback: ((arg: string) => void) | null = null;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    const parser = new DOMParser();

    const wrap = parser
      .parseFromString(template, "text/html")
      .querySelector("#keypad-template") as HTMLElement;

    if (!wrap) {
      return;
    }

    this.keyboard_container = wrap;

    style.textContent = cssContent;

    const btn_arr = wrap.querySelectorAll("div[data-val]");

    btn_arr.forEach(button =>
      button.addEventListener("click", this.handleClick.bind(this))
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

  setCallback(fn: (str: string) => void) {
    this.callback = fn;
  }
}

customElements.define("key-pad", Keypad);
