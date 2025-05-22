import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { getBanners } from '../../services/api';
import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBanners();
      setBanners(data);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (banners.length === 0) return null;

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="banner-slide"
            onClick={() => navigate(`/product/${banner.productId}`)}
          >
            <img
              src={banner.image}
              alt="Banner"
              className="carousel-image clickable"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
