import { ActionPanel, Action, List, getPreferenceValues } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useState } from "react";
import { MediaDetail } from "./components/MediaDetail";
import { MediaRequestForm } from "./components/MediaRequestForm";
import { MediaResult, MediaInfo } from "./types";
import { getMediaStatusBadge, normalizeApiUrl } from "./utils";

interface Preferences {
  apiUrl: string;
  apiKey: string;
}

interface SearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: MediaResult[];
}

export default function MediaBrowser() {
  const { apiUrl, apiKey } = getPreferenceValues<Preferences>();
  const [searchText, setSearchText] = useState("");

  const baseApiUrl = normalizeApiUrl(apiUrl);

  // Determine which URL to use based on searchText
  const fetchUrl = searchText
    ? `${baseApiUrl}/search?query=${encodeURIComponent(searchText)}&page=1&language=en`
    : `${baseApiUrl}/discover/movies?page=1&language=en&sortBy=popularity.desc`;

  const { isLoading, data } = useFetch<SearchResponse>(fetchUrl, {
    headers: {
      "X-Api-Key": apiKey,
      accept: "application/json",
    },
    parseResponse: (response) => response.json(),
  });

  console.log("API URL:", fetchUrl);
  console.log("Response:", data);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search movies or browse trending..."
      throttle
    >
      <List.Section
        title={searchText ? "Search Results" : "Discover Movies"}
        subtitle={data?.results?.length.toString() ?? "0"}
      >
        {data?.results?.map((media) => <MediaListItem key={media.id} media={media} />) || []}
      </List.Section>
    </List>
  );
}

function MediaListItem({ media }: { media: MediaResult }) {
  const title = media.title || media.name || "Unknown Title";
  const releaseDate = media.releaseDate || media.firstAirDate || "";
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";

  // Format vote average with null check
  const rating = typeof media.voteAverage === "number" ? `⭐ ${media.voteAverage.toFixed(1)}` : "";

  // Create poster URLs for different sizes
  const posterUrlSmall = media.posterPath ? `https://image.tmdb.org/t/p/w154${media.posterPath}` : null;

  const posterUrlLarge = media.posterPath ? `https://image.tmdb.org/t/p/w342${media.posterPath}` : null;

  // Get media status badge
  const requestStatus = getMediaStatusBadge(media.mediaInfo?.status);

  // Get media type display
  const mediaTypeDisplay = (() => {
    switch (media.mediaType?.toLowerCase()) {
      case "movie":
        return "🎬 Movie";
      case "tv":
        return "📺 TV Show";
      case "person":
        return "👤 Person";
      default:
        return media.mediaType ? `📌 ${media.mediaType}` : "Unknown";
    }
  })();

  const accessories = [
    { text: year ? year.toString() : "" },
    { text: rating },
    { text: mediaTypeDisplay },
    { text: requestStatus.icon },
  ].filter((acc) => acc.text !== "");

  // Add this function to check if media is already requested or available
  const isMediaRequested = (mediaInfo?: MediaInfo) => {
    if (!mediaInfo) return false;
    return [2, 3, 4, 5].includes(mediaInfo.status);
  };

  return (
    <List.Item
      icon={{ source: posterUrlSmall || "" }}
      title={title}
      subtitle={media.overview || "No overview available"}
      accessories={accessories}
      detail={
        <List.Item.Detail
          markdown={posterUrlLarge ? `![${title}](${posterUrlLarge})` : ""}
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label title="Title" text={title} />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Release Year" text={year.toString()} />
              <List.Item.Detail.Metadata.Label title="Rating" text={rating} />
              <List.Item.Detail.Metadata.Label title="Media Type" text={mediaTypeDisplay} />
              <List.Item.Detail.Metadata.Label title="Status" text={requestStatus.icon} />
              <List.Item.Detail.Metadata.Label
                title="Popularity"
                text={typeof media.popularity === "number" ? media.popularity.toFixed(1) : "N/A"}
              />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Overview" text={media.overview || "No overview available"} />
            </List.Item.Detail.Metadata>
          }
        />
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.Push
              title="View Details"
              target={<MediaDetail media={media} />}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
            />
            {!isMediaRequested(media.mediaInfo) && (
              <Action.Push
                title="Request Media"
                target={<MediaRequestForm media={media} />}
                shortcut={{ modifiers: ["cmd", "shift"], key: "return" }}
              />
            )}
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
