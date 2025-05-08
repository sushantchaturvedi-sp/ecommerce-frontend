import TopNavbar from '../navbar/index';
import Sidebar from '../sidebar/index';
import { Outlet } from 'react-router-dom';
import './index.scss';

function Layout() {
  return (
    <div className="layout-wrapper">
      <TopNavbar />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import TopNavbar from '../navbar/index';
// import Sidebar from '../sidebar/index';
// import './index.scss';

// function Layout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="layout-wrapper">
//       <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <Sidebar className={`sidebar ${sidebarOpen ? 'active' : ''}`} />
//       <div className={`main-content ${sidebarOpen ? 'expanded' : ''}`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;
