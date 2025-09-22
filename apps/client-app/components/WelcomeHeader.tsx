import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../types/auth';
import { spacing, typography, commonStyles } from '../styles/theme';

interface WelcomeHeaderProps {
  user: User | null;
}

export function WelcomeHeader({ user }: WelcomeHeaderProps) {
  const displayName = user?.preferred_username || user?.name || 'User';

  return (
    <View style={styles.container}>
      <Text style={[typography.heading, commonStyles.textCenter, styles.welcomeText]}>
        Welcome, {displayName}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  welcomeText: {
    marginBottom: spacing.xl,
  },
});