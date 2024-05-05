import React from "react";
import styled from "styled-components";
import { APP_COLORS, APP_FONT_SIZES, Icon, TIconSize } from "~/6-shared/ui-kit";

const Container = styled.div<{
  direction: React.CSSProperties["flexDirection"];
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
`;

Container.displayName = "Container";

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

BarContainer.displayName = "BarContainer";

const TextContainer = styled.div<{
  $align: TTextAlign;
  $shrink: boolean | undefined;
}>`
  font-size: ${APP_FONT_SIZES.m.fontSize};
  font-weight: ${APP_FONT_SIZES.m.fontWeight};
  line-height: ${APP_FONT_SIZES.m.lineHeight};
  text-align: center;
  color: ${APP_COLORS.textGrey};
  margin-left: ${(props) => (props.$align === TTextAlign.right ? "16px" : "0")};
  margin-right: ${(props) => (props.$align === TTextAlign.left ? "16px" : "0")};
  display: ${(props) => (!!props.$shrink ? "none" : "block")};

  @media (min-width: 768px) {
    display: block;
  }
`;

TextContainer.displayName = "TextContainer";

export enum TTextAlign {
  top,
  right,
  bottom,
  left,
}

export enum TTextType {
  none,
  short,
  long,
}

type TProps = {
  progress: number; // TODO: Add IntRange type to restrict to 0 to 100
  scale?: number; // TODO: Add IntRange type to restrict to 0 to 100
  shrink?: boolean;
  size?: TIconSize;
  textAlign: TTextAlign;
  textType: TTextType;
  type: "dot" | "worm"; // TODO: Derive from TIconName
};

export const DEFAULT_SCALE = 20;
export const SCALE_END = 100;

const ProgressBar: React.FC<TProps> = ({
  progress,
  scale = DEFAULT_SCALE,
  shrink,
  size = "m",
  textAlign,
  textType,
  type,
}) => {
  const text = (() => {
    switch (textType) {
      case TTextType.none:
        return null;
      case TTextType.short:
        return `${progress / scale} out of ${SCALE_END / scale}`;
      case TTextType.long:
        return `${progress / scale}/${
          SCALE_END / scale
        } applications generated`;
    }
  })();
  return (
    <Container
      direction={
        [TTextAlign.left, TTextAlign.right].includes(textAlign)
          ? "row"
          : "column"
      }
    >
      {[TTextAlign.left, TTextAlign.top].includes(textAlign) && (
        <TextContainer $align={textAlign} $shrink={shrink}>
          {text}
        </TextContainer>
      )}
      <BarContainer>
        {progress < 100 ? (
          <>
            {[20, 40, 60, 80, 100].map((stage) => (
              <Icon
                key={stage}
                color={APP_COLORS.headingGrey}
                name={type}
                opacity={progress >= stage ? 1 : 0.24}
                size={size}
                width={type === "worm" ? 35 : 8}
              />
            ))}
          </>
        ) : (
          <Icon name="check" />
        )}
      </BarContainer>
      {[TTextAlign.right, TTextAlign.bottom].includes(textAlign) && (
        <TextContainer $align={textAlign} $shrink={shrink}>
          {text}
        </TextContainer>
      )}
    </Container>
  );
};

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
