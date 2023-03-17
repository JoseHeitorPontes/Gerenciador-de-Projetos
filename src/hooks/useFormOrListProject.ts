import { useState } from "react";

export function useFormProject() {
    const [viewForm, setViewForm] = useState(false);

    return {
        viewForm,
        setViewForm
    }
}