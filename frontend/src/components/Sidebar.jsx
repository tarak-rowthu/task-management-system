import React from 'react';
import { motion } from 'framer-motion';
import { Home, ListTodo, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="avatar" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <ListTodo size={28} color="#00ffcc" />
                </div>
                <span className="sidebar-brand">TaskMaster</span>
            </div>
            
            <nav className="sidebar-nav">
                <Link to="/" className="nav-item active">
                    <Home size={20} />
                    <span>Dashboard</span>
                </Link>
                <div className="nav-item">
                    <ListTodo size={20} />
                    <span>My Tasks</span>
                </div>
                <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
                <div className="nav-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <HelpCircle size={20} />
                    <span>Help Center</span>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
