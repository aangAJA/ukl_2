export interface Comment {
    comment_text: string;
    creator: string;
    createdAt: string;
  }
  
  export interface SongData {
    uuid: string;
    title: string;
    artist: string;
    description: string;
    source: string;
    thumbnail: string;
    likes: number;
    comments: Comment[];
  }
  
  export interface SongResponse {
    success: boolean;
    data: SongData;
    message: string;
  }