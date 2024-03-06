import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import ProtectedPage from './ProtectedPage.jsx';
import UserProfilePage from './user-profile.jsx';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Publishable Key")
}

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in" />}
          />
          <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/sign-up" />}
          />
          <Route
          path="/user-profile/*"
          element={<UserProfilePage redirectUrl={'/protected'} routing="path" path="/user-profile" />}
          />
          <Route
            path="/protected"
            element={
              <>
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn/>
                </SignedOut>
              </>
            }
          />
        </Routes>
      </ClerkProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
    {/* <App/> */}
  </React.StrictMode>,
)
