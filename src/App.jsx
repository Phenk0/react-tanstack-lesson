import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent, {
  action as editEventAction,
  loader as editEventLoader
} from './components/Events/EditEvent.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />
      }
    ]
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
        loading: editEventLoader,
        action: editEventAction
      }
    ]
  },
  { path: '*', element: <Navigate to="/events" /> }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
