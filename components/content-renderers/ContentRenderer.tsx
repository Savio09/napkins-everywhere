import type { Entry } from "@/types/strapi";
import ImagesAndTextRenderer from "./ImagesAndTextRenderer";
import ImagesOnlyRenderer from "./ImagesOnlyRenderer";
import MixedMediaRenderer from "./MixedMediaRenderer";
import TextOnlyRenderer from "./TextOnlyRenderer";

interface ContentRendererProps {
  entry: Entry;
  isVisible: Record<string, boolean>;
}

export default function ContentRenderer({ entry, isVisible }: ContentRendererProps) {
  const contentType = entry.content_type ?? "mixed_media";

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

export function detectContentType(entry: Entry): Entry["content_type"] {
  const hasContent = !!entry.content && entry.content.trim().length > 0;
  const hasImages = entry.media_files && entry.media_files.length > 0;

  if (hasContent && hasImages) {
    return entry.media_files.length > 3 ? "mixed_media" : "images_and_text";
  } else if (hasContent && !hasImages) {
    return "text_only";
  } else if (!hasContent && hasImages) {
    return "images_only";
  }
  return "mixed_media";
}
