import React, { useRef, useState, useEffect } from "react";
import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/korean"
console.log(layout)
const VirtualKeyboard = (props) =>{
  const {inputValue, onChangeCharacter} = props

  const [layoutMode, setLayoutMode] = useState("default");
  const keyboard = useRef();

  useEffect(() => {
    if (keyboard.current) keyboard.current.setInput(inputValue);
  }, [inputValue]);

  const handleShift = () => {
    setLayoutMode((prev) => (prev === "default" ? "shift" : "default"));
  };

  return (
    <div className="modal-box relative">
      <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layoutMode}
        layout={layout.layout}
        display={layout.display}
        layoutCandidates={layout.layoutCandidates}
        onChange={onChangeCharacter}
        onKeyPress={(button)=>{if (button === "{shift}" || button === "{lock}") handleShift()}}
      />
    </div>
  );
}

export default VirtualKeyboard