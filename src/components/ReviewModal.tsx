"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AddReviewForm from './AddReviewForm';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  onSuccess: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  propertyId,
  onSuccess,
}: ReviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <AddReviewForm 
                propertyId={propertyId} 
                onSuccess={() => {
                    onSuccess();
                    onClose();
                }}
                onCancel={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
