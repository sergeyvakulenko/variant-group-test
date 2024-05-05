import React from "react";
import styled, { css } from "styled-components";
import { APP_COLORS } from "../theme";

const StyledButton = styled.button<{
  disabled: boolean;
  $fullWidth: boolean;
  $size: IButtonSize;
  $theme: IButtonTheme;
  $title: string | undefined;
}>`
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  display: inline-flex;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 6px;

  font-size: ${(props) => props.$size.fontSize};
  gap: ${(props) => props.$size.gap};
  padding: ${(props) => props.$size.padding};

  color: ${(props) => props.$theme.color};
  background-color: ${(props) => props.$theme.backgroundColor};
  border: ${(props) => props.$theme.border};

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `};
`;

StyledButton.displayName = "StyledButton";

const TitleContainer = styled.span<{ $shrink: boolean }>`
  display: ${(props) => (!!props.$shrink ? "none" : "inline")};

  @media (min-width: 768px) {
    display: inline;
  }
`;

TitleContainer.displayName = "TitleContainer";

interface IButtonSize {
  gap?: React.CSSProperties["gap"];
  fontSize?: React.CSSProperties["fontSize"];
  padding?: React.CSSProperties["padding"];
}

const SMALL_SIZE = {
  fontSize: "16px",
  gap: "6px",
  padding: "0",
};

const MEDIUM_SIZE = {
  fontSize: "16px",
  gap: "8px",
  padding: "7px",
};

const LARGE_SIZE = {
  fontSize: "16px",
  gap: "4px",
  padding: "10px 18px",
};

const EXTRALARGE_SIZE = {
  fontSize: "18px",
  gap: "4px",
  padding: "16px 28px",
};

const BUTTON_SIZES = {
  s: SMALL_SIZE,
  m: MEDIUM_SIZE,
  l: LARGE_SIZE,
  xl: EXTRALARGE_SIZE,
};

export type TButtonSize = keyof typeof BUTTON_SIZES;

interface IButtonTheme {
  backgroundColor?: React.CSSProperties["backgroundColor"];
  border?: React.CSSProperties["border"];
  color: React.CSSProperties["color"];
}

// With border, without fill.
const DEFAULT_THEME: IButtonTheme = {
  backgroundColor: "transparent",
  border: `1px solid ${APP_COLORS.borderGrey}`,
  color: APP_COLORS.darkBlue,
};

// With border, with fill.
const PRIMARY_THEME: IButtonTheme = {
  backgroundColor: APP_COLORS.green,
  border: `1px solid ${APP_COLORS.green}`,
  color: APP_COLORS.white,
};

// Without both border and fill.
// In design, the gap between the icon and the text is different
// for Delete and CopyToClipboard components — why?
// I unified it to 6px for now, but TODO: talk to a designer about that!
const TEXT_THEME: IButtonTheme = {
  backgroundColor: "transparent",
  border: "none",
  color: APP_COLORS.grey,
};

// A variation on the PRIMARY of sorts.
// TODO: think of better solution instead of
// introducing a new theme.
const DISABLED_THEME: IButtonTheme = {
  backgroundColor: APP_COLORS.borderGrey,
  border: `1px solid ${APP_COLORS.borderGrey}`,
  color: APP_COLORS.disabledGrey,
};

StyledButton.defaultProps = {
  $size: SMALL_SIZE,
  $theme: TEXT_THEME,
};

const BUTTON_THEMES = {
  default: DEFAULT_THEME, // with border, without fill
  primary: PRIMARY_THEME, // with border, with fill
  text: TEXT_THEME, // without both border and fill
  disabled: DISABLED_THEME, // with border, with fill
};

export type TButtonTheme = keyof typeof BUTTON_THEMES;

interface IBasicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  fullWidth?: boolean;
  shrink?: boolean;
  size?: TButtonSize;
  theme?: TButtonTheme;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type TButtonIcon = {
  component: React.ReactNode;
  placement?: EIconPlacement;
};

interface ITextButtonProps extends IBasicButtonProps {
  icon?: TButtonIcon;
  title: string;
}

interface IIconButtonProps extends IBasicButtonProps {
  icon: TButtonIcon;
  title?: string;
}

// To make either icon or title required.
type TProps = ITextButtonProps | IIconButtonProps;

export enum EIconPlacement {
  left,
  right,
}

const Button: React.FC<TProps> = ({
  disabled = false,
  fullWidth = false,
  icon,
  shrink = false,
  size = "s",
  theme = "default",
  title,
  type,
  onClick,
}) => {
  // Defaults to left.
  const placement =
    icon && icon.component && (icon.placement || EIconPlacement.left);

  return (
    <StyledButton
      disabled={disabled}
      $fullWidth={fullWidth}
      $size={BUTTON_SIZES[size] || BUTTON_SIZES.m}
      $theme={
        disabled
          ? BUTTON_THEMES.disabled
          : BUTTON_THEMES[theme] || BUTTON_THEMES.default
      }
      $title={title}
      type={type}
      onClick={onClick}
    >
      {placement === EIconPlacement.left && icon?.component}
      {title && <TitleContainer $shrink={shrink}>{title}</TitleContainer>}
      {placement === EIconPlacement.right && icon?.component}
    </StyledButton>
  );
};

Button.displayName = "Button";

export { Button };
