import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay">
                <motion.div 
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ maxWidth: '400px', textAlign: 'center' }}
                >
                    <div className="modal-body" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                                <AlertTriangle size={32} color="var(--danger)" />
                            </div>
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{title}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>
                        
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={onConfirm} className="btn btn-danger" style={{ flex: 1 }}>Delete</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmModal;
