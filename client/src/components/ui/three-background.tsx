import { useEffect, useRef } from "react";
import { setupThreeScene } from "@/lib/three-setup";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = setupThreeScene(containerRef.current);
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
