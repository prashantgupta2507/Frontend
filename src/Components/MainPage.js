import React from 'react'
import About from './About';
import Contact from './Contact';
import NavbarMain from './header/NavbarMain';

export default function MainPage() {
    return (
        <React.Fragment>
            <div className="App" style={{ height: '90vh' }}>
                <NavbarMain />
            </div>
            <About />
            <Contact />
        </React.Fragment>
    )
}
