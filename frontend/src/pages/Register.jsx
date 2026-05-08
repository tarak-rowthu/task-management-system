import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(name, email, password);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            // Check for validation errors from Spring Boot
            if (err.response?.data?.validationErrors) {
                const errors = err.response.data.validationErrors;
                Object.values(errors).forEach(msg => toast.error(msg));
            } else {
                toast.error(err.response?.data?.message || 'Failed to register.');
            }
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
                        <UserPlus size={28} color="#fff" />
                    </div>
                </div>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Start managing your tasks today</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="John Doe"
                        />
                    </div>
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
                            placeholder="Minimum 6 characters"
                            minLength={6}
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
                        {isLoading ? 'Creating account...' : 'Create Account'}
                        {!isLoading && <ArrowRight size={18} />}
                    </motion.button>
                </form>
                
                <div className="auth-footer" style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <p>Already have an account? <Link to="/login" style={{ color: '#fff', fontWeight: 500 }}>Sign in here</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
