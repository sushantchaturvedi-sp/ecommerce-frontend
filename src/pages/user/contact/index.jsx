import React from 'react';
import './index.scss';
import { Phone, Mail } from 'lucide-react'; // Importing the Phone icon from lucide-react

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* <div className="breadcrumb">Home / Contact</div> */}

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-block">
            <h3>
              <Phone Size={18} /> Call To Us
            </h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +91-888888-9999</p>
          </div>

          <div className="info-block">
            <h3>
              <Mail Size={18} /> Write To Us
            </h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: customer@exclusive.com</p>
            <p>Email: support@exclusive.com</p>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <div className="input-row">
              <input type="text" placeholder="Your Name *" required />
              <input type="email" placeholder="Your Email *" required />
              <input type="tel" placeholder="Your Phone *" required />
            </div>
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
