import Image from "next/image";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Slideshow from "@/components/Slideshow";

export default function ImagesOnlyRenderer({ entry, isVisible }) {
  const isSlideshow = entry.is_slide_show;
  
  return (
    <div className="w-full">
      {/* Main Image Gallery - Full Width */}
      {entry.media_files && entry.media_files.length > 0 && (
        <div 
          id="main-content"
          className={`animate-on-scroll transform transition-all duration-1000 delay-300 ${
            isVisible['main-content'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {isSlideshow ? (
            // Slideshow Mode
            <div className="mb-8">
              <Slideshow
                images={entry.media_files}
                title={entry.title}
                autoSlide={true}
                interval={4000}
                showThumbnails={true}
                className="w-full max-w-6xl mx-auto"
              />
            </div>
          ) : entry.media_files.length === 1 ? (
            // Single Image - Full Width Hero
            <div className="relative group overflow-hidden rounded-lg shadow-2xl mb-8">
              <Image
                src={createLocalImageURL(entry.media_files[0].url)}
                width={1200}
                height={800}
                alt={entry.title}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          ) : (
            // Multiple Images - Vertical Stack
            <div className="space-y-6 mb-8">
              {entry.media_files.map((media, index) => (
                <div 
                  key={media.id} 
                  className="group overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Image
                    src={createLocalImageURL(media.url)}
                    width={1200}
                    height={800}
                    alt={`${entry.title} - Image ${index + 1}`}
                    className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Optional Caption/Description */}
          {entry.content && (
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg text-gray-600 text-center italic leading-relaxed"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
