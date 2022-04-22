import styles from './app.module.scss';
import { VideoGrid } from './components/video-grid/video-grid';

export const App = () => {
  return (
    <div className={styles['app']}>
      <h1 className={styles['title']}>Redis Meet</h1>
      <VideoGrid />
    </div>
  )
}