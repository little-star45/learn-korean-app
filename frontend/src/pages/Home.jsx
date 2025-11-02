import { useState, useEffect} from 'react'
import DrawCardModule from '../components/drawCard'

import { getlanguages } from '../services/api'

import LanguageSelectorModule from '../components/languageSelector'
import AddTranslationModule from '../components/addTranslation'

const HomePage = () => {
    const [transcripts, setTranscripts] = useState([])

    const fetchTranscriptOptions = async () => {
        const response = await getlanguages()
        setTranscripts(response)
    }

    useEffect(()=>{
        fetchTranscriptOptions()
    }
    ,[])


    return (
        <>
        <main className='flex flex-col gap-4'>

            <section className='flex flex-row gap-2 items-center space-x-3 border-2 border-cyan-600 rounded-md p-4 '>
                <LanguageSelectorModule transcripts={transcripts}/> 
            </section>

            <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
                <AddTranslationModule/>
            </section>

            <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
                <DrawCardModule/>
            </section>       
        </main>
        
        </>
    )
}

export default HomePage