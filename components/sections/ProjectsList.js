import Project from "../Project";

export default function ProjectsList({ data }) {
  const projects = data.projects_list;

  const ProjectsMap = projects.map((project, index) => {
    return (
      <Project
        project={project}
        reversed={index % 2 ? true : false}
        key={index}
      />
    );
  });

  return <>{ProjectsMap}</>;
}
