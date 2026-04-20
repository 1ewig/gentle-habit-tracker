import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../../../store/useAppStore';
import { Dialog } from '../../shared/Dialog';
import { GRID_ITEM_VARIANTS, HOVER_TAP } from '../../../lib/motion';

export function ProfileSection() {
  const { profile, setProfile } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formName, setFormName] = useState(profile.name);
  const [formBio, setFormBio] = useState(profile.bio);

  const handleSave = () => {
    setProfile({ 
      name: formName || 'wanderer', 
      bio: formBio || 'taking it one day at a time.' 
    });
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="settings-card card-profile"
        variants={GRID_ITEM_VARIANTS}
        onClick={() => {
          setFormName(profile.name);
          setFormBio(profile.bio);
          setIsOpen(true);
        }}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Edit your profile"
        whileTap={HOVER_TAP.tap}
      >
        <div className="bp-avatar" aria-hidden="true">{profile.name.charAt(0)}</div>
        <div className="bp-info">
          <div className="bp-name">{profile.name}</div>
          <div className="bp-bio">{profile.bio}</div>
        </div>
      </motion.div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="edit profile">
        <div className="add-form">
          <input 
            type="text" 
            value={formName} 
            onChange={e => setFormName(e.target.value)} 
            placeholder="your name" 
            maxLength={24} 
          />
          <input 
            type="text" 
            value={formBio} 
            onChange={e => setFormBio(e.target.value)} 
            placeholder="a short bio" 
            maxLength={48} 
          />
          <button className="btn-primary" onClick={handleSave}>save profile</button>
        </div>
      </Dialog>
    </>
  );
}
