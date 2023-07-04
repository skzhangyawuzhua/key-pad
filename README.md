# key-pad

### 基于 webcomponent 的数字键盘

    - 给予用户在移动端支付等场景下优于原生键盘的体验
    - 解决移动端在某些场景下，键盘无法弹起并自动聚焦的问题

<img src='https://github.com/skzhangyawuzhua/key-pad/assets/44012317/162d8cd8-5fca-4c44-851f-6310c18b91ad' width='300px' />

### 使用方法

    npm install @zhangyawuzhua/key-pad

#### 类型声明

    interface KeypadProps {
      show: () => void;
      setCallback: (fn: (str: string) => void) => void;
    }

#### React示例

```typescript
    import "@zhangyawuzhua/key-pad";
    import { KeypadProps } from "@zhangyawuzhua/key-pad";

    const App = ()=>{
     const keypadRef = useRef<KeypadProps | null>(null);

      const show = () => {
        keypadRef.current?.show();
      };

      const [val, setVal] = useState("");

      return (
        <div>
            <button onClick={show}>弹出键盘</button>
            <div>输入的值: {val}</div>

            <key-pad
              ref={ref => {
                if (!ref) {
                  return;
                }
                keypadRef.current = ref;
                keypadRef.current?.setCallback((arg: string) => {
                  setVal(arg);
                });
              }}
            ></key-pad>
        </div>
      );
    }

```

#### Vue示例

```typescript
    <template>
      <button @click="show()">弹出键盘</button>
      <div>{{ keyPadVal }}</div>
      <key-pad ref="keyPadRef"></key-pad>
    </template>

    <script lang="ts" setup>
    import Vue, { ref, onMounted } from 'vue';
    import '@zhangyawuzhua/key-pad';
    import type { KeypadProps } from '@zhangyawuzhua/key-pad';

    const keyPadRef = ref<KeypadProps | null>(null);

    const show = () => {
      keyPadRef.value?.show();
    };

    const keyPadVal = ref('');

    onMounted(() => {
      keyPadRef.value?.setCallback((arg) => {
        keyPadVal.value = arg;
      });
    });
    </script>
```

#### 原生:

```javascript
    <script>
      const keypad = document.querySelector("key-pad");
  
      const open_btn = document.querySelector("#open_btn");
  
      open_btn.addEventListener("click", () => keypad.show());

      const callback = arg => {
        const el = document.querySelector("#keypad_val");
        el.innerHTML = arg;
      };
  
      keypad.setCallback(callback);
    </script>

    html中: 
    <key-pad></key-pad>


```
