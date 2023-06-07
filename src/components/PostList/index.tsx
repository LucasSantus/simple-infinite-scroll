import { PostData } from "@/types/PostItem";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts?: PostData;
  ref: (element: any) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, ref }) => (
  <div>
    posts:
    {posts?.map((post, index) => {
      if (index === posts.length - 1) {
        // TODO: Passar o ref para esse cara aqui
        return (
          <PostItem
            key={post.id}
            title={post.title}
            description={post.description}
            createAt={String(post.createAt)}
          />
        );
      }

      return (
        <PostItem
          key={post.id}
          title={post.title}
          description={post.description}
          createAt={String(post.createAt)}
        />
      );
    })}
  </div>
);
