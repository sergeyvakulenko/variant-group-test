import React, { useState } from "react";
import {
  APP_COLORS,
  Button,
  EIconPlacement,
  Icon,
  TIconName,
} from "~/6-shared/ui-kit";

type TProps = {
  content: string;
};

interface ICopyToClipboardTheme {
  icon: TIconName;
  text: string;
}

const THEMES: Record<string, ICopyToClipboardTheme> = {
  initial: {
    icon: "copy",
    text: "Copy to clipboard",
  },
  success: {
    icon: "check",
    text: "Copied!",
  },
};

const CopyToClipboard: React.FC<TProps> = ({ content }) => {
  const [icon, setIcon] = useState<TIconName>(THEMES.initial.icon);
  const [caption, setCaption] = useState<string>(THEMES.initial.text);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // To prevent letter page redirect.
    e.preventDefault();
    e.stopPropagation();
    // Write text to clipboard
    navigator.clipboard.writeText(content);
    // Change icon & caption to indicate success
    setIcon(THEMES.success.icon);
    setCaption(THEMES.success.text);
    // Change icon & caption back later
    setTimeout(() => {
      setIcon(THEMES.initial.icon);
      setCaption(THEMES.initial.text);
    }, 1000);
    // TODO: Animate this change! Make it beautiful.
  };

  return (
    <Button
      shrink
      icon={{
        component: <Icon color={APP_COLORS.grey} name={icon} />,
        placement: EIconPlacement.right,
      }}
      theme="text"
      title={caption}
      onClick={handleClick}
    />
  );
};

CopyToClipboard.displayName = "CopyToClipboard";

export { CopyToClipboard };
