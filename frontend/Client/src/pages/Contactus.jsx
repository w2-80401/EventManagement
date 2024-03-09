import React from 'react';
import { Link } from 'react-router-dom';

function ContactUs() {
  return (
    <div>
      {/* Page Heading */}
      <div className="bg-white py-8">
        <div className="container mx-auto">
          <div className="text-center">
            <span className="breadcrumb"><Link to='/'>Home</Link>  /  Contact Us</span>
            <h3>Contact Us</h3>
          </div>
        </div>
      </div>

      {/* Contact Page */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="section-heading mb-6">
              <h6>| Contact Us</h6>
              <h2>Get In Touch With Our Agents</h2>
            </div>
            <p className="mb-6">When you really need to download free CSS templates, please remember our website TemplateMo. Also, tell your friends about our website. Thank you for visiting. There is a variety of Bootstrap HTML CSS templates on our website. If you need more information, please contact us.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <img src="assets/images/phone-icon.png" alt="" style={{ maxWidth: '52px' }} />
                <div>
                  <h6 className="mb-1">011212836383</h6>
                  <span>Phone Number</span>
                </div>
              </div>
              <div className="flex items-center">
                <img src="assets/images/email-icon.png" alt="" style={{ maxWidth: '52px' }} />
                <div>
                  <h6 className="mb-1">Eventify@gmail.com</h6>
                  <span>Business Email</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form id="contact-form" action="" method="post">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input type="name" name="name" id="name" placeholder="Your Name..." autoComplete="on" required className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label htmlFor="subject">Subject</label>
                  <input type="subject" name="subject" id="subject" placeholder="Subject..." autoComplete="on" className="block w-full border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" placeholder="Your Message" className="block w-full border border-gray-300 rounded-md px-4 py-2"></textarea>
                </div>
                <div>
                  <button type="submit" id="form-submit" className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded-md">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <div id="map" className="rounded-lg overflow-hidden shadow-md">
          <iframe 
                title="Google Maps" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.6701315625887!2d73.70315507608815!3d18.588904682517857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb7d0345f01f%3A0x6e8c20c647a06f47!2sSunbeam%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1708108392506!5m2!1sen!2sin" 
                width="100%" 
                height="500px" 
                style={{ border: '0' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                />
            </div>    

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="container mx-auto text-center">
          <p>Copyright © 2024 Eventify., Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
