import Footer from '@/Elements/Footer'
import Navbar from '@/Elements/Navbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout
