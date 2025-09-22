'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SharedState {
  theme: string;
  language: string;
  userPreferences: any;
  userProfile?: any;
  notifications?: boolean;
  autoSync?: boolean;
}

export default function SettingsPage() {
  const [sharedState, setSharedState] = useState<SharedState>({
    theme: 'light',
    language: 'en',
    userPreferences: {},
    notifications: true,
    autoSync: false,
  });

  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSync: false,
  });

  const [navigationState, setNavigationState] = useState({
    canGoBack: true,
    url: '/settings',
  });

  useEffect(() => {
    const sendNavigationUpdate = () => {
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'navigation_changed',
          url: window.location.pathname,
          title: 'Settings',
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
            } else if (message.page === 'profile') {
              window.location.href = '/profile';
            }
            break;

          case 'update_shared_state':
            const newSharedState = { ...sharedState, ...message.state };
            setSharedState(newSharedState);

            // Update local settings to match shared state
            if (message.state.theme) {
              setSettings(prev => ({ ...prev, theme: message.state.theme }));
            }
            if (message.state.language) {
              setSettings(prev => ({ ...prev, language: message.state.language }));
            }
            if (message.state.notifications !== undefined) {
              setSettings(prev => ({ ...prev, notifications: message.state.notifications }));
            }
            if (message.state.autoSync !== undefined) {
              setSettings(prev => ({ ...prev, autoSync: message.state.autoSync }));
            }
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

    // Sync local settings with shared state
    setSettings({
      theme: sharedState.theme,
      language: sharedState.language,
      notifications: sharedState.notifications || true,
      autoSync: sharedState.autoSync || false,
    });

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Update shared state immediately
    updateSharedState({
      [key]: value
    });
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSync: false,
    };

    setSettings(defaultSettings);
    updateSharedState(defaultSettings);

    alert('Settings reset to defaults!');
  };

  const exportSettings = () => {
    const settingsData = {
      settings,
      sharedState,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'webview-settings.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
      <h1>Settings</h1>

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

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#f0f0f0',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Current Shared State</h3>
        <p>Theme: {sharedState.theme}</p>
        <p>Language: {sharedState.language}</p>
        <p>Notifications: {sharedState.notifications ? 'Enabled' : 'Disabled'}</p>
        <p>Auto Sync: {sharedState.autoSync ? 'Enabled' : 'Disabled'}</p>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Full State</summary>
          <pre style={{ fontSize: '12px', backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff', padding: '10px', borderRadius: '3px', marginTop: '10px' }}>
            {JSON.stringify(sharedState, null, 2)}
          </pre>
        </details>
      </div>

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#ffffff',
        padding: '20px',
        borderRadius: '5px',
        border: sharedState.theme === 'dark' ? '1px solid #4a5568' : '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <h3>App Settings</h3>

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
              width: '200px',
              backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
              color: sharedState.theme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

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
              width: '200px',
              backgroundColor: sharedState.theme === 'dark' ? '#2d3748' : '#ffffff',
              color: sharedState.theme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

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
          <small style={{ marginLeft: '24px', color: sharedState.theme === 'dark' ? '#a0aec0' : '#666' }}>
            Receive notifications for app events and updates
          </small>
        </div>

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
          <small style={{ marginLeft: '24px', color: sharedState.theme === 'dark' ? '#a0aec0' : '#666' }}>
            Automatically synchronize data between React Native and WebView
          </small>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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

          <button
            onClick={exportSettings}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Export Settings
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: sharedState.theme === 'dark' ? '#4a5568' : '#e9ecef',
        padding: '15px',
        borderRadius: '5px'
      }}>
        <h3>Navigation Info</h3>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.pathname : '/settings'}</p>
        <p>Can Go Back: {navigationState.canGoBack ? 'Yes' : 'No'}</p>
        <p>Page Title: Settings</p>
        <p>History Length: {typeof window !== 'undefined' ? window.history.length : 0}</p>
        <p>Settings Sync: {JSON.stringify(settings) === JSON.stringify({
          theme: sharedState.theme,
          language: sharedState.language,
          notifications: sharedState.notifications,
          autoSync: sharedState.autoSync
        }) ? 'Synchronized' : 'Pending'}</p>
      </div>
    </div>
  );
}