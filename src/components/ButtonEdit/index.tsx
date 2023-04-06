import Button, {ButtonProps} from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

type Props = ButtonProps & {
  content?: string;
};

export function ButtonEdit({ content, ...rest }: Props) {
  return (
    <Button
      variant="success"
      className="mx-1 d-flex align-items-center"
      {...rest}
    >
      {content && <span className="me-2">{content}</span>}
      <MdEdit />
    </Button>
  );
}
