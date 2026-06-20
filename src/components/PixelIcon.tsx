import { useEffect, useRef } from 'react';

interface PixelIconProps {
  emoji: string;
  size?: number;
  resolution?: number;
  className?: string;
  title?: string;
}

export function PixelIcon({ emoji, size = 40, resolution = 16, className, title }: PixelIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, resolution, resolution);
    ctx.imageSmoothingEnabled = false;
    ctx.font = `${Math.floor(resolution * 0.85)}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, resolution / 2, resolution / 2 + resolution * 0.04);
  }, [emoji, resolution]);

  return (
    <canvas
      ref={canvasRef}
      width={resolution}
      height={resolution}
      className={className}
      title={title}
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
        display: 'block',
      }}
    />
  );
}
