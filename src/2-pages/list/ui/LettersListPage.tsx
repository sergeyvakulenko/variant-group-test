import React from "react";
import styled from "styled-components";
import { Banner } from "~/3-widgets/banner";
import { EmptyState, LettersList } from "~/3-widgets/letters-list";
import { CreateNew } from "~/4-features/create-new";
import { selectLetters } from "~/5-entities/letter";
import { useAppSelector } from "~/6-shared/lib";
import { APP_COLORS, APP_FONTS, APP_FONT_SIZES } from "~/6-shared/ui-kit";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

PageContainer.displayName = "PageContainer";

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: ${`1px solid ${APP_COLORS.headerBorderGrey}`};
  margin-bottom: 22px;
`;

PageTitle.displayName = "PageTitle";

const Heading = styled.h2`
  font-family: ${APP_FONTS.heading};
  font-size: ${APP_FONT_SIZES.l.fontSize};
  font-weight: ${APP_FONT_SIZES.l.fontWeight};
  line-height: ${APP_FONT_SIZES.l.lineHeight};
  text-align: left;

  @media (min-width: 768px) {
    font-size: ${APP_FONT_SIZES.xl.fontSize};
    font-weight: ${APP_FONT_SIZES.xl.fontWeight};
    line-height: ${APP_FONT_SIZES.xl.lineHeight};
  }
`;

Heading.displayName = "Heading";

const PageContent = styled.div<{ $count: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: 25px 19px;
  margin-bottom: 48px;
  flex: 1 1 auto;
  align-items: center;
  justify-content: ${(props) =>
    (props.$count & 1) == 1 ? "flex-start" : "center"};
`;

PageContent.displayName = "PageContent";

const LettersListPage: React.FC<{}> = ({}) => {
  const { letters } = useAppSelector(selectLetters);

  return (
    <PageContainer>
      <PageTitle>
        <Heading>Applications</Heading>
        <CreateNew shrink />
      </PageTitle>
      <PageContent $count={letters.length}>
        <LettersList letters={letters} />
        {letters.length === 0 && <EmptyState />}
      </PageContent>
      {letters.length < 5 && <Banner />}
    </PageContainer>
  );
};

LettersListPage.displayName = "LettersListPage";

export { LettersListPage };
