// UserProfile.jsx

import './UserProfile.scss';
import React,{useState} from 'react';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import Notification from '../../components/Notification/Notification';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

const UserProfile = () => {
  // State to manage which component is currently active/selected
  const [activeComponent, setActiveComponent] = useState('profile'); // default component

  // Function to render the right component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      
      case 'Notification':
        return <Notification />;
      case 'settings':
        return <UserSettings />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="userProfilePage">
      <UserDashboard setActiveComponent={setActiveComponent} />
      <div className="rightPanel">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserProfile;
