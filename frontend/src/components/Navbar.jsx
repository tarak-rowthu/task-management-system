import React from 'react';
import { LogOut, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onLogout }) => {
    return (
        <header className="top-navbar">
            <h1 className="page-title">Overview</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative', display: 'none' }} className="d-md-block">
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="form-control"
                        style={{ paddingLeft: '2.5rem', width: '250px', background: 'var(--bg-panel-solid)' }}
                    />
                </div>
                
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-icon">
                    <Bell size={20} />
                </motion.button>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="btn-icon text-danger" 
                    onClick={onLogout}
                    title="Sign Out"
                >
                    <LogOut size={20} />
                </motion.button>
            </div>
        </header>
    );
};

export default Navbar;
