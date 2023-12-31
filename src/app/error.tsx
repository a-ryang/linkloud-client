"use client";

import { Button, Center } from "@mantine/core";

import ROUTER from "@/constants/router";

import classes from "./error.module.css";

export default function Error() {
  return (
    <Center mih="100vh">
      <div className={classes.wrap}>
        <div className={classes["error-code"]}>500</div>
        <h1 className={classes.message}>
          에러가 발생했어요 <br />
          잠시후에 다시 시도해주세요
        </h1>
        <div>
          <Button component="a" href={ROUTER.HOME}>
            홈으로
          </Button>
        </div>
      </div>
    </Center>
  );
}
