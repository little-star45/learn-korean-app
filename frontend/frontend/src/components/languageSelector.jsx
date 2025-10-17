import React from "react";
import { useState } from "react";

const LanguageSelectorModule = (props) =>{
    const {setPrimaryLanguage, setSecondaryLanguage, transcripts} = props

  return (
    <>
        <p className=' text-nowrap'>Znam</p>
            <select className="select" placeholder='Pick a language' onChange={(e)=>setPrimaryLanguage(e.target.value)}>
                {transcripts.map(t=>(<option>{t.name}</option>))}
            </select>
            <p className=' text-nowrap'>Uczę się</p>
            <select className="select" placeholder='Pick a language' onChange={(e)=>setSecondaryLanguage(e.target.value)}>
                {transcripts.map(t=>(<option>{t.name}</option>))}
        </select>
    </>
  );
}

export default LanguageSelectorModule