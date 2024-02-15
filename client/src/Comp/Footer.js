import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
        <div className="footer-content">
            <div className="footer-left">
                <h3>About Us</h3>
                <p>Developed by Aniket</p>
            </div>
            <div className="footer-right">
                <h3>Contact Us</h3>
                <ul>
                    <li>Email: info@example.com</li>
                    <li>Phone: +123-456-7890</li>
                    <li>Address: 123 Street, City, Country</li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-bottom">
        <p>&copy; 2024 Your Website Name. All Rights Reserved.</p>
    </div>
</footer>
  )
}

export default Footer
