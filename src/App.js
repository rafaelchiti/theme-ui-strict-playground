import { ThemeProvider } from "theme-ui";
import React from "react";
import { UNSAFE_cssValue } from "messiJsx/jsx-runtime";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <div
        sx={{
          ":hover": { backgroundColor: "lenny" },

          backgroundColor: ["lenny", "vitor"],
          padding: 1,
          color: UNSAFE_cssValue("white"),
        }}
      >
        Hello
      </div>
      <View backgroundColor="red">hello</View>
    </ThemeProvider>
  );
}

const View = ({ children, ...props }) => {
  return <div sx={{ ...props }}>{children}</div>;
};

export default App;

//
//
const myTheme = {
  styles: {
    root: {
      backgroundColor: "white",
    },
  },
  colors: {
    lenny: "red",
    vitor: "blue",
  },
  space: ["10px", "50px"],
};
