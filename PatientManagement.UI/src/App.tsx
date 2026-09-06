import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { Appointments } from './pages/Appointments';
import { PatientForm } from './pages/PatientForm';
import { AppShell, ProtectedRoute } from './components/layout/Shell';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/appointments" replace /> },
      { path: "appointments", element: <Appointments /> },
      { path: "patients/new", element: <PatientForm /> },
      { path: "patients/:id", element: <PatientForm /> },
      { path: "*", element: <Navigate to="/appointments" replace /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
