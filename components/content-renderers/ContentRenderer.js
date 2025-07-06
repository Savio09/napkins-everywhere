import TextOnlyRenderer from "./TextOnlyRenderer";
import ImagesOnlyRenderer from "./ImagesOnlyRenderer";
import ImagesAndTextRenderer from "./ImagesAndTextRenderer";
import MixedMediaRenderer from "./MixedMediaRenderer";

export default function ContentRenderer({ entry, isVisible }) {
  const contentType = entry.content_type || "mixed_media"; // Default to mixed_media for backward compatibility

  switch (contentType) {
    case "text_only":
      return <TextOnlyRenderer entry={entry} isVisible={isVisible} />;

    case "images_only":
      return <ImagesOnlyRenderer entry={entry} isVisible={isVisible} />;

    case "images_and_text":
      return <ImagesAndTextRenderer entry={entry} isVisible={isVisible} />;

    case "mixed_media":
    default:
      return <MixedMediaRenderer entry={entry} isVisible={isVisible} />;
  }
}

export function detectContentType(entry) {
  const hasContent = entry.content && entry.content.trim().length > 0;
  const hasImages = entry.media_files && entry.media_files.length > 0;

  if (hasContent && hasImages) {
    return entry.media_files.length > 3 ? "mixed_media" : "images_and_text";
  } else if (hasContent && !hasImages) {
    return "text_only";
  } else if (!hasContent && hasImages) {
    return "images_only";
  } else {
    return "mixed_media"; // Default fallback
  }
}
