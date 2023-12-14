var n=`.keyboard_container {
    --c: #f6a97a;
    color: #666666;
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
    transform: scaleY(0.1) translateY(38vh);
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
}`;var d=`

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
`,i=class extends HTMLElement{constructor(){super();this.keyboard_container=null;this.current_val="";this.callback=null;let a=this.attachShadow({mode:"open"}),t=document.createElement("style"),e=new DOMParser().parseFromString(d,"text/html").querySelector("#keypad-template");if(!e)return;this.keyboard_container=e,t.textContent=n,e.querySelectorAll("div[data-val]").forEach(r=>r.addEventListener("click",this.handleClick.bind(this)));let s=e.querySelector("#close");this.hide=this.hide.bind(this),this.show=this.show.bind(this),s?.addEventListener("click",this.hide),e.querySelector(".confirm")?.addEventListener("click",this.hide),a.appendChild(t),a.appendChild(e)}handleClick(a){if(!a.target)return;let t=a.target.dataset.val;this.current_val=this.solve(t),this.callback&&this.callback(this.current_val)}solve(a){let t=this.current_val;return!a||a==="undefined"?(t=t.substring(0,t.length-1),t):(t.length>10||a==="."&&(t.indexOf(".")!==-1||!t)||(t+=a),t)}handleConfirm(){console.log("confirm")}hide(){console.log("hide ",this),this.keyboard_container?.classList.add("hide")}show(){this.keyboard_container?.classList.remove("hide")}setCallback(a){this.callback=a}};customElements.define("key-pad",i);
