import React from "react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSelectorModule = (props) =>{
  const {transcripts} = props
  const { setPrimaryLanguage, setSecondaryLanguage } = useLanguage();

  return (
    <>
        <p className=' text-nowrap'>Znam</p>
            <select 
              className="select" 
              defaultValue=""
              onChange={(e)=>setPrimaryLanguage(e.target.value)}
            >
              <option value="" disabled selected>
                -- pick --
              </option>
              {transcripts.map(t=>(<option>{t.name}</option>))}
            </select>
            
            <p className=' text-nowrap'>Uczę się</p>
            <select 
              className="select" 
              defaultValue=""
              onChange={(e)=>setSecondaryLanguage(e.target.value)}
            >
              <option value="" disabled selected>
                -- pick --
              </option>
              {transcripts.map(t=>(<option>{t.name}</option>))}
        </select>
    </>
  );
}

export default LanguageSelectorModule