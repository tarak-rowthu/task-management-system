import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onToggleStatus, onEdit, onDelete, index }) => {
    const isCompleted = task.status === 'COMPLETED';

    const getStatusConfig = () => {
        switch(task.status) {
            case 'COMPLETED': return { class: 'badge-completed', text: 'Completed', icon: <CheckCircle size={14} /> };
            case 'IN_PROGRESS': return { class: 'badge-inprogress', text: 'In Progress', icon: <Clock size={14} /> };
            default: return { class: 'badge-pending', text: 'Pending', icon: <Clock size={14} /> };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <motion.div 
            className="task-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            style={{ opacity: isCompleted ? 0.6 : 1 }}
        >
            <div className="task-card-header">
                <h3 className="task-card-title" style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-dim)' : 'var(--text-main)' }}>
                    {task.title}
                </h3>
                <div className="task-actions">
                    <button onClick={() => onToggleStatus(task)} className="btn-icon" title="Toggle Status">
                        {isCompleted ? <CheckCircle color="var(--accent-cyan)" /> : <CheckCircle color="var(--text-dim)" />}
                    </button>
                    <button onClick={() => onEdit(task)} className="btn-icon" title="Edit">
                        <Edit2 size={18} />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="btn-icon delete-icon" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            
            <p className="task-card-desc">{task.description}</p>
            
            <div className="task-card-footer">
                <span className={`badge ${statusConfig.class}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {statusConfig.icon} {statusConfig.text}
                </span>
                <span className="task-date">{new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
        </motion.div>
    );
};

export default TaskCard;
