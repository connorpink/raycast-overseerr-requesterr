import { MediaResult, MediaType, MediaInfo, MEDIA_TYPE_MAP } from "./types";

export const getMediaStatusBadge = (status?: number) => {
  switch (status) {
    case 1:
      return { text: "UNKNOWN", color: "secondary", icon: "❓" };
    case 2:
      return { text: "REQUESTED", color: "yellow", icon: "📝" };
    case 3:
      return { text: "PENDING", color: "yellow", icon: "⏳" };
    case 4:
      return { text: "PARTIALLY AVAILABLE", color: "orange", icon: "⚡" };
    case 5:
      return { text: "AVAILABLE", color: "green", icon: "✅" };
    default:
      return { text: "NOT REQUESTED", color: "red", icon: "" };
  }
};

export const getMediaTypeInfo = (mediaType: string) => {
  const type = mediaType?.toLowerCase() as MediaType;
  return MEDIA_TYPE_MAP[type] || { icon: "📌", label: mediaType || "Unknown" };
};

// Add this function to check if media is already requested or available
export const isMediaRequested = (mediaInfo?: MediaInfo) => {
    if (!mediaInfo) return false;
    return [2, 3, 4, 5].includes(mediaInfo.status);
  };

export const isRequestable = (media: MediaResult) => {
  return media.mediaType !== "person" && !isMediaRequested(media.mediaInfo);
};

/**
 * Ensures API URL has the correct format by removing trailing slashes
 * and adding /api/v1 if not present
 */
export const normalizeApiUrl = (url: string): string => {
  const cleanUrl = url.replace(/\/$/, "");
  return cleanUrl.includes("/api/v1") ? cleanUrl : `${cleanUrl}/api/v1`;
};

export const formatBytes = (bytes?: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const getMediaTypeDisplay = (mediaType?: string): string => {
  switch (mediaType?.toLowerCase()) {
    case "movie":
      return "🎬 Movie";
    case "tv":
      return "📺 TV Show";
    case "person":
      return "👤 Person";
    default:
      return mediaType ? `📌 ${mediaType}` : "Unknown";
  }
};