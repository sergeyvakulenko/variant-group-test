import React from "react";
import styled from "styled-components";
// TODO: rewrite all these to a dynamic import & dynamic typing!
import { APP_COLORS } from "../theme";
import CheckIcon from "./icons/check.svg?react";
import CopyIcon from "./icons/copy.svg?react";
import DeleteIcon from "./icons/delete.svg?react";
import DotIcon from "./icons/dot.svg?react";
import HomeIcon from "./icons/home.svg?react";
import LogomarkIcon from "./icons/logomark.svg?react";
import LogotypeIcon from "./icons/logotype.svg?react";
import PlusIcon from "./icons/plus.svg?react";
import RepeatIcon from "./icons/repeat.svg?react";
import SpinnerIcon from "./icons/spinner.svg?react";
import WormIcon from "./icons/worm.svg?react";

const Container = styled.div<{
  $height: number | undefined;
  $margin: number | undefined;
  $size: number;
  $width: number | undefined;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) =>
    props.$height ? `${props.$height}px` : `${props.$size}px`};
  margin: ${(props) =>
    props.$margin !== undefined ? `${props.$margin}px` : "2px"};
  width: ${(props) =>
    props.$width ? `${props.$width}px` : `${props.$size}px`};
`;

Container.displayName = "Container";

const SIZES = {
  s: 8,
  m: 20,
  l: 44,
};

// TODO: rewrite all these to a dynamic import & dynamic typing!
const ICONS = {
  check: CheckIcon,
  copy: CopyIcon,
  delete: DeleteIcon,
  dot: DotIcon,
  home: HomeIcon,
  logomark: LogomarkIcon,
  logotype: LogotypeIcon,
  plus: PlusIcon,
  repeat: RepeatIcon,
  spinner: SpinnerIcon,
  worm: WormIcon,
} as const;

export type TIconSize = keyof typeof SIZES;

export type TIconName = keyof typeof ICONS;

type TProps = {
  color?: React.CSSProperties["color"];
  height?: number;
  margin?: number;
  name: TIconName;
  opacity?: number;
  size?: TIconSize;
  width?: number;
};

const Icon: React.FC<TProps> = ({
  color = APP_COLORS.white,
  height,
  margin,
  name,
  opacity = 1,
  size = "m",
  width,
}) => {
  // TODO: Talk to a designer about the fallback icon!
  const IconComponent = ICONS[name] || PlusIcon;

  return (
    <Container
      $height={height}
      $margin={margin}
      $size={SIZES[size] || SIZES.s}
      $width={width}
    >
      <IconComponent color={color} opacity={opacity} />
    </Container>
  );
};

Icon.displayName = "Icon";

export { Icon };
