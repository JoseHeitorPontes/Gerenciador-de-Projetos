import Button, { ButtonProps } from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";

type Props = ButtonProps & {
  content?: string;
};

export function ButtonDelete({ content, ...rest }: Props) {
  return (
    <Button
      variant="danger"
      className="mx-1 d-flex align-items-center justify-content-center"
      {...rest}
    >
      {content && <span className="me-2">{content}</span>}
      <FaTrash />
    </Button>
  );
}
