"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import useEditArticle from "../hooks/useEditArticle";

import { DetailsInputStep } from "./detail-input-step";
import classes from "./edit-article-form.module.css";
import { LinkInputStep } from "./link-input-step";

export function EditArticleForm() {
  const params = useParams();
  const id = Number(params.id);
  const [step, setStep] = useState(2);
  const { form, isArticleLoading, edit } = useEditArticle(id);

  const handleClickNext = (og: OG, url: string) => {
    setStep((prev) => prev + 1);
    form.setFieldValue("url", og.url ? og.url : url);
    form.setFieldValue("title", og.title);
    form.setFieldValue("description", og.description);
  };

  const handleClickPrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className={classes.wrap}>
      {step === 1 && <LinkInputStep value={form.values.url} onClickNext={handleClickNext} />}
      {step === 2 && (
        <DetailsInputStep
          mode="edit"
          form={form}
          isLoading={isArticleLoading}
          onPrev={handleClickPrev}
          onSubmit={() => edit(form.values)}
        />
      )}
    </div>
  );
}
