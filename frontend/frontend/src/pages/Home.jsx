import { useState, useEffect } from 'react'

function HomePage() {
    const [transcripts, setTranscripts] = useState([])
    const fetchTranscriptOptions = async () => {
        const response = await fetch('http://127.0.0.1:5000/languages/')
        const result = await response.json()
        setTranscripts(result)
    }
    const [fiszkaOdkryta, setFiszkaOdkryta] = useState(false)
    const [primaryLanguage, setPrimaryLanguage] = useState(undefined)
    const [secondaryLanguage, setSecondaryLanguage] = useState(undefined)
    const [randomWord, setRandomWord] = useState(undefined)

    const fetchRandomWord = async () => {
        const response = await fetch(
            `http://127.0.0.1:5000/translations/random?user_id=1&direction_code=${'pl_ko'}&limit=1`,
            {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
            }
        );
        const result = await response.json()
        console.log(result)
        setRandomWord(result['to_word']['text'])
    }

    useEffect(()=>
        {fetchTranscriptOptions()}
    ,[])



    return (
        <>
        <main className='flex flex-col gap-4'>
           <section className='flex flex-row gap-2 items-center space-x-3 border-2 border-cyan-600 rounded-md p-4 '>
            <p className=' text-nowrap'>Znam</p>
            <select className="select" placeholder='Pick a language' onChange={(e)=>setPrimaryLanguage(e.target.value)}>
                {transcripts.map(t=>(<option>{t.name}</option>))}
            </select>
            <p className=' text-nowrap'>Uczę się</p>
            <select className="select" placeholder='Pick a language' onChange={(e)=>setSecondaryLanguage(e.target.value)}>
                {transcripts.map(t=>(<option>{t.name}</option>))}
            </select> 
        </section>
        <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
           <p className="text-3xl font-bold">
            Add translation to list
            </p>
            <article className='space-y-2'>
                <div className='flex items-center space-x-2 justify-between mx-17'>
                    <p>{primaryLanguage}</p>
                    <p>{secondaryLanguage}</p>
                    
                </div>
                <div className='flex flex-row space-x-6'>
                    <input type="text" placeholder="Type here" class="input" />
                    <input type="text" placeholder="Type here" class="input" />
                </div>
            </article>
            
            <button class="btn w-64 rounded-full bg-amber-700 text-white">Button</button>  
        </section>
        <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
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
        </section>
        
        </main>
        
        </>
    )
}

export default HomePage