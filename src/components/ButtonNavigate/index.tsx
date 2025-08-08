import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

type Props = HTMLAttributes<HTMLButtonElement> & {
  textButton: string;
  navigateLink: string;
};

export function ButtonNavigate({ textButton, navigateLink, ...rest }: Props) {
  const navigate = useNavigate();

  const link = navigateLink;

  return (
    <Button variant="dark" onClick={() => navigate(link)} {...rest}>
      {textButton}
    </Button>
  );
}
