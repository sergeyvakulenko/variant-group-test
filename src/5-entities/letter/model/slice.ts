import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mock } from "./mock";

export type TLetter = {
  id: string;
  data: {
    position: string;
    company: string;
    skills: string;
    details: string;
  };
  text: string;
};

type TLettersSlice = {
  letters: Array<TLetter>;
};

const initialState = { letters: [] } satisfies TLettersSlice as TLettersSlice;

export const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    generateLetters(state) {
      state.letters = [...mock.letters];
    },
    createLetter(state, action: PayloadAction<TLetter>) {
      state.letters.push(action.payload);
    },
    updateLetter(state, action: PayloadAction<TLetter>) {
      state.letters = state.letters.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deleteLetter(state, action: PayloadAction<string>) {
      state.letters = state.letters.filter((p) => p.id !== action.payload);
    },
  },
});

export const { generateLetters, createLetter, updateLetter, deleteLetter } =
  lettersSlice.actions;
export default lettersSlice.reducer;
