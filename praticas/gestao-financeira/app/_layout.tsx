import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import GlobalState from "../contexts/GlobalState";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem("loggedUser");
        setLoggedIn(!!user);
      } catch (e) {
        setLoggedIn(false);
      } finally {
        setReady(true);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (loggedIn) {
      router.replace("/(tabs)" as any);
    } else {
      router.replace("/login" as any);
    }
  }, [ready, loggedIn]);

  return (
    <GlobalState>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </GlobalState>
  );
}