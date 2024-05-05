import React, { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TUseChatGpt } from "~/4-features/open-ai";
import { TLetter, createLetter, updateLetter } from "~/5-entities/letter";
import { useAppDispatch } from "~/6-shared/lib";
import {
  APP_COLORS,
  APP_FONTS,
  Button,
  Icon,
  Input,
  Typography,
} from "~/6-shared/ui-kit";

const FormTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  border-bottom: ${`1px solid ${APP_COLORS.headerBorderGrey}`};
  margin-bottom: 16px;
  padding-bottom: 10px;
  font-family: ${APP_FONTS.heading};
  // Font settings are different
  // from "m" size in the theme!
  // Talk to a designer.
  font-size: 17px;
  font-weight: 600;
  line-height: 45px;
  letter-spacing: 0.7px;
`;

FormTitle.displayName = "FormTitle";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  margin-bottom: 17px;
`;

FormContainer.displayName = "FormContainer";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

RowContainer.displayName = "RowContainer";

type TProps = {
  letter: TLetter | undefined;
} & TUseChatGpt;

type TState = {
  position: string;
  company: string;
  skills: string;
  details: string;
};

type TRule = {
  required: boolean;
  characterLimit?: number;
};

const VALIDATION_RULES: { [key in keyof TState]: TRule } = {
  position: {
    required: true,
  },
  company: {
    required: true,
  },
  skills: {
    required: true,
  },
  details: {
    required: false,
    characterLimit: 1200,
  },
};

const defaultState = {
  position: "",
  company: "",
  skills: "",
  details: "",
};

// TODO: Extract abstract Form component to ui-kit for
// future usage (or integrate a library).
const LetterForm: React.FC<TProps> = ({
  letter,
  loading,
  response,
  rewriteLetter,
}) => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<TState>(letter ? letter.data : defaultState);

  // I was impressed how you managed to include a classic
  // FizzBuzz in this task, by the way :D Great job!
  // Here's my take on the timeless classic:
  const heading = (() => {
    const position = form.position || letter?.data.position;
    const company = form.company || letter?.data.company;

    return position && company
      ? `${position}, ${company}`
      : position || company || null;
  })();

  const validate = (data: TState) => {
    for (const field of Object.keys(data)) {
      const fieldValue = data[field as keyof TState];
      const fieldRules = VALIDATION_RULES[field as keyof TState];

      if (fieldRules.required && !fieldValue) {
        return false;
      }

      if (
        fieldRules.characterLimit &&
        fieldValue.length > fieldRules.characterLimit
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate(form)) {
      const initialText = `Dear [${
        form.company
      }] Team,\n\nI am writing to express my interest in the [${
        form.position
      }] position.\n\nMy experience in the realm combined with my skills in [${
        form.skills
      }] make me a strong candidate for this role.${
        form.details.length > 0 ? `\n\n[${form.details}]` : ""
      }\n\nI am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.\n\nThank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;

      rewriteLetter(initialText);
    }
  };

  useEffect(() => {
    const text = response.replace(/[\[\]]/g, "");
    if (!loading && text !== "" && text !== letter?.text) {
      mutateLetter(text);
    }
  }, [loading]);

  const mutateLetter = (text: string) => {
    // Specific case: updating existing letter.
    if (letter?.id) {
      dispatch(
        updateLetter({
          ...letter,
          data: form,
          text,
        })
      );
      return;
    }

    // Default case: create new letter.
    dispatch(
      createLetter({
        id,
        data: form,
        text,
      })
    );

    // TODO: Create pathKeys object to manage URIs.
    navigate(`/letters/${id}`);
  };

  const buttonIcon = letter
    ? {
        component: (
          <Icon
            color={
              !validate(form) ? APP_COLORS.disabledGrey : APP_COLORS.darkBlue
            }
            name="repeat"
          />
        ),
      }
    : undefined;

  return (
    <>
      <FormTitle>
        <Typography
          Component="h1"
          color={heading ? APP_COLORS.headingGrey : APP_COLORS.textGrey}
        >
          {heading || "New application"}
        </Typography>
      </FormTitle>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <RowContainer>
            <Input
              label="Job title*"
              mode="input"
              name="position"
              placeholder="Product Manager"
              value={form.position}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, position: e.target.value }))
              }
            />
            <Input
              label="Company*"
              mode="input"
              name="company"
              placeholder="Apple"
              value={form.company}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, company: e.target.value }))
              }
            />
          </RowContainer>
          <Input
            label="I am good at...*"
            mode="input"
            name="skills"
            placeholder="HTML, CSS and doing things in time"
            value={form.skills}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, skills: e.target.value }))
            }
          />
          <Input
            label="Additional details"
            limit={VALIDATION_RULES.details.characterLimit}
            mode="textarea"
            name="details"
            placeholder="Describe why you are a great fit or paste your bio"
            value={form.details}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, details: e.target.value }))
            }
          />
        </FormContainer>
        <Button
          disabled={!validate(form)}
          fullWidth
          icon={buttonIcon}
          size="xl"
          title={
            loading ? "Loading... " : letter ? "Try Again" : "Generate Now"
          }
          theme={letter ? "default" : "primary"}
          type="submit"
        />
      </form>
    </>
  );
};

LetterForm.displayName = "LetterForm";

export { LetterForm };
