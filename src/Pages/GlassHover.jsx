import React, { useRef, useEffect, useState } from 'react';

const GlassHover = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    };
    
    const el = containerRef.current;
    el.addEventListener('mousemove', handleMouseMove);
          
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [  ]); 

  return (  
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 rounded-xl overflow-hidden"
    >       
      <div
        className="w-full h-full transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.15), transparent 60%)`,
        }}
      />
  

    </div>    
  );
};


export default GlassHover;
