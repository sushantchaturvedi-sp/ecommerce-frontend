import React from 'react';
import './index.scss';
import img from '../../../assets/shopping-girls.jpg'; // Importing the image
import {
  Store,
  CircleDollarSign,
  BriefcaseBusiness,
  PiggyBank,
} from 'lucide-react'; // Importing the Store icon from lucide-react
const AboutPage = () => {
  return (
    <>
      <div className="about-page">
        <div className="story-section">
          <div className="text">
            <h1>Our Story</h1>
            <p>
              Exclusive is a premier fashion destination for the modern shopper.
              Launched in 2025, our platform bridges premium products with
              everyday accessibility. We’re passionate about design, quality,
              and providing value that empowers style globally.
            </p>
          </div>
          <div className="image">
            <img src={img} alt="Our Story" />
          </div>
        </div>

        <div className="stats-section">
          <div className="stat">
            <h2>
              <Store /> 10.5k
            </h2>
            <p>Sellers active on our site</p>
          </div>
          <div className="stat active">
            <h2>
              <CircleDollarSign /> 33k
            </h2>
            <p>Monthly product sales</p>
          </div>
          <div className="stat">
            <h2>
              <BriefcaseBusiness /> 45.6k
            </h2>
            <p>Customers active on our site</p>
          </div>
          <div className="stat">
            <h2>
              <PiggyBank Size={50} /> 25k
            </h2>
            <p>Annual gross sales</p>
          </div>
        </div>

        <div className="team-section">
          <div className="team-member">
            {/* <img src="/team/tom.jpg" alt="Tom Cruise" /> */}
            <h3>Meow Meow!</h3>
            <p>CEO</p>
          </div>
          <div className="team-member">
            {/* <img src="/team/emma.jpg" alt="Emma Watson" /> */}
            <h3>Roaaar!</h3>
            <p>Managing Director</p>
          </div>
          <div className="team-member">
            {/* <img src="/team/will.jpg" alt="Will Smith" /> */}
            <h3>Mooooo!</h3>
            <p>Product Designer</p>
          </div>
        </div>

        <div className="services-section">
          <div className="service">
            {/* <img src="/icons/delivery.svg" alt="Free delivery" /> */}
            <p>Free and Fast Delivery</p>
          </div>
          <div className="service">
            {/* <img src="/icons/support.svg" alt="Customer Service" /> */}
            <p>24/7 Customer Service</p>
          </div>
          <div className="service">
            {/* <img src="/icons/guarantee.svg" alt="Money Back" /> */}
            <p>Money-back Guarantee</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
