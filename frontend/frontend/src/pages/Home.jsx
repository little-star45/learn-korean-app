import { useState, useEffect, useRef } from 'react'
import VirtualKeyboard from '../components/virtualKeyboard'
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

    const [primaryLanguage, setPrimaryLanguage] = useState(undefined)
    const [secondaryLanguage, setSecondaryLanguage] = useState(undefined)
    
    const modalKeyboardRef = useRef(null);

    const [inputValues, setInputValues] = useState(["", ""])
    const [activeIndex, setActiveIndex] = useState(null)
    const keyboardInputRefs = useRef(null)

    const onFocusInput = (index) => {
        setActiveIndex(index)
    };


    useEffect(()=>
        {fetchTranscriptOptions()}
    ,[])

    const toggleModalKeyboard = () => {
        if (modalKeyboardRef.current){
            modalKeyboardRef.current.showModal()
        }
    }

    return (
        <>
        <main className='flex flex-col gap-4'>

            <dialog 
                ref={modalKeyboardRef}
                className="modal modal-bottom"
            >
                <VirtualKeyboard/>
            </dialog>

            <section className='flex flex-row gap-2 items-center space-x-3 border-2 border-cyan-600 rounded-md p-4 '>
                <LanguageSelectorModule 
                    setPrimaryLanguage={setPrimaryLanguage} 
                    setSecondaryLanguage={setSecondaryLanguage} 
                    transcripts={transcripts}
                /> 
            </section>

            <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
                <AddTranslationModule 
                    primaryLanguage={primaryLanguage} 
                    secondaryLanguage={secondaryLanguage} 
                    toggleModalKeyboard={toggleModalKeyboard} 
                    keyboardInputRefs={keyboardInputRefs} 
                    inputValues={inputValues}
                />
            </section>

            <section className='space-y-4 border-2 border-amber-500 rounded-md p-4 '>
                <DrawCardModule 
                    secondaryLanguage={secondaryLanguage} 
                    primaryLanguage={primaryLanguage}
                />
            </section>       
        </main>
        
        </>
    )
}

export default HomePage