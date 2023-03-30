import Button from "react-bootstrap/Button";

import { MdEdit } from "react-icons/md";

type Props = {
  content?: string;
  handleClick?: () => void;
};

export function ButtonEdit({ content, handleClick }: Props) {
  return (
    <Button
      variant="success"
      className="mx-1 d-flex align-items-center"
      onClick={handleClick}
    >
      {content && <span className="me-2">{content}</span>}
      <MdEdit />
    </Button>
  );
}
