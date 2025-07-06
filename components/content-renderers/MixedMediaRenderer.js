import Image from "next/image";
import { createLocalImageURL } from "@/utils/urlConstruct";

export default function MixedMediaRenderer({ entry, isVisible }) {
  return (
    <div className="w-full">
      {/* Hero Section with Content */}
      <div className="mb-12">
        {/* Featured Media */}
        {entry.media_files && entry.media_files.length > 0 && (
          <div 
            id="hero-media"
            className={`animate-on-scroll mb-8 transform transition-all duration-1000 ${
              isVisible['hero-media'] 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="relative group overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={createLocalImageURL(entry.media_files[0].url)}
                width={1200}
                height={600}
                alt={entry.title}
                className="w-full h-80 md:h-96 object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Main Content */}
        {entry.content && (
          <div 
            id="main-content"
            className={`animate-on-scroll transform transition-all duration-1000 delay-300 mb-12 ${
              isVisible['main-content'] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Primary Content */}
              <div className="lg:col-span-3">
                <div 
                  className="newspaper-content prose prose-lg max-w-none text-gray-800 leading-relaxed prose-headings:text-[#0070ae] prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg prose-a:text-[#0070ae] prose-strong:text-gray-900 prose-em:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>

              {/* Quick Media Preview */}
              {entry.media_files && entry.media_files.length > 1 && (
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <h4 className="text-sm font-bold text-[#0070ae] mb-3 uppercase tracking-wide">
                      Quick View
                    </h4>
                    <div className="space-y-3">
                      {entry.media_files.slice(1, 4).map((media, index) => (
                        <div 
                          key={media.id} 
                          className="group overflow-hidden rounded shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                          <Image
                            src={createLocalImageURL(media.url)}
                            width={150}
                            height={100}
                            alt={`${entry.title} - Preview ${index + 1}`}
                            className="w-full h-16 object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Multi-Media Gallery */}
      {entry.media_files && entry.media_files.length > 1 && (
        <div 
          id="media-showcase"
          className={`animate-on-scroll transform transition-all duration-1000 delay-500 ${
            isVisible['media-showcase'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-3xl font-bold text-[#0070ae] mb-8 text-center">Media Showcase</h3>
          
          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {entry.media_files.slice(1).map((media, index) => {
              // Create varied layouts for visual interest
              const isLarge = index % 7 === 0; // Every 7th item is large
              const isMedium = index % 4 === 0 && !isLarge; // Every 4th item is medium
              
              return (
                <div 
                  key={media.id} 
                  className={`group overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isLarge ? 'md:col-span-2 md:row-span-2' : 
                    isMedium ? 'md:col-span-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative">
                    <Image
                      src={createLocalImageURL(media.url)}
                      width={isLarge ? 600 : isMedium ? 400 : 300}
                      height={isLarge ? 400 : isMedium ? 250 : 200}
                      alt={`${entry.title} - Media ${index + 2}`}
                      className={`w-full object-cover transform transition-transform duration-700 group-hover:scale-110 ${
                        isLarge ? 'h-64 md:h-80' : 
                        isMedium ? 'h-40' : 'h-32'
                      }`}
                    />
                    
                    {/* Overlay with media info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-sm font-medium">
                          {media.name || `Media ${index + 2}`}
                        </p>
                        <p className="text-xs opacity-80">
                          {media.ext?.toUpperCase() || 'IMAGE'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Features Section */}
      <div 
        id="interactive-features"
        className={`animate-on-scroll mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible['interactive-features'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <h4 className="text-xl font-bold text-[#0070ae] mb-4 text-center">
            Explore This Content
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">📖</div>
                <h5 className="font-semibold text-gray-800">Full Article</h5>
                <p className="text-sm text-gray-600">Read the complete story</p>
              </div>
            </div>
            
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🖼️</div>
                <h5 className="font-semibold text-gray-800">Gallery View</h5>
                <p className="text-sm text-gray-600">Browse all media</p>
              </div>
            </div>
            
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🔗</div>
                <h5 className="font-semibold text-gray-800">Share</h5>
                <p className="text-sm text-gray-600">Share this content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
