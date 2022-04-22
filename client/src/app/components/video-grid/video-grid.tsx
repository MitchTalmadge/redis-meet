import { VideoTile } from "./components/video/video-tile";
import styles from './video-grid.module.scss';

export const VideoGrid = () => {
    return (
      <div className={styles['video-grid']}>
        <div className={styles['video-grid-inner']}>
          <VideoTile />
        </div>
      </div>
    )
}