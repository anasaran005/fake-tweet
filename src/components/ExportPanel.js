import React, { useState } from 'react';
import styles from './ExportPanel.module.css';

export default function ExportPanel({
  onDownload, downloadFormat, setDownloadFormat,
  aspectRatio, setAspectRatio
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.exportPanelContainer}>
      <button 
        className={styles.exportToggleButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        Export
      </button>
      
      {isOpen && (
        <div className={styles.exportControlsWrapper}>
          <div className={styles.exportControls}>
            <div className={styles.selectGroup}>
              <label>Ratio</label>
              <select 
                value={aspectRatio} 
                onChange={(e) => setAspectRatio(e.target.value)}
                className={styles.select}
              >
                <option value="auto">Auto</option>
                <option value="1:1">1:1 Square</option>
                <option value="4:5">4:5 Insta Post</option>
                <option value="9:16">9:16 Story/Reel</option>
                <option value="16:9">16:9 Twitter/Video</option>
                <option value="1.91:1">1.91:1 LinkedIn</option>
                <option value="4:3">4:3 Standard</option>
              </select>
            </div>
            <div className={styles.selectGroup}>
              <label>Format</label>
              <select 
                value={downloadFormat} 
                onChange={(e) => setDownloadFormat(e.target.value)}
                className={styles.select}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="svg">SVG</option>
              </select>
            </div>
            <button className={styles.downloadButton} onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
