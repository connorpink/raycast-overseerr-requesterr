
export interface MediaResult {
  id: number;
  mediaType: string;
  popularity: number;
  posterPath: string;
  profilePath?: string;
  backdropPath: string;
  voteCount: number;
  voteAverage: number;
  genreIds: number[];
  overview: string;
  originalLanguage: string;
  title?: string;
  name?: string;
  originalTitle?: string;
  originalName?: string;
  releaseDate?: string;
  firstAirDate?: string;
  adult: boolean;
  video?: boolean;
  mediaInfo?: MediaInfo;
}

// Add a type for media types
export type MediaType = 'movie' | 'tv' | 'person';


export interface MediaTypeInfo {
  icon: string;
  label: string;
}

export const MEDIA_TYPE_MAP: Record<MediaType, MediaTypeInfo> = {
  movie: { icon: '🎬', label: 'Movie' },
  tv: { icon: '📺', label: 'TV Show' },
  person: { icon: '👤', label: 'Person' }
};

export interface MediaInfo {
  id: number;
  tmdbId: number;
  tvdbId: number;
  status: number;
  status4k?: number;
  requests: Request[];
  createdAt: string;
  updatedAt: string;
  downloadStatus?: Array<{
    title: string;
    status: string;
    size: number;
    sizeLeft: number;
    timeLeft: string;
    estimatedCompletionTime: string;
  }>;
}

export interface Preferences {
  apiUrl: string;
  apiKey: string;
}
export interface Request {
  id: number;
  status: number;
  media: string;
  createdAt: string;
  updatedAt: string;
  requestedBy: User;
  modifiedBy: User;
  is4k: boolean;
  serverId: number;
  profileId: number;
  rootFolder: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  plexToken: string;
  plexUsername: string;
  userType: number;
  permissions: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  requestCount: number;
}

export interface RadarrSettings {
  id: number;
  name: string;
  hostname: string;
  port: number;
  apiKey: string;
  useSsl: boolean;
  baseUrl: string;
  activeProfileId: number;
  activeProfileName: string;
  activeDirectory: string;
  is4k: boolean;
  minimumAvailability: string;
  isDefault: boolean;
  externalUrl: string;
  syncEnabled: boolean;
  preventSearch: boolean;
}

export interface ServerProfile {
  name: string;
  id: number;
  upgradeAllowed: boolean;
  items: Array<{
    name?: string;
    quality?: {
      id: number;
      name: string;
    };
    allowed: boolean;
  }>;
}

export interface RootFolder {
  id: number;
  path: string;
}

export interface ServerTestResponse {
  profiles: ServerProfile[];
  rootFolders: RootFolder[];
}

export interface TVShowSeason {
  id: number;
  airDate: string;
  episodeCount: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
}

export interface TVShowDetails {
  id: number;
  name: string;
  seasons: TVShowSeason[];
  // ... other fields as needed
}

export interface DetailedTVShowInfo {
  episodeRunTime: number[];
  numberOfEpisodes: number;
  numberOfSeasons: number; // Fix: Changed from numberOfSeason
  inProduction: boolean;
  status: string;
  contentRatings?: {
    results: Array<{
      iso_3166_1: string;
      rating: string;
    }>;
  };
  networks: Array<{
    id: number;
    name: string;
    logoPath: string;
  }>;
  lastEpisodeToAir?: {
    airDate: string;
    episodeNumber: number;
    seasonNumber: number;
    name: string;
  };
  nextEpisodeToAir?: {
    airDate: string;
    episodeNumber: number;
    seasonNumber: number;
    name: string;
  };
  seasons: Array<{
    id: number;
    name: string;
    episodeCount: number;
    seasonNumber: number;
    airDate?: string;
  }>;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface PersonDetails {
  id: number;
  name: string;
  deathday?: string;
  knownForDepartment?: string;
  alsoKnownAs?: string[];
  gender?: string;
  biography?: string;
  popularity?: string;
  placeOfBirth?: string;
  profilePath?: string;
  adult?: boolean;
  imdbId?: string;
  homepage?: string;
  birthday?: string;
}

export interface ExtendedMediaInfo extends MediaInfo {
  status4k?: number;
  downloadStatus?: Array<{
    title: string;
    status: string;
    size: number;
    sizeLeft: number;
    timeLeft: string;
    estimatedCompletionTime: string;
  }>;
}