import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <header className='py-2 mx-4 md:mx-16 flex justify-between'>
      <Link href="/" className='z-10'>
        <img src="/assets/logo.png" alt="logo" className='h-8 md:h-11 z-10' />
      </Link>
    </header>
  )
}

export default Navbar