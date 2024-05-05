import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CopyToClipboard } from "~/4-features/copy-to-clipboard";
import { Delete } from "~/4-features/delete";
import { TLetter } from "~/5-entities/letter";
import { Card } from "~/6-shared/ui-kit";

const Letter = styled.div`
  flex: 1 0 100%;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    flex: 1 0 49%;
    max-width: 49%;
  }
`;

type TProps = {
  letters: Array<TLetter>;
};

Letter.displayName = "Letter";

const LettersList: React.FC<TProps> = ({ letters }) => {
  const navigate = useNavigate();

  return (
    <>
      {letters.length > 0 &&
        letters.map((letter) => (
          <Letter
            key={letter.id}
            // TODO: Create pathKeys object to manage URIs.
            onClick={() => navigate(`/letters/${letter.id}`)}
          >
            <Card
              primaryAction={<Delete id={letter.id} />}
              secondaryAction={<CopyToClipboard content={letter.text} />}
            >
              {letter.text}
            </Card>
          </Letter>
        ))}
    </>
  );
};

LettersList.displayName = "LettersList";

export { LettersList };
