import React, { useState } from 'react';
import './UserProfilePage.scss'
import UserProfileLeftPanel from '../../components/UserProfileLeftPanel/UserProfileLeftPanel';
import OrderHistoryPage from '../../components/OrderHistoryPage/OrderHistoryPage';
import SettingsComponent from '../../components/UserSettings/UserSettings';
import MyCart from '../../components/MyCart/MyCart';
import Favorites from '../../components/Favorites/Favorites';
import Notification from '../../components/Notifications/Notifications';
import Dashboard from '../../components/Dashboard/Dashboard';
import ProfileForm from '../../components/UserProfile/ProfileForm';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  // Get userType from Redux store
  //const userType = useSelector(state => state.userInfo.userDetails.userType);

  // State to manage which component is currently active/selected
  const [activeComponent, setActiveComponent] = useState('');

  // Function to render the right component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <ProfileForm />;
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
            return <Dashboard  />; // Pass userType to Dashboard
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="userProfilePage__container">
      <UserProfileLeftPanel setActiveComponent={setActiveComponent} />
      <div className="rightPanel">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserProfilePage;
