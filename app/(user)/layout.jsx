import Footer from '@/Elements/Footer'
import Navbar from '@/Elements/Navbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
