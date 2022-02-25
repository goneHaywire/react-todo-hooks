import { useState, useEffect } from 'react'

const useTheme = (initialTheme) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? initialTheme)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        !storedTheme ?? localStorage.setItem('theme', theme)
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)

        return () => localStorage.setItem('theme', theme)
    }, [theme])

    return [theme, setTheme]
}

export default useTheme
