import React from 'react';
import '../styles/Contact.css'

export default function Contact() {
    return <section className='contact' id='contact'>
        <div className="container">
            <div className="section-title">
                <h2><span>Contact </span> Us</h2>
            </div>
        </div>
        <div className="container mt-5">
            <div className="info-wrap">
                <div className="row">
                    <div className="col-lg-4 col-md-6 info">
                        <i className="fas fa-map-marker-alt" />
                        <h4>Location:</h4>
                        <p>224 Carrizo RDG <br />Floresville, Texas 78114</p>
                    </div>
                    <div className="col-lg-4 col-md-6 info mt-4 mt-lg-0">
                        <i className="fas fa-envelope" />
                        <h4>Email:</h4>
                        <p>prashantgupta2507@gmail.com</p>
                    </div>
                    <div className="col-lg-4 col-md-6 info mt-4 mt-lg-0">
                        <i className="fas fa-phone-alt" />
                        <h4>Call:</h4>
                        <p>+1 5589 55488 51 <br />+1 5589 22475 14</p>
                    </div>
                </div>
            </div>
            <form action="contact" className="form" method='post'>
                <div className="form-row">
                    <div className="col-md-6 form-group">
                        <input type="text" className="form-control" name='name' placeholder='Your Name' required />
                    </div>
                    <div className="col-md-6 form-group">
                        <input type="email" className="form-control" name='email' placeholder='Your Email' required />
                    </div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name='subject' placeholder='Subject' />
                </div>
                <div className="form-group">
                    <textarea type="text" className="form-control" name='message' placeholder='Message' rows={5} required />
                </div>
                <div className="text-center">
                    <button type='submit'>Send Message</button>
                </div>
            </form>
        </div>
    </section>;
}