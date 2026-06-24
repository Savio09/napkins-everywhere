"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createLocalImageURL } from "@/utils/urlConstruct";
import type { StrapiMedia } from "@/types/strapi";

interface SlideshowProps {
  images: StrapiMedia[];
  title: string;
  autoSlide?: boolean;
  interval?: number;
  showThumbnails?: boolean;
  className?: string;
}

export default function Slideshow({
  images,
  title,
  autoSlide = true,
  interval = 5000,
  showThumbnails = true,
  className = "",
}: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    const slideTimer = setInterval(nextSlide, interval);
    return () => clearInterval(slideTimer);
  }, [isPlaying, interval, nextSlide, images.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") { e.preventDefault(); togglePlayPause(); }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide, togglePlayPause]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full bg-gray-100 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      <div className="relative w-full min-h-[400px] flex items-center justify-center bg-gray-100">
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className={`transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 relative" : "opacity-0 absolute inset-0"
            }`}
          >
            <Image
              src={createLocalImageURL(image.url)}
              width={1200}
              height={800}
              alt={`${title} - Slide ${index + 1}`}
              className="w-full h-auto object-contain rounded-lg"
              priority={index === 0}
              style={{ maxHeight: "70vh", width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 group shadow-lg"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 group shadow-lg"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {images.length > 1 && autoSlide && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 shadow-lg"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {currentSlide + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-gray-800 scale-125" : "bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showThumbnails && images.length > 1 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-b-lg">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-10 rounded overflow-hidden transition-all duration-300 ${
                  index === currentSlide ? "ring-2 ring-blue-500 scale-110" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={createLocalImageURL(image.url)}
                  width={64}
                  height={40}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
