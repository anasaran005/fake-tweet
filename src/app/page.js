"use client";

import React, { useState, useRef } from 'react';
import styles from './page.module.css';
import Controls from '../components/Controls';
import TweetPreview from '../components/TweetPreview';
import ExportPanel from '../components/ExportPanel';
import { toPng, toJpeg, toSvg } from 'html-to-image';

export default function Home() {
  const [name, setName] = useState("Raj Shamani");
  const [username, setUsername] = useState("rajshamani");
  const [content, setContent] = useState("Speed is the most underrated advantage. The fast people don't always win, but the slow ones get filtered out before the real game even starts.");
  const [avatar, setAvatar] = useState("");
  const [verified, setVerified] = useState(true);
  const [bgColor, setBgColor] = useState("#000000");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [aspectRatio, setAspectRatio] = useState("auto");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const tweetRef = useRef(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('tweetProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.avatar) setAvatar(parsed.avatar);
        if (parsed.verified !== undefined) setVerified(parsed.verified);
      } catch(e) {
        console.error("Failed to parse saved profile");
      }
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('tweetProfile', JSON.stringify({ name, username, avatar, verified }));
    alert('Profile saved as default!');
  };

  const handleDownload = async () => {
    if (!tweetRef.current) return;

    try {
      const element = tweetRef.current;
      const options = {
        pixelRatio: 3,
        quality: 1,
      };

      let dataUrl;
      switch (downloadFormat) {
        case 'jpeg':
          dataUrl = await toJpeg(element, options);
          break;
        case 'svg':
          dataUrl = await toSvg(element, options);
          break;
        case 'png':
        default:
          dataUrl = await toPng(element, options);
          break;
      }

      const link = document.createElement('a');
      link.download = `fake-tweet.${downloadFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button 
          className={`${styles.mobileMenuButton} ${isSidebarOpen ? styles.open : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {isSidebarOpen && (
          <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
        )}

        <div className={`${styles.controlsSection} ${isSidebarOpen ? styles.open : ''}`}>
          <Controls 
            name={name} setName={setName}
            username={username} setUsername={setUsername}
            content={content} setContent={setContent}
            avatar={avatar} setAvatar={setAvatar}
            verified={verified} setVerified={setVerified}
            bgColor={bgColor} setBgColor={setBgColor}
            onSaveProfile={handleSaveProfile}
          />
        </div>
        <div className={styles.previewSection}>
          <h1 className={styles.title}>Fake Tweet Generator</h1>
          <TweetPreview 
            ref={tweetRef}
            name={name}
            username={username}
            content={content}
            avatar={avatar}
            verified={verified}
            bgColor={bgColor}
            aspectRatio={aspectRatio}
          />
          <ExportPanel
            onDownload={handleDownload}
            downloadFormat={downloadFormat} setDownloadFormat={setDownloadFormat}
            aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
          />
        </div>
      </main>
    </div>
  );
}
