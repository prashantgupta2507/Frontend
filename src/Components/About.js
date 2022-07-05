import React from 'react';
import AboutImg from '../Images/about-img.jpeg'
import "../styles/About.css"

export default function About() {
    return <section className='contact' id='about'>
        <div className="container">
            <div className="section-title">
                <h2><span>About </span> Us</h2>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5 align-items-stretch video-box">
                    <img src={AboutImg} alt="about-img" style={{ width: '500px', height: '300px' }} />
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-stretch">
                    <div className="content">
                        <h6>Welcome to Bestof Shopping, your number one source for all products. We're dedicated to giving you the very best of products, with a focus on Best Quality, Best Price, Customer Satisfaction.<br /><br />

                            Founded in 2017 by Mr. Prashant Gupta, Bestof Shopping has come a long way from its beginnings in Indore. When Mr. Prashant Gupta first started out, his passion for "Best Quality products" drove them to quit day job, so that Bestof Shopping can offer you "the world's most advanced shooping websites". We now serve customers all over country, and are thrilled that we're able to turn our passion into our own website.<br /><br />

                            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.<br /><br />

                            Sincerely,<br />
                            Mr. Prashant Gupta</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}