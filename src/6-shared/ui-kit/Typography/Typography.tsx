import React from "react";
import { APP_COLORS } from "../theme";

type TVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TProps = {
  Component?: TVariant;
  children: React.ReactNode;
  color?: React.CSSProperties["color"];
};

const Typography: React.FC<TProps> = ({
  Component = "span",
  children,
  color = APP_COLORS.textGrey,
}) => <Component style={{ color }}>{children}</Component>;

Typography.displayName = "Typography";

export { Typography };
