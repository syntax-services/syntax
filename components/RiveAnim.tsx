'use client';

import { useRive } from '@rive-app/react-canvas';

interface RiveAnimProps {
  src: string;
  width?: number;
  height?: number;
}

export default function RiveAnim({ src, width = 300, height = 300 }: RiveAnimProps) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
  });

  return <RiveComponent style={{ width, height }} />;
}
