import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Form from '../components/form'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Tidy-URL : URL Shortener - Create Custom Short Links</title>
        <meta name="description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tidy-URL : URL Shortener - Create Custom Short Links" />
        <meta property="og:description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta property="og:url" content="https://tidyur.link" />
        <meta property="og:site_name" content="Tidy-URL" />
        <meta property="article:publisher" content="https://gautamghai.com" />
        <meta property="og:image" content={`${typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''}/assets/tidyurl.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tidy-URL : URL Shortener - Create Custom Short Links" />
        <meta name="twitter:description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta name="twitter:image" content={`${typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''}/assets/tidyurl.png`}/>
        <meta name="twitter:site" content="@_gautamghai" />
      </Head>
      <div className='relative bg-bgBrown-100 w-full min-h-screen'>
        <Navbar />
        <div className='w-full text-center my-8 sm:mt-16 md:mt-24 px-4 font-gothic z-10'>
          <h1 className='relative text-4xl md:text-7xl font-black drop-shadow-md z-10'>Your go-to app for <span className='text-customBtn-100 shadow-customBtn-100'>short</span> links</h1>
          <h2 className='relative text-xl md:text-3xl font-normal md:font-medium py-4 drop-shadow-md z-10'>An <span className='text-customBtn-100 shadow-customBtn-100'>ad-free</span> experience to customize your links and make them <span className='text-customBtn-100 shadow-customBtn-100'>neat</span> and <span className='text-customBtn-100 shadow-customBtn-100'>tidy</span>.</h2>
        </div>
        <div className='flex flex-wrap items-center justify-evenly sm:mt-16 md:mt-24'>
          <Form />
          <div className='hidden md:block'>
            <Image src="/assets/main.svg" width={500} height={500} className="z-10" alt="user-image" />
          </div>
        </div>
        <img src="/assets/sm-up.svg" alt='bg-image' className='block md:hidden absolute top-0 w-auto z-0' />
        <img src="/assets/sm-down.svg" alt='bg-image' className='block md:hidden absolute bottom-0 w-auto z-0' />
        <img src="/assets/wave.svg" alt='bg-image' className='hidden md:block absolute bottom-0 w-auto z-0' />
        <p className='absolute bottom-0 sm:bottom-1 md:bottom-4 left-0 right-0 mx-auto w-fit font-medium text-white'>Developed by <Link href="https://gautamghai.com" target={'_blank'} className='hover:text-customBtn-100'>Gautam Ghai</Link></p>
      </div>
    </>
  )
}

export default Home
