import './index.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    
    <header className="header">
      <div className='container'>
      <div className="container-left">Made for You. Shipped to Your Door. <Link to="/products"> ShopNow!</Link></div>
      </div>
    </header>
  );
};

export default Header;
