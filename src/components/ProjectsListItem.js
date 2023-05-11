import { GoTrashcan } from 'react-icons/go';
import { useRemoveProjectMutation } from '../store';
import Button from './Button';
import Panel from './Panel';

function ProjectsListItem({ project }) {
  const [removeProject, results] = useRemoveProjectMutation();

  const handleRemoveProject = () => {
    removeProject(project);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveProject}
      >
        <GoTrashcan />
      </Button>
      {project.title}
    </>
  );

  return (
    <Panel key={project.id} className="flex">
      { header }
    </Panel>
  );
}

export default ProjectsListItem;
