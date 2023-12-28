import React from 'react'
import Image from 'next/image';
import Button from '../components/button';
import { AiOutlineHome } from "react-icons/ai"
import Navbar from '../components/navbar';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Tidy-URL : Not Found</title>
        <meta name="description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tidy-URL : URL Shortener - Create Custom Short Links" />
        <meta property="og:description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta property="og:url" content="https://tidyur.link" />
        <meta property="og:site_name" content="Tidy-URL" />
        <meta property="article:publisher" content="https://gautamghai.com" />
        <meta property="og:image" content={`${typeof window !== "undefined" && window.location.hostname ? window.location.hostname : "https://tidyurl.com"}/assets/tidyurl.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tidy-URL : URL Shortener - Create Custom Short Links" />
        <meta name="twitter:description" content="Ad Free URL shortener to create perfect URLs. Tidy-URL helps you create, customize, and share neat and tidy links" />
        <meta name="twitter:image" content={`${typeof window !== "undefined" && window.location.hostname ? window.location.hostname : "https://tidyurl.com"}/assets/tidyurl.png`} />
        <meta name="twitter:site" content="@_gautamghai" />
      </Head>
      <div className='bg-bgBrown-100 w-full min-h-screen'>
        <Navbar />
        <div className='grid place-items-center screenHeight'>
          <div className='flex flex-col justify-center items-center'>
            <Image src="/assets/404.svg" height={500} width={500} alt="404 - Not Found" objectFit='contain' />
            <div className='text-center p-2 text-lg'>
              <h1 className='text-btnBrown pb-2'>We can&apos;t seem to find the page you&apos;re looking for.</h1>
              <h1 className='text-btnBrown'>The link you followed may be broken or you may have entered the wrong link.</h1>
            </div>
            <Link href="/" className='my-8'>
              <Button leftIcon={<AiOutlineHome />}>
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound