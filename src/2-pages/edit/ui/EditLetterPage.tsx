import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Banner } from "~/3-widgets/banner";
import { LetterForm } from "~/3-widgets/letter-form";
import { CopyToClipboard } from "~/4-features/copy-to-clipboard";
import { useChatGpt } from "~/4-features/open-ai";
import { selectLetters } from "~/5-entities/letter";
import { useAppSelector } from "~/6-shared/lib";
import { Card } from "~/6-shared/ui-kit";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 48px;
`;

PageContainer.displayName = "PageContainer";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 34px;

  @media (min-width: 768px) {
    flex-direction: row;

    // I don't think that in production
    // your designers will do something like this,
    // but if they will... I can see that, yes :)
    &:nth-child(1) {
      left: 3px;
      position: relative;
    }
  }
`;

MainContainer.displayName = "MainContainer";

const SideContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

MainContainer.displayName = "MainContainer";

const EditLetterPage: React.FC<{}> = ({}) => {
  const params = useParams();
  const letterId = params.letterId;

  const { letters } = useAppSelector(selectLetters);
  const letter = letters.find((letter) => letter.id === letterId);

  const { loading, response, rewriteLetter } = useChatGpt();

  return (
    <PageContainer>
      <MainContainer>
        <SideContainer>
          <LetterForm
            letter={letter}
            loading={loading}
            response={response}
            rewriteLetter={rewriteLetter}
          />
        </SideContainer>
        <SideContainer>
          <Card
            secondaryAction={
              letter && <CopyToClipboard content={letter?.text} />
            }
            theme="big"
          >
            {letter?.text ||
              "Your personalized job application will appear here..."}
          </Card>
        </SideContainer>
      </MainContainer>
      {letter && letters.length < 5 && <Banner />}
    </PageContainer>
  );
};

EditLetterPage.displayName = "EditLetterPage";

export { EditLetterPage };
