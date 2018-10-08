import DummyDashboard from './components/Dashboard/DummyDashboard';
import AppContainer from './containers/AppContainer/AppContainer';
import Projects from './containers/Projects/Projects';
import ProjectDetails from './components/Projects/ProjectDetails';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: AppContainer
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DummyDashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projectDetails',
    name: 'ProjectDetails',
    component: ProjectDetails
  }
];

export default routes;
