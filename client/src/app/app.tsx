import './app.scss';
import styles from './app.module.scss';
import { DevicePicker } from "./components/device-picker/device-picker";
import { VideoGrid } from './components/video-grid/video-grid';
import { AVContextManager } from "./contexts/av/av";

export const App = () => {
  return (
    <AVContextManager>
      <div className={styles['app']}>
        <h1 className={styles['title']}>Redis Meet</h1>
        <VideoGrid />
        <DevicePicker />
      </div>
    </AVContextManager>
  )
}