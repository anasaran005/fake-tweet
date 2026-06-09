import React from 'react';
import styles from './Controls.module.css';
import { Upload } from 'lucide-react';

export default function Controls({
  name, setName,
  username, setUsername,
  content, setContent,
  avatar, setAvatar,
  verified, setVerified,
  bgColor, setBgColor,
  onDownload, downloadFormat, setDownloadFormat,
  aspectRatio, setAspectRatio,
  onSaveProfile
}) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <h2 className={styles.title}>Tweet Settings</h2>
      
      <div className={styles.inputGroup}>
        <label>Profile Picture</label>
        <div className={styles.fileUploadContainer}>
          <input 
            type="file" 
            accept="image/*" 
            id="profile-upload"
            onChange={handleImageUpload} 
            className={styles.hiddenInput}
          />
          <label htmlFor="profile-upload" className={styles.fileUploadLabel}>
            <Upload size={18} />
            <span>{avatar ? "Change Profile Picture" : "Choose Image"}</span>
          </label>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={styles.inputGroup}>
        <label>Username</label>
        <div className={styles.inputWithPrefix}>
          <span className={styles.prefix}>@</span>
          <input 
            type="text" 
            value={username.replace(/^@/, '')} 
            onChange={(e) => setUsername(e.target.value.replace(/^@/, ''))} 
            placeholder="username"
          />
        </div>
      </div>

      <div className={styles.checkboxGroup}>
        <input 
          type="checkbox" 
          id="verified" 
          checked={verified} 
          onChange={(e) => setVerified(e.target.checked)} 
        />
        <label htmlFor="verified">Verified Tick</label>
      </div>

      <button className={styles.secondaryButton} onClick={onSaveProfile}>
        Save as Default Profile
      </button>

      <div className={styles.inputGroup}>
        <label>Tweet Content</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        ></textarea>
      </div>

      <div className={styles.inputGroup}>
        <label>Background Color</label>
        <input 
          type="color" 
          value={bgColor} 
          onChange={(e) => setBgColor(e.target.value)} 
          className={styles.colorPicker}
        />
      </div>

    </div>
  );
}
