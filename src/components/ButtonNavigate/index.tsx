import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

type Props = {
    textButton: string,
    navigateLink: string,
};

export function ButtonNavigate({textButton, navigateLink}: Props) {
    const navigate = useNavigate();

    const link = navigateLink;

    return (
        <Button
            variant="dark"
            onClick={() => navigate(link)}
        >
            {textButton}
        </Button>
    );
}