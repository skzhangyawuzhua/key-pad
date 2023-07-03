var o=`.keyboard_container {
    --c: #f6a97a;

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
    box-shadow: 0 -2px 2px #EFEFEF;
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

.close::after{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: .3s;
    box-shadow: 0 0 0 6px var(--c);
}

.close:active::after{
    box-shadow: none;
    opacity: 0.4;
    transition: 0s;
}

.zero {
    grid-column-start: span 2;
}

.confirm {
    grid-row-start: span 3;
    background-color: #f6a97a !important;
    color: white;
}

.positive {
    background-color: var(--c);
}

.hide {
    height: 0 !important;
    bottom: -30px;
}

.btn{
    box-sizing: border-box;
    border-radius: 8px;
    position: relative;
    box-shadow: none;
    background-color: #EFEFEF;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.btn::after{
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: 0.2s;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.btn:active::after{
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
}`;var l=`
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
`,a=class extends HTMLElement{constructor(){super();this.keyboard_container=null;this.current_val="";this.callback=null;let e=this.attachShadow({mode:"open"}),t=document.createElement("div"),i=document.createElement("style"),n=new DOMParser().parseFromString(l,"text/html").querySelector("#keypad-template");if(!n)return;t.appendChild(n.cloneNode(!0)),this.keyboard_container=t.querySelector(".keyboard_container"),i.textContent=o,t.querySelectorAll("div[data-val]").forEach(s=>s.addEventListener("click",this.handleClick.bind(this)));let r=t.querySelector("#close");this.hide=this.hide.bind(this),this.show=this.show.bind(this),r?.addEventListener("click",this.hide),t.querySelector(".confirm")?.addEventListener("click",this.hide),e.appendChild(i),e.appendChild(t)}handleClick(e){if(!e.target)return;let t=e.target.dataset.val;this.current_val=this.solve(t),this.callback&&this.callback(this.current_val)}solve(e){let t=this.current_val;return!e||e==="undefined"?(t=t.substring(0,t.length-1),t):(t.length>10||e==="."&&(t.indexOf(".")!==-1||!t)||(t+=e),t)}handleConfirm(){console.log("confirm")}hide(){console.log("hide ",this),this.keyboard_container?.classList.add("hide")}show(){this.keyboard_container?.classList.remove("hide")}setCallback(e){console.log("setCallback")}};customElements.define("key-pad",a);
