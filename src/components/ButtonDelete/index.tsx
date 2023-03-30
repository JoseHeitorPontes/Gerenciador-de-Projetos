import Button from "react-bootstrap/Button";

import { FaTrash } from "react-icons/fa";

type Props = {
  content?: string;
  handleDelete?: () => void;
};

export function ButtonDelete({ content, handleDelete }: Props) {
  return (
    <Button
      variant="danger"
      className="mx-1 d-flex align-items-center justify-content-center"
      onClick={handleDelete}
    >
      {content && <span className="me-2">{content}</span>}
      <FaTrash />
    </Button>
  );
}
