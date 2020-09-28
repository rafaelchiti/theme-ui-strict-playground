/** @jsx messiJsx */
import { jsx, ThemeProvider } from "theme-ui";
import { get } from "@theme-ui/css";

class UNSAFE_CssValueClass {
  constructor(val) {
    this.val = val;
  }
}
const UNSAFE_cssValue = (val) => new UNSAFE_CssValueClass(val);

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

var messiJsx = function (type, props, ...children) {
  if (props.unsafe_sx)
    return jsx.apply(undefined, [type, props].concat(children));

  if (!props.sx) return jsx.apply(undefined, [type, props].concat(children));

  // Have a list of 'theme aware props'
  // THEME_AWARE_PROPS
  // By using default css={{}} if the prop is not present in the theme throw
  // Escape hatch if you wanna bypass it UNSAFE_css => css = {{}}
  //    raw``
  //
  //

  // <div css={{ color: (theme) => '' }} />
  // <div css={{ color: ['red' , (theme) => '' ] }} />

  // if (":hover", ":active", "focus")

  magicFunction(props);

  return jsx.apply(undefined, [type, props].concat(children));
};

function magicFunction(props) {
  for (const prop of Object.keys(props.sx)) {
    let cssPropValue = props.sx[prop];

    //
    if (cssPropValue instanceof UNSAFE_CssValueClass) {
      props.sx[prop] = cssPropValue.val;
      continue;
    }

    if (PSEUDO_SELECTORS.includes(prop)) {
      // If pseudo selector :active, :hover
      magicFunction({ sx: cssPropValue });
    } else if (SCALES[prop]) {
      // f.i width has no scale constraint therefore we won't enter this branch
      // Maybe it was already a function? what to do in that case?
      // <div css={{ color: ['red' , *** (theme) => '' ], backgroundColor: (theme) => '' }} />
      // let cssPropValue = props.sx[prop];

      props.sx[prop] = (theme) => {
        // const lookedUpValue = theme[SCALES[prop]][cssPropValue];
        // console.log(": lookedUpValue", lookedUpValue);
        // // prop => backgroundColor
        // // SCALES[prop] => 'color'
        // if (!lookedUpValue) {
        //   throw new Error("We couldn't find a cssPropValue in the theme");
        // }
        const scale = get(theme, SCALES[prop] /* space, colors, etc */);

        if (!scale)
          throw new Error(
            `Cannot specify "${prop}" because no "${SCALES[prop]}" scale is defined in the theme.`
          );

        const valuesToCheck = Array.isArray(cssPropValue)
          ? cssPropValue
          : [cssPropValue];

        valuesToCheck.forEach((toCheck) => {
          const scaleValue = get(scale, toCheck);

          if (!scaleValue) {
            throw new Error(
              `Cannot use a non-theme cssPropValue "${toCheck}" for "${prop}". Please either use a theme cssPropValue or add a new cssPropValue to the theme.`
            );
          }
        });

        return cssPropValue;
      };
    }
  }
}

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

const PSEUDO_SELECTORS = [":active", ":focus", ":hover"];

const THEME_PROPS = ["colors", "space"];

const THEME_AWARE_PROPS = [
  // General
  "box-sizing",
  "float",
  "margin",
  "margin-top",
  "margin-left",
  "margin-right",
  "margin-bottom",
  "margin-x",
  "margin-y",
  "display", // TBD!
  // Flexbox
  "justify-content",
  "align-items",
  "order",
  "flex-direction",
  "flex-grow",
  "flex-wrap",
  "flex-shrink",
  "flex-basis",
  "flex-flow",
  "flex",
  "align-self",
  "align-content",
  // Grid
  "grid-column-start",
  "grid-column-end",
  "grid-row-start",
  "grid-row-end",
  "grid-template-columns",
  "grid-template-rows",
  "grid-column",
  "grid-row",
  "grid-area",
  "grid-template-areas",
  "justify-self",
  "grid-template",
  "grid-column-gap",
  "grid-row-gap",
  "grid-gap",
  "place-self",
  "place-items",
  "place-content",
  "grid-auto-columns",
  "grid-auto-rows",
  "grid-auto-flow",
  "grid",
];

export const SCALES = {
  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",
  margin: "space",
  marginTop: "space",
  marginRight: "space",
  marginBottom: "space",
  marginLeft: "space",
  marginX: "space",
  marginY: "space",
  padding: "space",
  paddingTop: "space",
  paddingRight: "space",
  paddingBottom: "space",
  paddingLeft: "space",
  paddingX: "space",
  paddingY: "space",
  top: "space",
  right: "space",
  bottom: "space",
  left: "space",
  gridGap: "space",
  gridColumnGap: "space",
  gridRowGap: "space",
  gap: "space",
  columnGap: "space",
  rowGap: "space",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  lineHeight: "lineHeights",
  letterSpacing: "letterSpacings",
  border: "borders",
  borderTop: "borders",
  borderRight: "borders",
  borderBottom: "borders",
  borderLeft: "borders",
  borderWidth: "borderWidths",
  borderStyle: "borderStyles",
  borderRadius: "radii",
  borderTopRightRadius: "radii",
  borderTopLeftRadius: "radii",
  borderBottomRightRadius: "radii",
  borderBottomLeftRadius: "radii",
  borderTopWidth: "borderWidths",
  borderTopColor: "colors",
  borderTopStyle: "borderStyles",
  borderBottomWidth: "borderWidths",
  borderBottomColor: "colors",
  borderBottomStyle: "borderStyles",
  borderLeftWidth: "borderWidths",
  borderLeftColor: "colors",
  borderLeftStyle: "borderStyles",
  borderRightWidth: "borderWidths",
  borderRightColor: "colors",
  borderRightStyle: "borderStyles",
  outlineColor: "colors",
  boxShadow: "shadows",
  textShadow: "shadows",
  zIndex: "zIndices",
  width: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  height: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",
  flexBasis: "sizes",
  size: "sizes",
  // svg
  fill: "colors",
  stroke: "colors",
};
