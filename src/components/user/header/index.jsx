import './index.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header1">
      <div className="container">
        <div className="container-left">
          <span>Made for You. Shipped to Your Door. </span>
          <Link to="/products"> ShopNow!</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
