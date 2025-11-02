import React from "react";
import { useState, useRef } from "react";
import { postNewTranslation } from "../services/api";
import * as hangulRomanization from 'hangul-romanization';
import * as hangul from 'hangul-js';
import { useLanguage } from "../contexts/LanguageContext";

// const assembled = hangul.assemble(['ㅇ','ㅣ','ㄴ','ㅣ','ㅇ','ㅛ']); // -> "이니요"
// const roman = hangulRomanization.convert(assembled); // -> "iniyo"
// console.log(roman);

import VirtualKeyboard from "./virtualKeyboard";

const AddTranslationModule = (props) =>{
    const { primaryLanguage, secondaryLanguage } = useLanguage();

    const toggleModalKeyboard = () => {
        if (modalKeyboardRef.current){
            modalKeyboardRef.current.showModal()
        }
    }

    const jamoToCompatibility = (text) => {
  const map = {
    'ᄀ': 'ㄱ', 'ᄁ': 'ㄲ', 'ᄂ': 'ㄴ', 'ᄃ': 'ㄷ', 'ᄄ': 'ㄸ', 'ᄅ': 'ㄹ',
    'ᄆ': 'ㅁ', 'ᄇ': 'ㅂ', 'ᄈ': 'ㅃ', 'ᄉ': 'ㅅ', 'ᄊ': 'ㅆ', 'ᄋ': 'ㅇ',
    'ᄌ': 'ㅈ', 'ᄍ': 'ㅉ', 'ᄎ': 'ㅊ', 'ᄏ': 'ㅋ', 'ᄐ': 'ㅌ', 'ᄑ': 'ㅍ', 'ᄒ': 'ㅎ',
    'ᅡ': 'ㅏ', 'ᅢ': 'ㅐ', 'ᅣ': 'ㅑ', 'ᅤ': 'ㅒ', 'ᅥ': 'ㅓ', 'ᅦ': 'ㅔ',
    'ᅧ': 'ㅕ', 'ᅨ': 'ㅖ', 'ᅩ': 'ㅗ', 'ᅪ': 'ㅘ', 'ᅫ': 'ㅙ', 'ᅬ': 'ㅚ',
    'ᅭ': 'ㅛ', 'ᅮ': 'ㅜ', 'ᅯ': 'ㅝ', 'ᅰ': 'ㅞ', 'ᅱ': 'ㅟ', 'ᅲ': 'ㅠ',
    'ᅳ': 'ㅡ', 'ᅴ': 'ㅢ', 'ᅵ': 'ㅣ',
    'ᆨ': 'ㄱ', 'ᆩ': 'ㄲ', 'ᆪ': 'ㄳ', 'ᆫ': 'ㄴ', 'ᆬ': 'ㄵ', 'ᆭ': 'ㄶ',
    'ᆮ': 'ㄷ', 'ᆯ': 'ㄹ', 'ᆰ': 'ㄺ', 'ᆱ': 'ㄻ', 'ᆲ': 'ㄼ', 'ᆳ': 'ㄽ',
    'ᆴ': 'ㄾ', 'ᆵ': 'ㄿ', 'ᆶ': 'ㅀ', 'ᆷ': 'ㅁ', 'ᆸ': 'ㅂ', 'ᆹ': 'ㅄ',
    'ᆺ': 'ㅅ', 'ᆻ': 'ㅆ', 'ᆼ': 'ㅇ', 'ᆽ': 'ㅈ', 'ᆾ': 'ㅊ', 'ᆿ': 'ㅋ',
    'ᇀ': 'ㅌ', 'ᇁ': 'ㅍ', 'ᇂ': 'ㅎ'
  };

  return text
    .split('')
    .map(char => map[char] || char)
    .join('');
};

     const modalKeyboardRef = useRef(null);
    
    const [inputValues, setInputValues] = useState({
        fromText: "",
        toText: ""
    });
    const [activeKey, setActiveKey] = useState(null);
    const keyboardInputRefs = useRef(null)

    const onFocusInput = (key) => {
        setActiveKey(key)
    };

    const handleKeyboardChange = (newVal) => {
        setInputValues(prev => ({ ...prev, [activeKey]: newVal }));
    }

    const submitTranslation = (primaryLanguage, secondaryLanguage, fromText, toText, user_id=1) => {

        console.log(primaryLanguage, secondaryLanguage, fromText, toText)
        const fromRoman = primaryLanguage === 'Korean'? hangulRomanization.convert(hangul.assemble(jamoToCompatibility(toText))): fromText
        const toRoman = secondaryLanguage == 'Korean'? hangulRomanization.convert(hangul.assemble(jamoToCompatibility(toText))): toText

        

        const translationData = {
            from_word: {
                text: fromText,
                romanization: fromRoman,
                language_code: primaryLanguage==='Korean'?'ko': primaryLanguage==='English'? en : 'pl'
            },
            to_word: {
                text: toText,
                romanization: toRoman,
                language_code: secondaryLanguage==='Korean'?'ko': secondaryLanguage==='English'? en : 'pl'
            },
            is_public: false,
            user_id: user_id
            };

        postNewTranslation({translationData:translationData})
    }

  return (
    <>
            <dialog 
                ref={modalKeyboardRef}
                className="modal modal-bottom"
            >
                <VirtualKeyboard
                    inputValue={activeKey ? inputValues[activeKey] : ""}
                    onChangeCharacter={handleKeyboardChange}
                />

            </dialog>
        <p className="text-3xl font-bold">
            Add translation to list
        </p>
        <article className='space-y-2'>
            <div className='flex items-center space-x-2 justify-between mx-17'>
                <p>{primaryLanguage}</p>
                <p>{secondaryLanguage}</p>
                
            </div>
            <div className='flex flex-row space-x-6'>
                <input
                    className={`${activeKey==="fromText" ? 'border-2 border-blue-500 bg-amber-50' : ''} input`}
                    type="text" 
                    placeholder="Type here" 
                    ref={keyboardInputRefs}
                    onFocus = {()=>onFocusInput("fromText")}
                    value={inputValues.fromText}
                    onChange={(e) => handleKeyboardChange(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Type here" 
                    className={`${activeKey==="toText" ? 'border-2 border-blue-500 bg-amber-50' : ''} input`} 
                    ref={keyboardInputRefs}
                    onFocus = {()=>onFocusInput("toText")}
                    value={inputValues.toText}
                    onChange={(e) => handleKeyboardChange(e.target.value)}
                />
            </div>
        </article>
        <footer className='flex justify-end gap-4 align-baseline'>
            <button class="btn w-48 rounded-full bg-amber-700 text-white" onClick={()=>(
                submitTranslation(                    
                    primaryLanguage, 
                    secondaryLanguage,
                    inputValues.fromText,
                    inputValues.toText
                ))}
                    >
                        Submit
                    </button>
            <button class="btn w-24 rounded-full bg-green-700 text-white p-4" onClick={()=>(toggleModalKeyboard())}>Keyboard</button>
        </footer>
    </>
  );
}

export default AddTranslationModule