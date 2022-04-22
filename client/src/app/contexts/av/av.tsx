import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { AVDevices, useDevices } from "./hooks/devices";

interface AVContextValue {
  devices: AVDevices;
}

export const AVContext = createContext<AVContextValue>(null);

interface Props {
  children: ReactNode;
}

export const AVContextManager: FC<Props> = (props) => {
  const devices = useDevices();

  return (
    <AVContext.Provider value={{
      devices,
    }}>
      {props.children}
    </AVContext.Provider>
  );
}
