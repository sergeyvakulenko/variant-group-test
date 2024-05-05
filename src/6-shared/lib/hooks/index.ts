import React, { useCallback, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// TODO: Mask FSD violation by declaring a global type.
import { AppDispatch, RootState } from "~/1-app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type useInputReturn = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void
];

export const useInput = (initialValue: string): useInputReturn => {
  const [value, setValue] = useState(initialValue);

  const update = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const reset = (): void => {
    setValue(initialValue);
  };

  return [value, update, reset];
};

type useToggleReturn = [boolean, () => void];

export const useToggle = (initialValue = false): useToggleReturn => {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => {
    setState(!state);
  }, [state]);

  return [state, toggle];
};
