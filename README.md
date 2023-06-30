# keypad
### -基于 webcomponent 的金额键盘

### 使用方法

####  原生:
```javascript
    <script>
      const keypad = document.querySelector("key-pad");
      
      const open_btn = document.querySelector("#open_btn");
      
      open_btn.addEventListener("click", () => keypad.show());

      // 挂在设置数值的回调函数到 keypad 实例上
      const callback = arg => {
        const el = document.querySelector("#keypad_val");
        el.innerHTML = arg;
      };
      
      keypad.callback = callback;
    </script>

    html中: 
    <key-pad></key-pad>


```
![keypad1](https://github.com/skzhangyawuzhua/keypad/assets/44012317/3ba7d45b-3949-4514-ad83-863e12d169da)

