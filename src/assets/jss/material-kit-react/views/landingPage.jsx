import { container, title } from "assets/jss/material-kit-react.jsx";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  py: {
    padding: "30px 0",
  },
  listItem: {
    color: "black",
    fontSize: "24px",
    padding: "10px",
    textDecoration: "underline"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    maxWidth: "1200px",
    width: "90%",
    margin: "auto",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-100px auto 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  }
};

export default landingPageStyle;
