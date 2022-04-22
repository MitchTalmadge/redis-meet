import { useEffect, useState } from "react";

export interface AVDevices {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const useDevices = () => {
  const [devices, setDevices] = useState<AVDevices>({
    cameras: [],
    microphones: [],
    speakers: [],
  });
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      const microphones = devices.filter((device) => device.kind === 'audioinput');
      const speakers = devices.filter((device) => device.kind === 'audiooutput');
      setDevices({
        cameras,
        microphones,
        speakers,
      });
    });
  });

  return devices;
}