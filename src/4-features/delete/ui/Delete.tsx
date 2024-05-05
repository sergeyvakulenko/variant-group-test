import React from "react";
import { deleteLetter } from "~/5-entities/letter";
import { useAppDispatch } from "~/6-shared/lib";
import { APP_COLORS, Button, Icon } from "~/6-shared/ui-kit";

type TProps = {
  id: string;
};

const Delete: React.FC<TProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // To prevent letter page redirect.
    e.preventDefault();
    e.stopPropagation();
    // TODO: This feature absolutely needs a confirmation popup!
    // Talk to a designer later, for now — at least something.
    if (confirm("You sure wanna delete this awesome letter?") == true) {
      dispatch(deleteLetter(id));
    }
  };

  return (
    <Button
      icon={{
        component: <Icon color={APP_COLORS.grey} name="delete" />,
      }}
      shrink
      theme="text"
      title="Delete"
      onClick={handleClick}
    />
  );
};

Delete.displayName = "Delete";

export { Delete };
