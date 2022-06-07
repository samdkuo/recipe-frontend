const isLightMode = true;

export type TextThemeColor =
  | "primary"
  | "primaryMuted"
  | "secondary"
  | "tertiary"
  | "text"
  | "white"
  | "gray050"
  | "gray100"
  | "gray200"
  | "gray300"
  | "gray400"
  | "gray500"
  | "gray600"
  | "gray700"
  | "gray800"
  | "gray900"
  | "gray950"
  | "black"
  | "pink"
  | "purple"
  | "deepPurple"
  | "indigo"
  | "darkBlue"
  | "blue"
  | "lightBlue"
  | "cyan"
  | "teal"
  | "green"
  | "lightGreen"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deepOrange"
  | "brown";

/* background-color: #fcd378; */
/* background-color: #f7dccc; */
export const colors = {
  // Elemental
  primary: "#ff775c",
  tertiary: "#fcd378",
  primaryMuted: "#fcd4a8",
  secondary: "#fc9f61",
  text: "#f6f3e4",
  background: "#FFFFFA",

  // Grays
  white: "#FFFFFF",
  gray050: "#FBFCFD",
  gray075: "#F5F7FA",
  gray100: "#EBEEF4",
  gray200: "#CAD0DA",
  gray300: "#BEC2CD",
  gray400: "#9A9EAA",
  gray500: "#757A87",
  gray600: "#6A6E79",
  gray700: "#3E4650",
  gray800: "#2D3238",
  gray900: "#1A1F27",
  gray950: "#11151A",
  black: "#04070B",

  // Rainbow
  pink: isLightMode ? "#DA4F7A" : "#F76894",
  purple: isLightMode ? "#9F4EB6" : "#CD77E6",
  deepPurple: isLightMode ? "#7859BC" : "#A984FA",
  indigo: isLightMode ? "#5F6BBA" : "#8292FA",
  darkBlue: isLightMode ? "#4D7CDB" : "#6998F5",
  blue: isLightMode ? "#5EA3EF" : "#73B5FF",
  lightBlue: isLightMode ? "#59B3F0" : "#7EC9FC",
  cyan: isLightMode ? "#5FC3D7" : "#79DEF2",
  teal: isLightMode ? "#52A39A" : "#4CBFB3",
  green: isLightMode ? "#7BB972" : "#7CBF73",
  lightGreen: isLightMode ? "#A6CA72" : "#ACD96C",
  lime: isLightMode ? "#D6E06D" : "#C8D96C",
  yellow: isLightMode ? "#FDEF72" : "#FFF38C",
  amber: isLightMode ? "#F7CC50" : "#FFDB73",
  orange: isLightMode ? "#F3AB47" : "#FFBF66",
  deepOrange: isLightMode ? "#EE7850" : "#FF8D66",
  brown: isLightMode ? "#886F65" : "#B29285",
};

export function colorBrightness(hex: string, lum: number): string {
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  let rgb = "#";
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}
