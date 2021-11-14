// Sections
import ArticlesList from "./sections/ArticlesList";
import HeroHome from "./sections/HeroHome";
import HeroPage from "./sections/HeroPage";
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
        case "articles":
          return <ArticlesList data={section} key={index} />;
        case "hero_home":
          return <HeroHome data={section} key={index} />;
        case "hero_page":
          return <HeroPage data={section} key={index} />;
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
