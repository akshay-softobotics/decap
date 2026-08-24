import projects from "../../meta/projects.yml";

export type ProjectContent = {
  readonly slug: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
};

export function listProjects(): ProjectContent[] {
  return projects.projects;
}
