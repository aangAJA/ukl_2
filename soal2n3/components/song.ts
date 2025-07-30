export type SongFormData = {
    title: string;
    artist: string;
    description: string;
    thumbnail: File | null;
  };
  
  export type SongResponse = {
    success: boolean;
    message: string;
  };