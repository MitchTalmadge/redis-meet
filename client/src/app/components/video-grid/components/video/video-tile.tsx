import styles from './video-tile.module.scss';

export const VideoTile = () => {
  return (
    <div className={styles['video-tile']}>
      <video 
        autoPlay
        playsInline />
    </div>
  )
}