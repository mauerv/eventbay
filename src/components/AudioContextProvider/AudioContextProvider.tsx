import React, { useState, createContext, ReactNode } from 'react';

type AudioContextType = { audioContext: AudioContext };

type Props = { children: ReactNode };

export const AudioContextContext = createContext<AudioContextType>(null!);

export default function AudioContextProvider({ children }: Props) {
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
  return (
    <AudioContextContext.Provider value={{ audioContext }}>{children}</AudioContextContext.Provider>
  );
}
