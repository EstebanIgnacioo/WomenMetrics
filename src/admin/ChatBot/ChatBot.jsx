import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../../components/pages/navbar2';

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answerList, setAnswerList] = useState([]);

  async function generateAnswer() {
    const userQuestion = question;
    setAnswerList([...answerList, { type: 'question', content: userQuestion }]);

    setQuestion("");

    const context = "Eres el asistente virtual de mi aplicación y tu rol es ayudar al usuario con preguntas específicas relacionadas con la funcionalidad de esta app. Mantén las respuestas concisas y claras, orientadas solo a la aplicación. No digas que no puedes recordar conversaciones, recuerda que tu memoria es mientras el usuario esté en la page. La app women security a la cual tu debes serl el guia se basa en un aplicativo que permite generar alertas personalizadas a los contactos que tu decidas mediante activación por voz. Tu guiarás al admin, no al usuario, recuerda eso";

    // Envía el contexto y el historial de conversación con la nueva pregunta
    const conversationHistory = answerList.map(msg => msg.content).join("\n");

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDToUtcdI8kPS80B8fV8-aI5A8Qk0Pm0ZM",
      method: "post",
      data: {
        "contents": [{ "parts": [{ "text": `${context}\n\n${conversationHistory}\nUsuario: ${userQuestion}` }] }],
      },
    });

    const botAnswer = response.data.candidates[0].content.parts[0].text;
    setAnswerList([...answerList, { type: 'question', content: userQuestion }, { type: 'answer', content: botAnswer }]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      generateAnswer();
    }
  }
  console.log("ChatBot rendered");

  return (
    <>
    

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white-800 mb-6">ChatBot</h1>

        <div className="w-full max-w-4xl h-96 bg-gray-200 rounded-3xl overflow-y-scroll p-6 shadow-lg mb-6">
          {answerList.length === 0 && (
            <p className="text-gray-500 text-center my-auto">Envía un mensaje al bot para empezar la conversación</p>
          )}
          {answerList.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`max-w-xs p-4 rounded ${message.type === 'question'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-300 text-gray-900'
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center w-full max-w-4xl">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown} // Detecta "Enter"
            className="flex-1 p-2 text-lg rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg text-black"
            placeholder="Escribe tu pregunta..."
            rows="1"
          />
          <button
            onClick={generateAnswer}
            className="ml-4 px-6 py-3 bg-pink-500 text-white text-lg rounded hover:bg-blue-600 focus:outline-none shadow-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
