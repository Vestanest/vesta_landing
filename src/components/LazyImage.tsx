"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  sizes,
  quality = 75,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate a simple blur placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden group/lazy ${className}`}
      style={{ minHeight: fill ? '100%' : 'auto' }}
    >
      {/* Branded VestaNest Placeholder (Loading or Error) */}
      {(!isLoaded || hasError) && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded && !hasError ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white dark:bg-gray-950 flex items-center justify-center select-none z-[10]"
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            {/* Background V logo decorative - using explicit z and opacity */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] dark:opacity-[0.1] text-[150px] md:text-[200px] font-black text-gray-400 dark:text-gray-600 pointer-events-none select-none z-0">
              V
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                Vesta
              </span>
              
              {/* The Creative Central Dot */}
              <div className="relative flex items-center justify-center my-1 h-12">
                <motion.div 
                  animate={!isLoaded && !hasError ? { 
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.7, 1],
                    boxShadow: [
                      "0 0 0px rgba(249, 115, 22, 0)",
                      "0 0 25px rgba(249, 115, 22, 0.5)",
                      "0 0 0px rgba(249, 115, 22, 0)"
                    ]
                  } : {}}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className={`w-5 h-5 rounded-full ${hasError ? 'bg-red-500 shadow-red-500/50' : 'bg-orange-500 shadow-orange-500/50'} relative z-20 shadow-lg`}
                />
                {!isLoaded && !hasError && (
                  <motion.div 
                    animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-5 h-5 rounded-full border-2 border-orange-400 z-10"
                  />
                )}
              </div>

              <div className="relative">
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                  Nest
                </span>
                {/* The Bold Dot Suffix */}
                <span className="absolute -right-5 bottom-0 text-5xl font-black text-orange-500 leading-none">.</span>
              </div>
            </div>

            {hasError && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 flex flex-col items-center gap-3 z-20"
              >
                <div className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-red-500 whitespace-nowrap">
                    Media Unavailable
                  </p>
                </div>
                <button 
                  onClick={() => { setHasError(false); setIsInView(true); }}
                  className="px-5 py-2 text-[10px] uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-bold border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  Retry Load
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Actual image */}
      {isInView && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className={`${fill ? 'absolute inset-0 h-full w-full' : 'relative w-full h-full'} z-0`}
        >
          <Image
            src={src}
            alt={alt || "Property image"}
            width={fill ? undefined : (width || 800)}
            height={fill ? undefined : (height || 600)}
            fill={fill}
            className={`object-cover transition-transform duration-1000 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110 invisible"
            }`}
            priority={priority}
            placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
            blurDataURL={placeholder === 'blur' ? (blurDataURL || defaultBlurDataURL) : undefined}
            sizes={sizes || (fill ? "100vw" : undefined)}
            quality={quality}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? undefined : 'lazy'}
          />
        </motion.div>
      )}
    </div>
  );
}
