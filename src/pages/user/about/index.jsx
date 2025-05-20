import React, { useState } from 'react';
import './index.scss';
import img from '../../../assets/shopping-girls.jpg';
import {
  Store,
  CircleDollarSign,
  BriefcaseBusiness,
  PiggyBank,
} from 'lucide-react';

const AboutPage = () => {
  const [activeStatIndex, setActiveStatIndex] = useState(null);

  const handleStatClick = (index) => {
    setActiveStatIndex(index === activeStatIndex ? null : index);
  };

  return (
    <div className="about-page">
      <div className="story-section">
        <div className="text">
          <h1>Our Story</h1>
          <p>
            Exclusive is a premier fashion destination for the modern shopper.
            Launched in 2025, our platform bridges premium products with
            everyday accessibility. We’re passionate about design, quality, and
            providing value that empowers style globally.
          </p>
        </div>
        <div className="image">
          <img src={img} alt="Our Story" />
        </div>
      </div>

      <div className="stats-section">
        {[
          {
            icon: <Store />,
            value: '10.5k',
            text: 'Sellers active on our site',
          },
          {
            icon: <CircleDollarSign />,
            value: '33k',
            text: 'Monthly product sales',
          },
          {
            icon: <BriefcaseBusiness />,
            value: '45.6k',
            text: 'Customers active on our site',
          },
          {
            icon: <PiggyBank />,
            value: '25k',
            text: 'Annual gross sales',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`stat ${activeStatIndex === index ? 'active' : ''}`}
            onClick={() => handleStatClick(index)}
          >
            <h2>
              {/* {stat.icon} {stat.value} */}
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
            </h2>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>

      <div className="team-section">
        <div className="team-member">
          <h3>Meow Meow!</h3>
          <p>CEO</p>
        </div>
        <div className="team-member">
          <h3>Roaaar!</h3>
          <p>Managing Director</p>
        </div>
        <div className="team-member">
          <h3>Mooooo!</h3>
          <p>Product Designer</p>
        </div>
      </div>

      <div className="services-section">
        <div className="service">
          <p>Free and Fast Delivery</p>
        </div>
        <div className="service">
          <p>24/7 Customer Service</p>
        </div>
        <div className="service">
          <p>Money-back Guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
