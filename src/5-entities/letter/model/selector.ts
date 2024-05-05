// TODO: Mask FSD violation by declaring a global type.
import { RootState } from "~/1-app/store";

export const selectLetters = (state: RootState) => state.letters;
