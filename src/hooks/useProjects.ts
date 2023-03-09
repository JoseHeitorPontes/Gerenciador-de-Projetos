import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Project } from "../@types/project";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);

    async function fetchProjects() {
        try {
            const { data } = await api.get("/projects");
            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        fetchProjects
    };
}