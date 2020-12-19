import { useState, useEffect } from 'react'

const useInfiniteScroll = (ref) => {
    const [ifBottom, setIfBottom] = useState(false)

    useEffect(() => {
        const container = ref.current

        const trackMouse = (e) => {
            if (container.getBoundingClientRect().bottom < 600)
                !ifBottom && setIfBottom(true)
            else {
                !ifBottom && setIfBottom(false)
            }
        }

        setTimeout(() => {
            container && document.addEventListener('scroll', trackMouse)
        }, 1000)

        return () => container && container.removeEventListener('scroll', trackMouse)
    }, [ref])

    return [ifBottom, setIfBottom]
}

export default useInfiniteScroll