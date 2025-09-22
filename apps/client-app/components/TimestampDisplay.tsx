import React from "react";
import { View, Text } from "react-native";
import { typography } from "../styles/theme";
import { formatTimestamp } from "../utils/jwt";

interface TimestampDisplayProps {
  decodedToken: any;
}

export function TimestampDisplay({ decodedToken }: TimestampDisplayProps) {
  if (!decodedToken) return null;

  return (
    <>
      <Text style={[typography.subheading, { marginBottom: 10 }]}>
        Token Timestamps:
      </Text>
      {decodedToken.iat && (
        <Text style={[typography.body, { marginBottom: 5 }]}>
          Issued At: {formatTimestamp(decodedToken.iat)}
        </Text>
      )}
      {decodedToken.auth_time && (
        <Text style={[typography.body, { marginBottom: 5 }]}>
          Auth Time: {formatTimestamp(decodedToken.auth_time)}
        </Text>
      )}
      {decodedToken.exp && (
        <Text style={[typography.body, { marginBottom: 15 }]}>
          Expires: {formatTimestamp(decodedToken.exp)}
        </Text>
      )}
    </>
  );
}