import { Skeleton, Text } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroller";

import { useGetArticles } from "../api/getArticles";
import useArticle from "../hooks/useArticle";

import ArticleCard from "./ArticleCard";
import classes from "./ArticleCards.module.css";

export default function ArticleCards() {
  const articleQuery = useGetArticles(
    { size: 10, sortBy: "latest" },
    { getNextPageParam: (lastPage) => lastPage.nextItemId || undefined },
  );
  const handleClick = useArticle();

  if (articleQuery.isLoading)
    return (
      <ul className={classes["card-list"]}>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
        <li>
          <Skeleton height={160} />
        </li>
      </ul>
    );

  if (!articleQuery.data?.pages.length) {
    return (
      <div className={classes["not-found"]}>
        <Text>등록된 링크가 없어요</Text>
      </div>
    );
  }

  return (
    <InfiniteScroll
      loadMore={() => articleQuery.fetchNextPage()}
      hasMore={articleQuery.hasNextPage}
    >
      <ul className={classes["card-list"]}>
        {articleQuery.data.pages.map((page) =>
          page.items.map((item) => (
            <li key={item.id}>
              <ArticleCard
                article={item}
                onClick={() => {
                  handleClick(item.id);
                }}
              />
            </li>
          )),
        )}
      </ul>
    </InfiniteScroll>
  );
}
