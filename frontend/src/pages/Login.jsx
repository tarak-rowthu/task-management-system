import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success('Successfully logged in!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to login. Check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-layout">
            <motion.div 
                className="auth-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-brand">
                    <div className="auth-brand-icon">
                        <LogIn size={28} color="#fff" />
                    </div>
                </div>
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your workspace</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            className="form-control"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="name@company.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter your password"
                        />
                    </div>
                    <motion.button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginTop: '1rem' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                        {!isLoading && <ArrowRight size={18} />}
                    </motion.button>
                </form>
                
                <div className="auth-footer" style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <p>New to TaskMaster? <Link to="/register" style={{ color: '#fff', fontWeight: 500 }}>Create an account</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
