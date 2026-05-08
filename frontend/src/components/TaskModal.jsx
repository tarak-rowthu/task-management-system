import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'PENDING' });

    useEffect(() => {
        if (task) {
            setFormData({ title: task.title, description: task.description, status: task.status });
        } else {
            setFormData({ title: '', description: '', status: 'PENDING' });
        }
    }, [task, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div 
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="modal-header">
                        <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
                        <button onClick={onClose} className="btn-icon">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Task Title</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={formData.title} 
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                                    required 
                                    placeholder="e.g., Design homepage UI"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    className="form-control"
                                    value={formData.description} 
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                    placeholder="Add any additional details or context..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select 
                                    className="form-control"
                                    value={formData.status} 
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                            <motion.button 
                                type="submit" 
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Save size={18} />
                                {task ? 'Update Task' : 'Create Task'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TaskModal;
