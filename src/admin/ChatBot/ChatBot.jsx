import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../../components/pages/navbar2';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';

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
      <div 
      style={{  border: "1px solid #3b1c3a" }}
      className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6">
      <div className="text-white">
        <h2 className="text-5xl font-bold pb-2">ChatBot</h2>
        <span className="block w-4/5 bg-[#834081] h-0.5"></span>

        <p className="text-m text-gray-300 mt-1">
          Asistente virtual de completa disponibilidad para soporte.
        </p>
      </div>
      <ChatBubbleBottomCenterIcon className="w-40 h-auto text-white p-4  rounded-full shadow-md" />
    </div>

      <div 
      style={{ backgroundColor: "#1f0a1e", border: "1px solid #3b1c3a" }}
      className="flex flex-col items-center justify-center w-[60%] mx-auto p-10 rounded-xl">
        

        <div className="w-full max-w-6xl h-[530px] bg-gray-200 rounded-3xl overflow-y-scroll p-6 shadow-lg mb-6">
          {answerList.length === 0 && (
            <p className="text-white p-6 rounded-xl text-center my-auto translate-y-44 w-[70%] mx-auto bg-[#834081]">Envía un mensaje al bot para empezar la conversación</p>
          )}
          {answerList.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`max-w-xs p-4  ${message.type === 'question'
                  ? 'bg-pink-500 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                  : 'bg-[#421940] text-white rounded-tl-xl rounded-tr-xl rounded-br-xl'
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center w-full max-w-6xl">
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
