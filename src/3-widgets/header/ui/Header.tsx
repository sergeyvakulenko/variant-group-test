import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  DEFAULT_SCALE,
  ProgressBar,
  TTextAlign,
  TTextType,
} from "~/4-features/progress-bar";
import { selectLetters } from "~/5-entities/letter";
import { useAppSelector } from "~/6-shared/lib";
import { APP_COLORS, Button, Icon } from "~/6-shared/ui-kit";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  margin-bottom: 32px;
`;

Container.displayName = "Container";

const InnerContainer = styled.div<{ $gap?: number | undefined }>`
  gap: ${(props) => (props.$gap !== undefined ? `${props.$gap}px` : "12px")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

InnerContainer.displayName = "InnerContainer";

const LogotypeContainer = styled.div`
  display: none;

  @media (min-width: 425px) {
    display: block;
  }
`;

LogotypeContainer.displayName = "LogotypeContainer";

const Header: React.FC<{}> = ({}) => {
  const { letters } = useAppSelector(selectLetters);

  return (
    <Container>
      <InnerContainer>
        <Icon name="logomark" size="l" />
        <LogotypeContainer>
          <Icon height={22} margin={0} name="logotype" width={122} />
        </LogotypeContainer>
      </InnerContainer>
      <InnerContainer $gap={20}>
        <ProgressBar
          type="dot"
          progress={letters.length * DEFAULT_SCALE}
          shrink
          size="s"
          textAlign={TTextAlign.left}
          textType={TTextType.long}
        />
        {/* TODO: Create pathKeys object to manage URIs. */}
        <Link to="/">
          <Button
            icon={{
              component: <Icon color={APP_COLORS.grey} name="home" />,
            }}
            size="m"
            theme="default"
          />
        </Link>
      </InnerContainer>
    </Container>
  );
};

Header.displayName = "Header";

export { Header };
