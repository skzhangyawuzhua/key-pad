import React from "react";
import { ComponentCustomProperties } from "vue";

export interface KeypadProps {
  show: () => void;
  setCallback: (fn: (str: string) => void) => void;
}

interface KeypadElement extends HTMLElement, KeypadProps {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "key-pad": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        KeypadElement
      >;
    }
  }
}
