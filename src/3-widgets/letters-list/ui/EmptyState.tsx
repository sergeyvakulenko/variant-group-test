import React from "react";
import styled from "styled-components";
import { generateLetters } from "~/5-entities/letter";
import { useAppDispatch } from "~/6-shared/lib";
import { Button, Typography } from "~/6-shared/ui-kit";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  text-align: center;
`;

Container.displayName = "Container";

const EmptyState: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();

  const handleGenerateLetters = () => {
    dispatch(generateLetters());
  };

  return (
    <Container>
      <Typography Component="h3">So many letters to create!</Typography>
      <Typography Component="p">
        Click "Generate" to set some example or "Create New" to outline your own
        ideas!
      </Typography>
      <Button size="xl" title="Generate" onClick={handleGenerateLetters} />
    </Container>
  );
};

EmptyState.displayName = "EmptyState";

export { EmptyState };
