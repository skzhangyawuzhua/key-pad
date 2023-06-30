var r=`.keyboard_container {
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 32px repeat(4, 1fr);
  
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  
    width: 100%;
    height: 38vh;
  
    background-color: rgb(247, 247, 247);
  
    z-index: 99;
  
    --gap_px: 10px;
  
    padding: 0px var(--gap_px) var(--gap_px);
    row-gap:  var(--gap_px);
    column-gap: var(--gap_px);
  
    transition: all 0.4s linear;
    transform-origin: bottom;
}

.close {
    transform: rotate(180deg) scaleX(2.5);
    grid-column: span 4;
    font-size: 24px;
    color: #aaaaaa;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.zero {
    grid-column-start: span 2;
}

.confirm {
    grid-row-start: span 3;
    background-color: #f6a97a;
    color: white;
}

.positive {
    background-color: #ff6505;
}

.hide {
    height: 0 !important;
    bottom: -30px;
}

button {
    box-sizing: border-box;
    border:none;
    border-radius: 8px;
}`;var d=`
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
`,n=class extends HTMLElement{constructor(){super();this.keyboard_container=null;this.current_val="";this.callback=null;let e=this.attachShadow({mode:"open"}),t=document.createElement("div"),o=document.createElement("style"),a=new DOMParser().parseFromString(d,"text/html").querySelector("#keypad-template");if(!a)return;t.appendChild(a.cloneNode(!0)),this.keyboard_container=t.querySelector(".keyboard_container"),o.textContent=r,t.querySelectorAll("button[data-val]").forEach(l=>l.addEventListener("click",this.handleClick.bind(this)));let i=t.querySelector("#close");this.hide=this.hide.bind(this),this.show=this.show.bind(this),i?.addEventListener("click",this.hide),t.querySelector(".confirm")?.addEventListener("click",this.hide),e.appendChild(o),e.appendChild(t)}handleClick(e){if(!e.target)return;let t=e.target.dataset.val;this.current_val=this.solve(t),this.callback&&this.callback(this.current_val)}solve(e){let t=this.current_val;return!e||e==="undefined"?(t=t.substring(0,t.length-1),t):(t.length>10||e==="."&&(t.indexOf(".")!==-1||!t)||(t+=e),t)}handleConfirm(){console.log("confirm")}hide(){console.log("hide ",this),this.keyboard_container?.classList.add("hide")}show(){this.keyboard_container?.classList.remove("hide")}setCallback(e){console.log("setCallback")}};customElements.define("key-pad",n);
