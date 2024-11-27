import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAmDza5Yotnna9uQ6iY0sM8b967DPJR14",
  authDomain: "lovetracker-ef864.firebaseapp.com",
  projectId: "lovetracker-ef864",
  storageBucket: "lovetracker-ef864.appspot.com",
  messagingSenderId: "450089645717",
  appId: "1:450089645717:web:b43a3dec77b2da52be8d9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure Google provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Add authorized domains
auth.useDeviceLanguage();

// Export the Firebase app instance
export default app;