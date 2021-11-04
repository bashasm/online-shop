const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const initialState = { theme: "light", styles: themes.light };

export default function reducer(state = initialState, action) {
  if (state.theme === "dark") {
    return { theme: "light", styles: themes.light };
  } else {
    return { theme: "dark", styles: themes.dark };
  }
}
