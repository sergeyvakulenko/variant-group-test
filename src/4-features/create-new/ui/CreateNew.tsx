import React from "react";
import { Link } from "react-router-dom";
import { APP_COLORS, Button, Icon, TButtonSize } from "~/6-shared/ui-kit";

type TProps = {
  shrink?: boolean;
  size?: TButtonSize;
};

// TODO: Create pathKeys object to manage URIs. */
const CreateNew: React.FC<TProps> = ({ shrink, size = "l" }) => (
  <Link to="/letters/new">
    <Button
      icon={{ component: <Icon color={APP_COLORS.white} name="plus" /> }}
      shrink={shrink}
      size={size}
      theme="primary"
      title="Create New"
    />
  </Link>
);

CreateNew.displayName = "CreateNew";

export { CreateNew };
