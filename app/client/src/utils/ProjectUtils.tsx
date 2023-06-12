export function createNewProject(title: string, description: string, setProjects: any) {

  setProjects((currProjects: { title: string, description: string }[]) => {
    return  [...currProjects, {title, description}];
  });
}