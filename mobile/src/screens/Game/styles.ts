import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: "space-between",
  },
  logo: {
    width: 72,
    height: 40,
  },
  right: {
    width: 20,
    height: 20,
  },
  coverWrapper: {
    paddingHorizontal: 32,
    width: '100%',
  },
  cover: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
});
