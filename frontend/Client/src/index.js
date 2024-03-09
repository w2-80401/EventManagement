import React from 'react';
import { createRoot } from 'react-dom/client'; // Update the import statement
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext';


const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client
root.render(
  
    <React.StrictMode>
      <AuthProvider>\

      <App />
      </AuthProvider>
      
    </React.StrictMode>
 
);
