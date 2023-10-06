import { Chip, Group } from "@mantine/core";
import { useState } from "react";

import AppShell from "@/components/Layout/AppShell";
import Footer from "@/components/Layout/Footer";
import useAuth from "@/features/auth/hooks/useAuth";

import { SortBy } from "../api/getMyArticles";
import MyArticleCards from "../components/MyArticleCards";

import classes from "./MyArticles.module.css";

const sortOptions = [
  {
    value: "latest",
    label: "등록순",
  },
  {
    value: "reading",
    label: "읽는중",
  },
  {
    value: "unread",
    label: "읽지 않음",
  },
  {
    value: "read",
    label: "읽음",
  },
];

export default function MyArticles() {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<SortBy>("latest");

  return (
    <AppShell
      title="내 링크"
      ogTitle="내 링크"
      ogDescription="내 링크들을 모아볼 수 있어요"
    >
      <SortOptions onChange={(value) => setSortBy(value as SortBy)} />
      <section className={classes["article-section"]}>
        <h1 className="sr-only">링크 목록</h1>
        <MyArticleCards memberId={user.id} sortBy={sortBy} />
      </section>
      <Footer />
    </AppShell>
  );
}

interface SortOptionsProps {
  onChange: (value: string) => void;
}

const SortOptions = ({ onChange }: SortOptionsProps) => {
  const [currentOption, setCurrentOptions] = useState(sortOptions[0].value);

  const handleChange = (value: string) => {
    setCurrentOptions(value);
    onChange(value);
  };

  return (
    <Chip.Group
      multiple={false}
      value={currentOption}
      onChange={(value) => handleChange(value)}
    >
      <Group py="md" mx="lg" className="container">
        {sortOptions.map((option) => (
          <Chip
            key={option.value}
            value={option.value}
            size="md"
            variant="outline"
          >
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
};
