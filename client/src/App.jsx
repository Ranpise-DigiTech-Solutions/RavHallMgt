import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from 'react-redux';

import './App.scss'
import { 
  HomePage,
  DescriptionPage,
} from './pages'

import { store } from './states';

function App() {

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
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Routes>
            <Route path="/DescriptionPage" element={<DescriptionPage />} />
          </Routes>
  
        </ClerkProvider>
      );
  }

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </Provider>
    </>
    )
}

export default App
