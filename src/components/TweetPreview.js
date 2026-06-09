import React, { forwardRef } from 'react';
import styles from './TweetPreview.module.css';
import { BadgeCheck } from 'lucide-react';

const TweetPreview = forwardRef(({ name, username, content, avatar, verified, bgColor, aspectRatio }, ref) => {
  const containerStyle = { backgroundColor: bgColor };
  
  if (aspectRatio && aspectRatio !== 'auto') {
    containerStyle.aspectRatio = aspectRatio.replace(':', ' / ');
    containerStyle.maxHeight = '65vh';
    containerStyle.width = 'auto';
  }

  return (
    <div className={styles.previewWrapper}>
      <div 
        ref={ref} 
        className={styles.captureContainer} 
        style={containerStyle}
      >
        <div className={styles.tweetCard}>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder} />
              )}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.nameRow}>
                <span className={styles.name}>{name}</span>
                {verified && <BadgeCheck className={styles.verifiedIcon} size={20} />}
              </div>
              <span className={styles.username}>@{username.replace(/^@/, '')}</span>
            </div>
          </div>
          <div className={styles.content}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
});

TweetPreview.displayName = 'TweetPreview';
export default TweetPreview;
