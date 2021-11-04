import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
    styles: { foreground: "#000000", background: "#eeeeee" },
  },
  reducers: {
    toggle: (state, action) => {
      if (state.theme === "light") {
        state.styles = { foreground: "#ffffff", background: "#222222" };
      } else {
        state.styles = { foreground: "#000000", background: "#eeeeee" };
      }
    },
  },
});

export const { toggle } = slice.actions;
export default slice.reducer;
