import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  const handleDeleteClick = async (id) => {
    const config = { method: "DELETE" };
    const response = await fetch(
      `http://localhost:4000/questions/${id}`,
      config
    );
    const filteredQuestions = questions.filter(
      (question) => question.id !== id
    );
    setQuestions(filteredQuestions);
  };

  const handleAnswerChange = async (selection, id) => {
    console.log("ID for element", id)
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: selection }),
    };
    console.log("Id for element", id);
    const response = await fetch(
      `http://localhost:4000/questions/${id}`,
      config
    ).then((r) => r.json());
    console.log(response);

    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return response;
      }
      else return question
    }
    )
    setQuestions(updatedQuestions);
  };

  const questionMap = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onAnswerChange={handleAnswerChange}
      onDeleteClick={handleDeleteClick}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
