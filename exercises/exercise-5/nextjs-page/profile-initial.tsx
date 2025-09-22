'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  // TODO: Add shared state management
  // const { sharedState, setSharedState } = useContext(SharedStateContext);

  // Local form state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer passionate about mobile and web technologies.',
  });

  useEffect(() => {
    // TODO: Send navigation state to React Native when component mounts
    // const sendNavigationUpdate = () => {
    //   if (window.ReactNativeWebView) {
    //     window.ReactNativeWebView.postMessage(JSON.stringify({
    //       type: 'navigation_changed',
    //       url: window.location.pathname,
    //       title: 'Profile',
    //       canGoBack: window.history.length > 1
    //     }));
    //   }
    // };

    // TODO: Add message listener for React Native commands
    // const handleMessage = (event: MessageEvent) => {
    //   try {
    //     const message = JSON.parse(event.data);
    //
    //     switch (message.type) {
    //       case 'navigate_to_page':
    //         // TODO: Handle programmatic navigation
    //         break;
    //       case 'update_shared_state':
    //         // TODO: Update shared state
    //         break;
    //     }
    //   } catch (error) {
    //     console.error('Error parsing message:', error);
    //   }
    // };

    // TODO: Add event listener
    // window.addEventListener('message', handleMessage);

    // TODO: Send initial navigation state
    // sendNavigationUpdate();

    // TODO: Cleanup event listener
    // return () => {
    //   window.removeEventListener('message', handleMessage);
    // };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // TODO: Save to shared state and notify React Native
    console.log('Saving profile:', profileData);

    // TODO: Update shared state with profile data
    // setSharedState(prev => ({
    //   ...prev,
    //   userProfile: profileData
    // }));

    // TODO: Send state update to React Native
    // if (window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(JSON.stringify({
    //     type: 'state_updated',
    //     state: {
    //       userProfile: profileData
    //     }
    //   }));
    // }

    alert('Profile saved successfully!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Profile</h1>

      {/* Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          href="/home"
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '5px',
            textDecoration: 'none',
            marginRight: '10px'
          }}
        >
          ← Back to Home
        </Link>
        <Link
          href="/settings"
          style={{
            backgroundColor: '#007AFF',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '5px',
            textDecoration: 'none'
          }}
        >
          Settings
        </Link>
      </div>

      {/* TODO: Display shared state */}
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Shared State</h3>
        <p>Theme: {/* TODO: Display current theme */}light</p>
        <p>Language: {/* TODO: Display current language */}en</p>
      </div>

      {/* Profile Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>Edit Profile</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Bio:
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={handleSaveProfile}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Save Profile
        </button>
      </div>

      {/* TODO: Add navigation history display */}
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '5px'
      }}>
        <h3>Navigation Info</h3>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.pathname : '/profile'}</p>
        <p>Can Go Back: {/* TODO: Display navigation state */}true</p>
        <p>Page Title: Profile</p>
      </div>
    </div>
  );
}