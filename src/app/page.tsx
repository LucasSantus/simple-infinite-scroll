"use client";

import { getPosts } from "@/utils/getPosts";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const posts = getPosts(60);

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 4, page * 4);
};

function Home() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [posts.slice(0.2)],
        pageParams: [1],
      },
    },
  );

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef!.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div>
      posts:
      {_posts?.map((post, index) => {
        if ((index = _posts.length))
          return (
            <div className="h-80 text-white" ref={ref} key={post.id}>
              {post.title}
            </div>
          );

        return (
          <div className="h-80 text-white" key={post.id}>
            {post.title}
          </div>
        );
      })}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more" : (data!.pages.length ?? 0) < 3 ? "Load more" : "Nothing more to load"}
      </button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
