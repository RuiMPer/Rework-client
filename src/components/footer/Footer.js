import React from 'react';
import './Footer.css';

function Footer(){
    return(
        <footer className="footer bg-info" style={{ padding: '.5rem', textAlign: 'center' }}>
            <div className="clearfix" style={{ maxWidth: '980px', margin:'auto' }}>
                <p className="float-right">2020 | Re-WORK   /   Credits: R, M.</p>
            </div>
        </footer>
    )
}
export default Footer;