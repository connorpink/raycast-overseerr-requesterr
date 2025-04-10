// Add to types.ts or create a new utils.ts file
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
  return MEDIA_TYPE_MAP[type] || { icon: '📌', label: mediaType || 'Unknown' };
};

export const isRequestable = (media: MediaResult) => {
  return media.mediaType !== "person" && !isMediaRequested(media.mediaInfo);
};

/**
 * Ensures API URL has the correct format by removing trailing slashes
 * and adding /api/v1 if not present
 */
export const normalizeApiUrl = (url: string): string => {
  // Remove trailing slash
  const cleanUrl = url.replace(/\/$/, "");
  // Add /api/v1 if not present
  return cleanUrl.includes("/api/v1") ? cleanUrl : `${cleanUrl}/api/v1`;
};