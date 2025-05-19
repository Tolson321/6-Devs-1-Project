'use client';

import { useEffect, useRef } from 'react';

// This needs to be loaded on the client
const FloatingDocuments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return; // Ensure container is available
    
    let p5: any;
    
    // Load P5.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
    script.onload = () => {
      // @ts-ignore - p5 is loaded globally
      // Pass containerRef.current as the second argument to the p5 constructor
      p5 = new window.p5(sketch, containerRef.current!);
    };
    // Append script to head to avoid issues with body not being fully loaded
    document.head.appendChild(script);
    
    // P5.js sketch function
    const sketch = (p: any) => {
      // Array to store document emojis
      const documents: Array<{
        x: number;
        y: number;
        emoji: string;
        size: number;
        speed: number;
        angle: number;
        rotation: number;
      }> = [];
      
      // Document emojis to use
      const documentEmojis = ['📄', '📝', '📑', '📰', '📋', '📁', '📂', '📊', '📈', '📉'];
      
      p.setup = () => {
        // Canvas will now fill its parent container (the div#p5-container)
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        // No need to set position or z-index on canvas if parent div handles it
        p.textAlign(p.CENTER, p.CENTER);
        
        // Create initial documents
        for (let i = 0; i < 25; i++) {
          documents.push({
            x: p.random(p.width),
            y: p.random(p.height),
            emoji: p.random(documentEmojis),
            size: p.random(30, 60),
            speed: p.random(0.3, 1.2),
            angle: p.random(p.TWO_PI),
            rotation: p.random(-0.01, 0.01)
          });
        }
      };
      
      p.draw = () => {
        p.clear();
        
        documents.forEach(doc => {
          doc.x += Math.cos(doc.angle) * doc.speed;
          doc.y += Math.sin(doc.angle) * doc.speed;
          doc.angle += doc.rotation;
          
          if (doc.x > p.width + doc.size) doc.x = -doc.size;
          if (doc.x < -doc.size) doc.x = p.width + doc.size;
          if (doc.y > p.height + doc.size) doc.y = -doc.size;
          if (doc.y < -doc.size) doc.y = p.height + doc.size;
          
          p.push();
          p.textSize(doc.size);
          p.fill(0, 0, 0, 150);
          p.text(doc.emoji, doc.x, doc.y);
          p.pop();
        });
      };
      
      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };
    };
    
    // Cleanup
    return () => {
      if (p5) {
        p5.remove();
      }
      // Remove script when component unmounts
      document.head.removeChild(script); 
    };
  }, []); // Add containerRef.current to dependency array if it were state/prop, but it's stable
  
  // This div is the container for the P5 canvas
  // Its styling ensures it's positioned correctly in the layout
  return <div ref={containerRef} id="p5-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }} />;
};

export default FloatingDocuments; 