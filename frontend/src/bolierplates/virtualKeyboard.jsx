import React, { useRef, useState } from "react";
import { KeyboardReact as Keyboard } from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/korean"

const VirtualKeyboard = (props) =>{
  const {inputValue, onChangeCharacter} = props

  const [layoutMode, setLayoutMode] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    onChangeCharacter(input);
  };

  const handleShift = () => {
    setLayoutMode((prev) => (prev === "default" ? "shift" : "default"));
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div className="modal-box relative">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layoutMode}
        layout={layout.layout}
        display={layout.display}
        layoutCandidates={layout.layoutCandidates}
        onChange={onChange}
        onKeyPress={(button)=>{if (button === "{shift}" || button === "{lock}") handleShift()}}
      />
    </div>
  );
}

export default VirtualKeyboard