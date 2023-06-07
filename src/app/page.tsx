"use client";

import { PostList } from "@/components/PostList";
import { posts } from "@/data/posts";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 4, page * 4);
};

export default function Home() {
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
    }
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
    <>
      <PostList posts={_posts} ref={ref} />

      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="text-white"
      >
        {isFetchingNextPage ? "Loading more" : "more"}
      </button>
    </>
  );
}
