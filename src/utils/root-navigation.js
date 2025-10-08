import { createNavigationContainerRef } from "@react-navigation/native";
import { SCREEN } from "../constants/screen-name";

export const globNavigationRef = createNavigationContainerRef();

export function globNavigateTo(name, params) {
  if (globNavigationRef.isReady()) {
    globNavigationRef.navigate(name, params);
  }
}

export function globNavigationReset() {
  if (globNavigationRef.isReady()) {
    globNavigationRef.navigate(SCREEN.landingScreen);
  }
}
