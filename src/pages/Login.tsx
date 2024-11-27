import React from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function Login() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  // Check for redirect result on mount
  React.useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      }
    }).catch((error) => {
      console.error('Redirect sign-in error:', error);
      toast.error('Erro ao fazer login com Google');
    });
  }, [navigate]);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      // First try with popup
      try {
        await signInWithPopup(auth, googleProvider);
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } catch (error: any) {
        // If popup is blocked or domain unauthorized, fallback to redirect
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/unauthorized-domain') {
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center mb-8">
        <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">LoveTracker</h1>
        <p className="text-gray-600">Celebre cada momento do seu relacionamento</p>
      </div>

      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        size="lg"
        className="flex items-center space-x-2 hover:bg-white/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        )}
        <span>{isLoading ? 'Entrando...' : 'Entrar com Google'}</span>
      </Button>

      <p className="mt-4 text-sm text-gray-500">
        Ao entrar, você concorda com nossos termos de uso e política de privacidade
      </p>
    </div>
  );
}