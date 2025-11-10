import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";



export default styles = StyleSheet.create({
    mainContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nameLabel: {
    flex: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  nameContainer: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.colorBlue,
  },
  occasionLbl: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.colorOrange,
  },
  receiptNo: {
    fontSize: 15,
    color: COLORS.colorGray99,
  },
  chartTopSecContainer: { flexDirection: "row", marginBottom: 5 },
  yearContainer: { width: "100%"},
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  monthCapsule: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.colorRed,
    margin: 4,
  },
  paid: {
    backgroundColor: COLORS.colorC5,
  },
  selected: {
    backgroundColor: COLORS.colorGreen,
  },
  monthText: {
    fontWeight: '600',
    color: COLORS.white
  },
});
