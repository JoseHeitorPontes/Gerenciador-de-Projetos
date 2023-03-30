import { Service } from "./service";

export type Project = {
  id: number;
  name: string;
  budget: number;
  category: string;
  services: Service[];
};
