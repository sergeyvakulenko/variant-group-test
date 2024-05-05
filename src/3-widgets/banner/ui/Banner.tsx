import React from "react";
import styled from "styled-components";
import { CreateNew } from "~/4-features/create-new";
import {
  DEFAULT_SCALE,
  ProgressBar,
  TTextAlign,
  TTextType,
} from "~/4-features/progress-bar";
import { selectLetters } from "~/5-entities/letter";
import { useAppSelector } from "~/6-shared/lib";
import { APP_COLORS, APP_FONTS, APP_FONT_SIZES } from "~/6-shared/ui-kit";

const Container = styled.div`
  width: 100%;
  flex: 0 0 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${APP_COLORS.backgroundGreen};
`;

Container.displayName = "Container";

const TextContainer = styled.div`
  text-align: center;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
  width: 100%;

  @media (min-width: 768px) {
    width: 470px;
  }
`;

TextContainer.displayName = "TextContainer";

const Heading = styled.h2`
  font-family: ${APP_FONTS.heading};
  font-size: ${APP_FONT_SIZES.l.fontSize};
  font-weight: ${APP_FONT_SIZES.l.fontWeight};
  line-height: ${APP_FONT_SIZES.l.lineHeight};
  text-align: center;
  color: ${APP_COLORS.headingGrey};
  letter-spacing: 0.26px;
  padding-left: 5px;
`;

Heading.displayName = "Heading";

const BodyText = styled.span`
  font-size: ${APP_FONT_SIZES.m.fontSize};
  font-weight: ${APP_FONT_SIZES.m.fontWeight};
  line-height: ${APP_FONT_SIZES.m.lineHeight};
  text-align: center;
  color: ${APP_COLORS.textGrey};
  white-space: pre-line;
`;

BodyText.displayName = "BodyText";

const Banner: React.FC<{}> = ({}) => {
  const { letters } = useAppSelector(selectLetters);

  return (
    <Container>
      <TextContainer>
        <Heading>Hit your goal</Heading>
        <BodyText>
          Generate and send out couple more job applications today to get hired
          faster
        </BodyText>
        <CreateNew size="xl" />
        <ProgressBar
          type="worm"
          progress={letters.length * DEFAULT_SCALE}
          textAlign={TTextAlign.bottom}
          textType={TTextType.short}
        />
      </TextContainer>
    </Container>
  );
};

Banner.displayName = "Banner";

export { Banner };
