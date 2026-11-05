import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { 
  Platform, 
  StyleSheet, 
  Text 
} from "react-native";
import { colors } from "@/theme/color";

const LOGOUT_PENDING_KEY = "mesquared.logoutPending";
const LOGOUT_SUCCESS_MESSAGE = "You have been logged out successfully.";
const LOGOUT_CONFIRMATION_DURATION_MS = 3000;

type LogoutConfirmationContextValue = {
  isVisible: boolean;
  startLogout: () => void;
  confirmLogout: () => void;
  cancelLogout: () => void;
};

const LogoutConfirmationContext =
  createContext<LogoutConfirmationContextValue | null>(null);

export function LogoutConfirmationProvider({
  children,
}: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(
    () =>
      Platform.OS === "web" &&
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(LOGOUT_PENDING_KEY) === "true",
  );

  useEffect(() => {
    if (isVisible && Platform.OS === "web") {
      window.sessionStorage.removeItem(LOGOUT_PENDING_KEY);
    }

    if (!isVisible) {
      return;
    }

    const timeout = setTimeout(
      () => setIsVisible(false),
      LOGOUT_CONFIRMATION_DURATION_MS,
    );
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const startLogout = useCallback(() => {
    if (Platform.OS === "web") {
      window.sessionStorage.setItem(LOGOUT_PENDING_KEY, "true");
    }
    setIsVisible(false);
  }, []);

  const confirmLogout = useCallback(() => {
    if (Platform.OS === "web") {
      window.sessionStorage.removeItem(LOGOUT_PENDING_KEY);
    }
    setIsVisible(true);
  }, []);

  const cancelLogout = useCallback(() => {
    if (Platform.OS === "web") {
      window.sessionStorage.removeItem(LOGOUT_PENDING_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({ isVisible, startLogout, confirmLogout, cancelLogout }),
    [cancelLogout, confirmLogout, isVisible, startLogout],
  );

  return (
    <LogoutConfirmationContext.Provider value={value}>
      {children}
    </LogoutConfirmationContext.Provider>
  );
}

export function useLogoutConfirmation() {
  const context = useContext(LogoutConfirmationContext);
  if (!context) {
    throw new Error(
      "useLogoutConfirmation must be used within LogoutConfirmationProvider.",
    );
  }
  return context;
}

export function LogoutConfirmation() {
  const { isVisible } = useLogoutConfirmation();
  if (!isVisible) {
    return null;
  }

  return <Text style={styles.message}>{LOGOUT_SUCCESS_MESSAGE}</Text>;
}

const styles = StyleSheet.create({
  message: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
});
