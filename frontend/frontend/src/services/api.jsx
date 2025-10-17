const apiUrl = import.meta.env.VITE_API_URL

export const getlanguages = async () => {
    const response = await fetch(`${apiUrl}/languages/`)
    const result = await response.json()
    return result
}

export const getRandomTranslation = async(props) =>{
    const {translationCode} = props
        const response = await fetch(`${apiUrl}/translations/random?user_id=1&direction_code=${translationCode}&limit=1`,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            }
        )
        const result = await response.json()
        return result
}
