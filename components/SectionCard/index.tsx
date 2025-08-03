"use client";

// 1. Styles
import "./sectionCard.css";

// 2. Types
import { SectionCardPropsType } from "./types";

const SectionCard = (props: SectionCardPropsType) => {
  // 1. Props destructuring
  const { children, title } = props;

  // 2. Return JSX rendering a styled section with a title and children content
  return (
    <section className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-text mb-4">{title}</h2>
      {children}
    </section>
  );
};

export default SectionCard;
