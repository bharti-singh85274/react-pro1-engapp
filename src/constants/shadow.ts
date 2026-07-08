import { Platform } from "react-native";

const Shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  android: {
    elevation: 4,
  },
});

export default Shadow;