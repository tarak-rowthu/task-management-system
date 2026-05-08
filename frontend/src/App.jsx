import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) {
        return (
            <div className="auth-layout">
                <div className="empty-icon animate-pulse">Loading...</div>
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } 
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#18181b',
                            color: '#f8fafc',
                            border: '1px solid rgba(255,255,255,0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#00ffcc',
                                secondary: '#18181b',
                            },
                        },
                    }}
                />
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
