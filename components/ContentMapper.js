// Sections
import HeroHome from "./sections/HeroHome";
import ProjectsList from "./sections/ProjectsList";
import ProjectImage from "./sections/ProjectImage";
import ProjectImageGrid from "./sections/ProjectImageGrid";
import ProjectImageText from "./sections/ProjectImageText";
import ProjectProcessWork from "./sections/ProjectProcessWork";
import ProjectText from "./sections/ProjectText";
import ProjectVideo from "./sections/ProjectVideo";

export default function ContentMapper({ sections }) {
  const ContentMap =
    sections !== null &&
    sections.map((section, index) => {
      switch (section._type) {
        case "hero_home":
          return <HeroHome data={section} key={index} />;
        case "projects":
          return <ProjectsList data={section} key={index} />;
        case "project_image":
          return <ProjectImage data={section} key={index} />;
        case "project_image_grid":
          return <ProjectImageGrid data={section} key={index} />;
        case "project_image_text":
          return <ProjectImageText data={section} key={index} />;
        case "project_process_work":
          return <ProjectProcessWork data={section} key={index} />;
        case "project_text":
          return <ProjectText data={section} key={index} />;
        case "project_video":
          return <ProjectVideo data={section} key={index} />;
      }
    });

  return <>{ContentMap}</>;
}
