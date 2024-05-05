import React from "react";
import styled from "styled-components";
import { APP_COLORS, APP_FONT_SIZES } from "../theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

Container.displayName = "Container";

const Label = styled.label`
  margin-bottom: 5px;
  color: ${APP_COLORS.darkBlue};
  font-size: ${APP_FONT_SIZES.s.fontSize};
  font-weight: ${APP_FONT_SIZES.s.fontWeight};
  line-height: ${APP_FONT_SIZES.s.lineHeight};
  text-align: left;
`;

Label.displayName = "Label";

const StyledInput = styled.input<{ $theme: IInputTheme }>`
  border: ${(props) => props.$theme.border};
  box-shadow: ${(props) => props.$theme.boxShadow};
  border-radius: 6px;
  width: 100%;
  height: 40px;
  // It says 8px, 12px, 8px, 12px in Figma,
  // but this is the real value I get
  // when I use PixelPerfect extenstion to check
  // the final design ¯\_(ツ)_/¯
  padding: 8px 12px 5px 11px;

  &:focus {
    outline: none;
  }
`;

StyledInput.displayName = "StyledInput";

const StyledTextarea = styled.textarea<{ $theme: IInputTheme }>`
  border: ${(props) => props.$theme.border};
  box-shadow: ${(props) => props.$theme.boxShadow};
  border-radius: 6px;
  width: 100%;
  height: 236px;
  // It says 12px, 14px, 12px, 14px in Figma,
  // but this is the real value I get
  // when I use PixelPerfect extenstion to check
  // the final design ¯\_(ツ)_/¯
  padding: 12px 14px 12px 12px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

StyledTextarea.displayName = "StyledTextarea";

const LimitContainer = styled.div`
  font-size: ${APP_FONT_SIZES.s.fontSize};
  font-weight: 400; // A bit smaller than in the theme. Talk to a designer!
  line-height: ${APP_FONT_SIZES.s.lineHeight};
  text-align: left;
  margin-top: 8px;
  margin-left: -1px;
`;

LimitContainer.displayName = "LimitContainer";

interface IInputTheme {
  border: React.CSSProperties["border"];
  boxShadow: React.CSSProperties["boxShadow"];
}

// With grey border.
const DEFAULT_THEME: IInputTheme = {
  border: `1px solid ${APP_COLORS.borderGrey}`,
  boxShadow: "none",
};

// With red border and red shadow.
const ERROR_THEME: IInputTheme = {
  border: `1px solid ${APP_COLORS.errorRed}`,
  boxShadow: `0px 0px 0px 4px ${APP_COLORS.shadowRed}, 0px 1px 2px 0px ${APP_COLORS.shadowGrey}`,
};

// With green border and green shadow.
const VALIDATED_THEME: IInputTheme = {
  border: `1px solid ${APP_COLORS.successGreen}`,
  boxShadow: `0px 0px 0px 4px ${APP_COLORS.shadowGreen}, 0px 1px 2px 0px ${APP_COLORS.shadowGrey}`,
};

StyledInput.defaultProps = {
  $theme: DEFAULT_THEME,
};

const INPUT_THEMES = {
  default: DEFAULT_THEME, // with grey border
  error: ERROR_THEME, // with red border and red shadow
  validated: VALIDATED_THEME, // with green border and green shadow
};

type TProps = {
  label: string;
  limit?: number;
  mode: "input" | "textarea";
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Input: React.FC<TProps> = ({
  label,
  limit = null,
  mode = "input",
  name,
  placeholder,
  value,
  onChange,
}) => {
  const theme = (() => {
    if (!limit || value.length === 0) {
      return INPUT_THEMES.default;
    }

    if (limit && value.length > limit) {
      return INPUT_THEMES.error;
    }

    return INPUT_THEMES.validated;
  })();

  const Component: React.ElementType =
    mode === "input" ? StyledInput : StyledTextarea;

  return (
    <Container>
      <Label>{label}</Label>
      <Component
        name={name}
        placeholder={placeholder || ""}
        $theme={theme}
        value={value}
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          onChange(event);
        }}
      />
      {limit !== null && (
        <LimitContainer>{`${value.length}/${limit}`}</LimitContainer>
      )}
    </Container>
  );
};

Input.displayName = "Input";

export { Input };
