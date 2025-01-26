import React, { useEffect, useState } from 'react'
import { FiLink, FiSettings } from 'react-icons/fi'
import { GiRollingDices } from 'react-icons/gi'
import Button from '../components/button'
import Modal from './modal'
import copy from 'copy-to-clipboard';
import { AiOutlineCopy } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'

function Form() {

    const [url, setUrl] = useState('')
    const [slug, setSlug] = useState('')
    const [linkError, setLinkError] = useState(null || '')
    const [slugError, setSlugError] = useState(null || '')
    const [ open, setOpen ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if(open){
            setLoading(false)
        }
    }, [open])

    const handleRandomize = () => {
        const random = Math.random().toString(36).substring(2,8)
        setSlug(random);
        return random;
    }

    const checkLink = async () => {
        const response = await fetch(`/api/checkLink`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        })
        const result = await response.json();
        if (response && result && result.safe && result.safe  === true) {
            return true
        } else if (response && result && result.safe &&  result.safe === false) {
            setLinkError('The given link is unsafe!')
            setLoading(false)
            return false
        }
        else if(response && result && result.message === 'Link already exists!'){
            setSlug(result.link)
            setLoading(false)
            setOpen(true)
            setLinkError(result.message)
        }
        else {
            setLinkError(result.message)
            setLoading(false)
            return false
        }
    }

    const checkSlug = async (toCheckSlug: string) => {
        const response = await fetch(`/api/checkSlug/${toCheckSlug}`)
        const result = await response.json();
        if (response && result && result.message === 'success') {
            return true
        } else {
            setSlugError(result.message)
            setLoading(false)
            return false
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (url.length > 0) {
            if(!url.toLowerCase().startsWith('http')){
                setLinkError("Please include http|https")
                setLoading(false)
                return;
            }

            const urlRegex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/i

            if(!urlRegex.test(url)) {
                setLinkError('Please provide a valid link')
                setLoading(false)
                return;
            }

            const acceptUrl = await checkLink();
            if (acceptUrl) {
                let toCheckSlug = '';

                if (slug.length === 0) {
                    toCheckSlug = handleRandomize();
                } else {
                    toCheckSlug = slug
                }

                if(toCheckSlug.length <4) {
                    setSlugError("Slug can't be less than 4 letters!")
                    setLoading(false)
                    return;
                }

                const regex = /^[A-Za-z0-9]*$/i

                if(!regex.test(toCheckSlug)) {
                    setSlugError('Only letters and numbers')
                    setLoading(false)
                    return;
                }

                const acceptSlug = await checkSlug(toCheckSlug.toLowerCase());

                if (acceptSlug) {
                    const response = await fetch('/api/setURL', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            url: url,
                            slug: toCheckSlug.toLowerCase()
                        })
                    })

                    if(response){
                        setOpen(true)
                    }
                    setLoading(false)
                }
            }
        } else {
            setLinkError('Please provide a link');
            setLoading(false)
            return;
        }

    }

    const handleCopy = () => {
        copy(`https://tidyur.link/${slug}`);
    }

    return (
        <>
            <div className='relative shadow-lg rounded-3xl z-10 bg-white p-4 sm:p-8 md:p-16 mb-6'>
                <div className='mb-8'>
                    <h1 className='flex items-center text-lg font-medium mb-2'><span><FiLink className='mx-2' /></span>Enter your long URL here</h1>
                    <input
                        value={url}
                        type="text"
                        className='font-medium rounded-xl p-4 border-2 border-gray-30000 w-80 sm:w-96'
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {linkError &&
                        <p className='text-sm text-red-500 pl-2 pt-1'>{linkError}</p>
                    }
                </div>
                <div className=''>
                    <h1 className='flex items-center text-lg font-medium mb-2'><span><FiSettings className='mx-2' /></span>Customize your link <span className='absolute right-4 sm:right-8 md:right-16' onClick={handleRandomize}><GiRollingDices className='cursor-pointer text-3xl text-btnBrown' /></span></h1>
                    <input type="text" disabled placeholder='www.tidyur.link/' className='placeholder-black font-medium bg-white rounded-l-xl p-4 border-2 border-gray-30000 w-40 sm:w-56' />
                    <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        type="text"
                        className='font-medium rounded-r-xl p-4 border-2 border-gray-30000 w-40'
                    />
                    {slugError &&
                        <p className='text-sm text-red-500 pl-2 pt-1'>{slugError}</p>
                    }
                </div>
                <div className='mt-8 flex justify-end'>
                    <Button onClick={handleSubmit}>
                        {loading ? <ClipLoader size={20} color="#f4f7fd"/> : "Tidy it" }
                    </Button>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen} title='Your Shortened Tidy-URL:'>
                <div className='flex'>
                <input type="text" disabled placeholder={`www.tidyur.link/${slug}`} className='placeholder-black font-medium bg-white rounded-l-xl p-4 border-2 border-gray-30000 w-2/3' />
                    <Button className='rounded-l-none w-1/3' leftIcon={<AiOutlineCopy />} onClick={handleCopy}>
                        Copy
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default Form