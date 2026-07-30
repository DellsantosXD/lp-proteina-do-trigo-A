import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
}

export default function LazySection({ children, minHeight = '300px', className = '' }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        minHeight: isVisible ? undefined : minHeight,
        contentVisibility: 'auto',
        containIntrinsicSize: minHeight
      }}
    >
      {isVisible ? children : <div style={{ height: minHeight }} />}
    </div>
  );
}
