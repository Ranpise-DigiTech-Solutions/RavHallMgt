import React, { useState, useEffect } from 'react';
import './UserProfilePage.scss';
import UserProfileLeftPanel from '../../components/UserProfileLeftPanel/UserProfileLeftPanel';
import OrderHistoryPage from '../../components/OrderHistoryPage/OrderHistoryPage';
import SettingsComponent from '../../components/UserSettings/UserSettings';
import MyCart from '../../components/MyCart/MyCart';
import Favorites from '../../components/Favorites/Favorites';
import Notification from '../../components/Notifications/Notifications';
import Dashboard from '../../components/DashboardAdmin/Dashboard';
import VendorDashboard from '../../components/DashboardVendor/Dashboard';
import ProfileForm from '../../components/UserProfile/ProfileForm';
import { NavBar } from '../../components'

const UserProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  // Use state to track whether the screen size is mobile or not
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile state on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    handleResize(); // Call on component mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <ProfileForm />;
      case 'orderHistory':
        return <OrderHistoryPage />;
      case 'packages':
        return <Favorites />;
      case 'settings':
        return <SettingsComponent />;
      case 'mycart':
        return <MyCart />;
      case 'Notifications':
        return <Notification />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="userProfilePage__container">
      {/* Conditionally render either Navbar or UserProfileLeftPanel based on isMobile */}
      {isMobile ? <NavBar setActiveComponent={setActiveComponent} /> : <UserProfileLeftPanel setActiveComponent={setActiveComponent} />}
      <div className="rightPanel">{renderComponent()}</div>
    </div>
  );
};

export default UserProfilePage;
