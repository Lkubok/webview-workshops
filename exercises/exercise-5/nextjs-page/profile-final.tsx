'use client';

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

interface SharedState {
  theme: string;
  language: string;
  userPreferences: any;
  userProfile?: any;
}

const SharedStateContext = React.createContext<{
  sharedState: SharedState;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
}>({
  sharedState: { theme: 'light', language: 'en', userPreferences: {} },
  setSharedState: () => {}
});

export default function ProfilePage() {
  const [sharedState, setSharedState] = useState<SharedState>({
    theme: 'light',
    language: 'en',
    userPreferences: {},
  });

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer passionate about mobile and web technologies.',
  });

  const [navigationState, setNavigationState] = useState({
    canGoBack: true,
    url: '/profile',
  });

  useEffect(() => {
    const sendNavigationUpdate = () => {
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'navigation_changed',
          url: window.location.pathname,
          title: 'Profile',
          canGoBack: window.history.length > 1
        }));
      }
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case 'navigate_to_page':
            if (message.page === 'home') {
              window.location.href = '/home';
            } else if (message.page === 'settings') {
              window.location.href = '/settings';
            }
            break;

          case 'update_shared_state':
            setSharedState(prev => ({
              ...prev,
              ...message.state
            }));
            break;
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    // Update navigation state
    setNavigationState({
      canGoBack: window.history.length > 1,
      url: window.location.pathname,
    });

    // Send initial navigation state
    setTimeout(sendNavigationUpdate, 100);

    // Load profile data from shared state if available
    if (sharedState.userProfile) {
      setProfileData(sharedState.userProfile);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [sharedState.userProfile]);

  const updateSharedState = (updates: Partial<SharedState>) => {
    const newState = { ...sharedState, ...updates };
    setSharedState(newState);

    // Send state update to React Native
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'state_updated',
        state: updates
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Update shared state with profile data
    updateSharedState({
      userProfile: profileData
    });

    alert('Profile saved successfully!');
  };

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
    color: sharedState.theme === 'dark' ? '#ffffff' : '#000000',
    minHeight: '100vh'
  };

  return (
    <div style={containerStyle}>
      <h1>User Profile</h1>

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

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#f0f0f0',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Shared State</h3>
        <p>Theme: {sharedState.theme}</p>
        <p>Language: {sharedState.language}</p>
        <p>Profile Status: {sharedState.userProfile ? 'Saved' : 'Not saved'}</p>
        <pre style={{ fontSize: '12px', backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff', padding: '10px', borderRadius: '3px' }}>
          {JSON.stringify(sharedState, null, 2)}
        </pre>
      </div>

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#ffffff',
        padding: '20px',
        borderRadius: '5px',
        border: sharedState.theme === 'dark' ? '1px solid #4a5568' : '1px solid #ddd',
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
              fontSize: '14px',
              backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
              color: sharedState.theme === 'dark' ? '#ffffff' : '#000000'
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
              fontSize: '14px',
              backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
              color: sharedState.theme === 'dark' ? '#ffffff' : '#000000'
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
              resize: 'vertical',
              backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
              color: sharedState.theme === 'dark' ? '#ffffff' : '#000000'
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

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#e9ecef',
        padding: '15px',
        borderRadius: '5px'
      }}>
        <h3>Navigation Info</h3>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.pathname : '/profile'}</p>
        <p>Can Go Back: {navigationState.canGoBack ? 'Yes' : 'No'}</p>
        <p>Page Title: Profile</p>
        <p>History Length: {typeof window !== 'undefined' ? window.history.length : 0}</p>
        <p>Profile Changes: {JSON.stringify(profileData) !== JSON.stringify(sharedState.userProfile) ? 'Unsaved' : 'Saved'}</p>
      </div>
    </div>
  );
}