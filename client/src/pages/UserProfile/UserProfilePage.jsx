// Import statements for your components
import React, { useState } from 'react';
import './UserProfilePage.scss'
import UserProfileLeftPanel from '../../components/UserProfileLeftPanel/UserProfileLeftPanel';
import UserProfileNavbar from '../../components/UserProfileNavbar/UserProfileNavbar';
import OrderHistoryPage from '../../components/OrderHistoryPage/OrderHistoryPage';
import SettingsComponent from '../../components/UserSettings/UserSettings';
import MyCart from '../../components/MyCart/MyCart';
import Favorites from '../../components/Favorites/Favorites';
import Notification from '../../components/Notifications/Notifications';
import Dashboard from '../../components/DashboardAdmin/Dashboard';
import VendorDashboard from '../../components/DashboardVendor/Dashboard';
const UserProfilePage = () => {
  // State to manage which component is currently active/selected
  const [activeComponent, setActiveComponent] = useState('profile'); // default component

  // Function to render the right component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <VendorDashboard />;
      case 'orderHistory':
        return <OrderHistoryPage />;
      case 'packages':
        return <Favorites />;
      case 'settings':
        return <SettingsComponent/>;
      case 'mycart':
        return <MyCart/>;
      case 'Notifications':
          return <Notification/>;
      case 'dashboard':
            return <Dashboard/>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="userProfilePage">
      <UserProfileLeftPanel setActiveComponent={setActiveComponent} />
      <div className="rightPanel">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserProfilePage;
