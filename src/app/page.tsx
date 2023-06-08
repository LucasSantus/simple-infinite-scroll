"use client";

import { FloatingButton } from "@/components/FloatingButton";
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
        pages: [posts.slice(0, 4)],
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
    <div className="flex h-full flex-col gap-5 p-5">
      <span className="text-lg font-normal underline">Posts</span>
      {_posts?.map((post, index) => {
        if (index === _posts.length - 1)
          return (
            <div className="border p-5 shadow-sm" ref={ref} key={post.id}>
              <span className="text-sm font-semibold">{post.title}</span>
              <p className="text-sm">{post.description}</p>
            </div>
          );

        return (
          <div className="border p-5 shadow-sm" key={post.id}>
            <span className="text-sm font-semibold">{post.title}</span>
            <p className="text-sm">{post.description}</p>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mb-5 cursor-pointer rounded-md border bg-slate-600 p-2 text-sm text-white hover:bg-slate-500"
        >
          {isFetchingNextPage
            ? "Loading..."
            : (data!.pages.length ?? 0) < 4
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </div>

      <FloatingButton />
    </div>
  );
}
