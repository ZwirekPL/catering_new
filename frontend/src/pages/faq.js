import React from "react";
import { PageLayout } from "../components/layout/page-layout";
import FaqElement from "../components/faq-element";

export const FAQ = () => {
  const posts = [
    {
      question: "pytanie 1",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.",
    },
    {
      question: "pytanie 2",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.",
    },
    {
      question: "pytanie 3",
      answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eveniet ipsa possimus, ab necessitatibus quam alias, fuga fugit voluptatibus tenetur quae dignissimos? Blanditiis sapiente consectetur quas quasi nisi facere sint.",
    },
    { question: "pytanie 4", answer: "odpowiedz 4 " },
    { question: "pytanie 5", answer: "odpowiedz 5 " },
    { question: "pytanie 6", answer: "odpowiedz 6 " },
  ];

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          FAQ
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>Tutaj zanjedziesz najczęściej zadawane pytania.</span>
          </p>
        </div>
        {posts.map(({ answer, question }, index) => (
          <FaqElement key={index} answer={answer} question={question} />
        ))}
      </div>
    </PageLayout>
  );
};
