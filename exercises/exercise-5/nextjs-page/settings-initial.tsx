'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  // TODO: Add shared state management
  // const { sharedState, setSharedState } = useContext(SharedStateContext);

  // Local settings state
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSync: false,
  });

  useEffect(() => {
    // TODO: Send navigation state to React Native when component mounts
    // const sendNavigationUpdate = () => {
    //   if (window.ReactNativeWebView) {
    //     window.ReactNativeWebView.postMessage(JSON.stringify({
    //       type: 'navigation_changed',
    //       url: window.location.pathname,
    //       title: 'Settings',
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
    //         // TODO: Update shared state and local settings
    //         if (message.state.theme) {
    //           setSettings(prev => ({ ...prev, theme: message.state.theme }));
    //         }
    //         if (message.state.language) {
    //           setSettings(prev => ({ ...prev, language: message.state.language }));
    //         }
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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // TODO: Update shared state immediately
    // setSharedState(prev => ({
    //   ...prev,
    //   [key]: value
    // }));

    // TODO: Send state update to React Native
    // if (window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(JSON.stringify({
    //     type: 'state_updated',
    //     state: {
    //       [key]: value
    //     }
    //   }));
    // }
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSync: false,
    };

    setSettings(defaultSettings);

    // TODO: Update shared state
    // setSharedState(prev => ({
    //   ...prev,
    //   ...defaultSettings
    // }));

    // TODO: Send state update to React Native
    // if (window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(JSON.stringify({
    //     type: 'state_updated',
    //     state: defaultSettings
    //   }));
    // }

    alert('Settings reset to defaults!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Settings</h1>

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
          href="/profile"
          style={{
            backgroundColor: '#007AFF',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '5px',
            textDecoration: 'none'
          }}
        >
          Profile
        </Link>
      </div>

      {/* TODO: Display shared state */}
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Current Shared State</h3>
        <p>Theme: {/* TODO: Display current theme from shared state */}light</p>
        <p>Language: {/* TODO: Display current language from shared state */}en</p>
      </div>

      {/* Settings Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>App Settings</h3>

        {/* Theme Setting */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Theme:
          </label>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/* Language Setting */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Language:
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px'
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Notifications Setting */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontWeight: 'bold' }}>Enable Notifications</span>
          </label>
        </div>

        {/* Auto Sync Setting */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoSync}
              onChange={(e) => handleSettingChange('autoSync', e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontWeight: 'bold' }}>Auto Sync Data</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleResetSettings}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* TODO: Add navigation history display */}
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '5px'
      }}>
        <h3>Navigation Info</h3>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.pathname : '/settings'}</p>
        <p>Can Go Back: {/* TODO: Display navigation state */}true</p>
        <p>Page Title: Settings</p>
      </div>
    </div>
  );
}