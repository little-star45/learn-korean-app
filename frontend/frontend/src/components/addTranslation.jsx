import React from "react";
import { useState } from "react";

const AddTranslationModule = (props) =>{
    const {primaryLanguage, secondaryLanguage, toggleModalKeyboard, keyboardInputRefs, inputValues} = props

  return (
    <>
        <p className="text-3xl font-bold">
            Add translation to list
        </p>
        <article className='space-y-2'>
            <div className='flex items-center space-x-2 justify-between mx-17'>
                <p>{primaryLanguage}</p>
                <p>{secondaryLanguage}</p>
                
            </div>
            <div className='flex flex-row space-x-6'>
                <input type="text" placeholder="Type here" class="input" ref={keyboardInputRefs} value={inputValues[0]}/>
                <input type="text" placeholder="Type here" class="input" />
            </div>
        </article>
        <footer className='flex justify-end gap-4 align-baseline'>
            <button class="btn w-48 rounded-full bg-amber-700 text-white">Submit</button>
            <button class="btn w-24 rounded-full bg-green-700 text-white p-4" onClick={()=>(toggleModalKeyboard())}>Keyboard</button>
        </footer>
    </>
  );
}

export default AddTranslationModule