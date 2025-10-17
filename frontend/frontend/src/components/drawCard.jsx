import React from "react";
import { useState } from "react";
import { getRandomTranslation } from "../services/api";

const DrawCardModule = (props) =>{
    const {secondaryLanguage, primaryLanguage} = props
    const [fiszkaOdkryta, setFiszkaOdkryta] = useState(false)
    const [randomWord, setRandomWord] = useState(undefined)

    const fetchRandomWord = async () => {
        const response = await getRandomTranslation({ translationCode: 'pl_ko' })
        setRandomWord(response['to_word']['text'])
    }

  return (
    <>
        <p className="text-3xl font-bold">
            Losuj fiszkę
            </p>
            <article className='space-y-2'>
 
                {fiszkaOdkryta?
                <div className='flex flex-row space-x-6'>
                    <input type="text" placeholder="Type here" class="input" />
                </div>
                :
                <div class="card bg-base-100 w-96 shadow-sm">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{secondaryLanguage}</h2>
                        <figure class="p-10 prose lg:prose-xl">
                            <h2>{randomWord}</h2>
                        </figure>
                        <input type="text" placeholder="Type here" class="input" />
                        <div class="card-actions justify-end w-full space-x-5">
                            <button class="btn btn-secondary">Sprawdź!</button>
                            <button class="btn btn-primary" onClick={()=>{fetchRandomWord()}}>Losu losu</button>
                        </div>
                    </div>
                </div>
                }
            </article>
    </>
  );
}

export default DrawCardModule