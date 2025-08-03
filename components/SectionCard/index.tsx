"use client";

import "./sectionCard.css";
import { SectionCardPropsType } from "./types";

const SectionCard = (props: SectionCardPropsType) => {
  const { children, title } = props;
  return (
    <section className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-text mb-4">{title}</h2>
      {children}
    </section>
  );
};
export default SectionCard;
