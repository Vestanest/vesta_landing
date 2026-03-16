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
          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center select-none z-[1]"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Background V logo decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] text-[180px] font-bold text-neutral-900 dark:text-white pointer-events-none select-none">
              V
            </div>

            <div className="relative flex flex-col items-center gap-1">
              <span className="text-4xl font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-100 opacity-90">
                Vesta
              </span>
              
              {/* The Creative Central Dot */}
              <div className="relative flex items-center justify-center py-2">
                <motion.div 
                  animate={!isLoaded && !hasError ? { 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                    boxShadow: [
                      "0 0 0px rgba(249, 115, 22, 0)",
                      "0 0 20px rgba(249, 115, 22, 0.4)",
                      "0 0 0px rgba(249, 115, 22, 0)"
                    ]
                  } : {}}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className={`w-4 h-4 rounded-full ${hasError ? 'bg-red-500' : 'bg-orange-500'} relative z-10`}
                />
                {!isLoaded && !hasError && (
                  <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-4 h-4 rounded-full border-2 border-orange-400"
                  />
                )}
              </div>

              <span className="text-4xl font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-100 opacity-90">
                Nest
              </span>

              {/* The Dot Suffix */}
              <div className="absolute -bottom-1 -right-4 text-4xl font-black text-orange-500">.</div>
            </div>

            {hasError && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-col items-center gap-2"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-red-500/90 whitespace-nowrap">
                  Media Unavailable
                </p>
                <button 
                  onClick={() => { setHasError(false); setIsInView(true); }}
                  className="px-3 py-1 text-[9px] uppercase tracking-widest bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  Retry Load
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Actual image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`${fill ? 'absolute inset-0 h-full w-full' : 'relative w-full h-full'}`}
        >
          <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={`object-cover transition-transform duration-700 hover:scale-110 ${
              isLoaded ? "opacity-100" : "opacity-0 invisible"
            }`}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={defaultBlurDataURL}
            sizes={sizes}
            quality={quality}
            onLoad={handleLoad}
            onError={handleError}
          />
        </motion.div>
      )}
    </div>
  );
}
