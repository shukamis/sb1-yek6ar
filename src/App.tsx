import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/useAuthStore';
import { useRelationship } from './hooks/useRelationship';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SetupWizard } from './pages/SetupWizard';
import { Toaster } from 'react-hot-toast';
import { getRelationship } from './lib/relationship';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuthStore();
  const { relationship, loading: relationshipLoading } = useRelationship();
  
  if (authLoading || relationshipLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!relationship) {
    return <Navigate to="/setup" />;
  }
  
  return <>{children}</>;
}

function SetupRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuthStore();
  const { relationship, loading: relationshipLoading } = useRelationship();
  
  if (authLoading || relationshipLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (relationship) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
}

function App() {
  const { setUser, setLoading } = useAuthStore();
  const { setRelationship, setLoading: setRelationshipLoading } = useRelationship();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName!,
          photoURL: firebaseUser.photoURL!,
          premium: false,
        });

        try {
          const relationship = await getRelationship(firebaseUser.uid);
          setRelationship(relationship);
        } catch (error) {
          console.error('Error loading relationship:', error);
        }
      } else {
        setUser(null);
        setRelationship(null);
      }
      setLoading(false);
      setRelationshipLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setRelationship, setRelationshipLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/setup"
          element={
            <SetupRoute>
              <SetupWizard />
            </SetupRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;