import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../types/auth';
import { colors, spacing, typography, commonStyles } from '../styles/theme';

interface UserInfoProps {
  user: User | null;
}

interface InfoRowProps {
  label: string;
  value: string | undefined;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
  );
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <View style={[commonStyles.card, styles.container]}>
      <Text style={styles.sectionTitle}>User Information</Text>

      <InfoRow label="Username" value={user?.preferred_username} />
      <InfoRow label="Name" value={user?.name} />
      <InfoRow label="Email" value={user?.email} />
      <InfoRow label="Subject ID" value={user?.sub} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.subheading,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  label: {
    ...typography.label,
    width: 100,
  },
  value: {
    ...typography.body,
    flex: 1,
  },
});