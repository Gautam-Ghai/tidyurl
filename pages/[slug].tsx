import React from 'react'
import { prisma } from '../db/prisma'
import { SyncLoader } from 'react-spinners'
import Navbar from '../components/navbar'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'
import { array2String } from '../utils/array2String'

const Slug: NextPage = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <title>Tidy-URL : Loading...</title>
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
                <meta name="twitter:image" content={`${typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''}/assets/tidyurl.png`} />
                <meta name="twitter:site" content="@_gautamghai" />
            </Head>

            <div className='min-h-screen bg-bgBrown-100'>
                <Navbar />
                <div className='screenHeight grid place-items-center'>
                    <SyncLoader size={30} color="#9f9fed" />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async (context) => {

    try {
        const slug  = context.query.slug;

        const sortedSlug = array2String(slug);

        const data = await prisma.shortLink.findFirst({
            where: {
                slug: {
                    equals: sortedSlug
                }
            }
        })

        if (!data) {
            return {
                notFound: true
            }
        }

        return {
            redirect: {
                destination: data?.url || '/404',
                permanent: true
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}

export default Slug