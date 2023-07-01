import React, { useEffect } from 'react'
import About from './About';
import Contact from './Contact';

export default function MainPage(props) {

    useEffect(()=>{
        props.setPath("/")
        // eslint-disable-next-line
    },[])

    return (
        <React.Fragment>
            <About />
            <Contact />
        </React.Fragment>
    )
}
