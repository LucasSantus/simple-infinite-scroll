export interface PostItem {
  id: string;
  title: string;
  description: string;
  createAt: Date;
}

export type PostData = PostItem[];
