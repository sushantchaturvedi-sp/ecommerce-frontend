import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { getBanners } from '../../services/api';
import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      try {
        const { data } = await getBanners();

        if (
          isMounted &&
          data &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.every((banner) => banner.image && banner.productId)
        ) {
          setBanners(data);
        } else {
          console.warn('Invalid or incomplete banner data:', data);
          setBanners([]);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        setBanners([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBanners();

    return () => {
      isMounted = false;
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return null; // You can show a spinner here
  if (!banners.length) return null;

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        {banners.map(({ _id, image, productId }) => (
          <div
            key={_id}
            className="banner-slide"
            onClick={() =>
              productId ? navigate(`/product/${productId}`) : null
            }
          >
            <img
              src={image || '/placeholder.jpg'}
              alt="Banner"
              className="carousel-image clickable"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.jpg';
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
