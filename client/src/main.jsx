import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from './App.jsx'
import './index.css'
 
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
        </Routes>
      </ClerkProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
