import React from "react";
import { View, Text } from "react-native";
import { typography } from "../styles/theme";
import { decodeJWT } from "../utils/jwt";
import { TimestampDisplay } from "./TimestampDisplay";

interface TokenDisplayProps {
  accessToken: string;
}

export function TokenDisplay({ accessToken }: TokenDisplayProps) {
  const decodedToken = decodeJWT(accessToken);

  return (
    <View
      style={{
        marginTop: 20,
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
      }}
    >
      {decodedToken && (
        <>
          <TimestampDisplay decodedToken={decodedToken} />

          <Text style={[typography.subheading, { marginBottom: 10 }]}>
            Decoded JWT Values:
          </Text>
          <Text style={[typography.body, { fontSize: 12 }]} selectable>
            {JSON.stringify(decodedToken, null, 2)}
          </Text>
        </>
      )}
      <Text style={[typography.subheading, { marginBottom: 10 }]}>
        Current Token:
      </Text>
      <Text
        style={[typography.body, { fontSize: 12, marginBottom: 15 }]}
        selectable
      >
        {accessToken}
      </Text>
    </View>
  );
}