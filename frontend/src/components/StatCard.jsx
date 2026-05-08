import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
    return (
        <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`stat-icon ${colorClass}`} style={{ color: 'var(--text-main)' }}>
                <Icon size={24} />
            </div>
            <div className="stat-info">
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        </motion.div>
    );
};

export default StatCard;
