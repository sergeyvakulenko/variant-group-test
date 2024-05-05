import React from "react";
import styled, { css } from "styled-components";
import { APP_COLORS, APP_FONT_SIZES } from "../theme";

const Container = styled.div<{ $theme: ICardTheme }>`
  width: 100%;
  padding: 24px;
  gap: 0px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${APP_COLORS.backgroundGrey};
  display: flex;
  flex-direction: column;
  cursor: ${(props) => props.$theme.cursor || "240px"};
  height: ${(props) => props.$theme.height || "240px"};
  min-height: ${(props) => props.$theme.minHeight || "240px"};

  @media (min-width: 1024px) {
    max-width: 552px;
  }
`;

Container.displayName = "Container";

// I checked, and this solution is not supported in IE and some Operas.
// TODO: talk to a designer or find better solution.
const TruncateStyles = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);

  @media (min-width: 375px) {
    -webkit-line-clamp: 6;
    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  }
`;

const Content = styled.div<{ $truncate: boolean }>`
  flex-grow: 1;
  white-space: pre-line;
  font-size: ${APP_FONT_SIZES.m.fontSize};
  font-weight: ${APP_FONT_SIZES.m.fontWeight};
  line-height: ${APP_FONT_SIZES.m.lineHeight};
  color: ${APP_COLORS.textGrey};
  text-align: left;
  padding-bottom: 16px;

  ${(props) => props.$truncate && TruncateStyles}
`;

Content.displayName = "Content";

const Actions = styled.div<{
  $direction: React.CSSProperties["justifyContent"];
}>`
  display: flex;
  justify-content: ${(props) => props.$direction};
`;

Actions.displayName = "Actions";

interface ICardTheme {
  cursor: React.CSSProperties["cursor"];
  height: React.CSSProperties["height"];
  minHeight: React.CSSProperties["minHeight"];
}

const DEFAULT_THEME: ICardTheme = {
  cursor: "pointer",
  height: "240px",
  minHeight: "240px",
};

const BIG_THEME: ICardTheme = {
  cursor: "default",
  height: "inherit",
  minHeight: "600px",
};

const CARD_THEMES = {
  default: DEFAULT_THEME,
  big: BIG_THEME,
};

type TProps = {
  children: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  theme?: keyof typeof CARD_THEMES;
};

const Card: React.FC<TProps> = ({
  children,
  primaryAction,
  secondaryAction,
  theme = "default",
}) => (
  <Container $theme={CARD_THEMES[theme] || CARD_THEMES["default"]}>
    <Content $truncate={theme === "default"}>{children}</Content>
    {(primaryAction || secondaryAction) && (
      <Actions $direction={!primaryAction ? "flex-end" : "space-between"}>
        {primaryAction}
        {secondaryAction}
      </Actions>
    )}
  </Container>
);

Card.displayName = "Card";

export { Card };
