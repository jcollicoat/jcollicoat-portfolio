// Sections
import HeroHome from "./sections/HeroHome";
import ProjectsList from "./sections/ProjectsList";

export default function PageContent({ sections }) {
  const ContentMap = sections.map((section, index) => {
    switch (section._type) {
      case "hero_home":
        return <HeroHome data={section} key={index} />;
      case "projects":
        return <ProjectsList data={section} key={index} />;
    }
  });

  return <>{ContentMap}</>;
}
