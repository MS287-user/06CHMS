import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <>
            <footer id="contactus" className="py-10 bg-gray-200 text-center">
                <div className="flex justify-center gap-6 text-2xl mb-4">
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h2 className="text-lg">© 2025 Luxury Stay. All rights reserved.</h2>
            </footer>
        </>
    )
}

export default Footer