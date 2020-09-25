/** @jsx messi */
import { jsx, ThemeProvider } from "theme-ui";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <div sx={{ backgroundColor: "lenny", padding: 1 }}>Hello</div>
    </ThemeProvider>
  );
}

export default App;

var messi = function (type, props) {
  var children = [],
    len = arguments.length - 2;
  while (len-- > 0) children[len] = arguments[len + 2];

  return jsx.apply(undefined, [type, props].concat(children));
};

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
