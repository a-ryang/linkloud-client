import { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { MenuList } from "@/features/menu/components";

export const metadata: Metadata = {
  title: "링클라우드 | 메뉴",
};

export default function Menu() {
  return (
    <AppShell title="메뉴">
      <MenuList />
    </AppShell>
  );
}
