import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    // Send user message
    const newUserInput = { role: 'user', message: userInput };
    setConversation(prevConversation => [...prevConversation, newUserInput]);
    setUserInput('');

    // Send user message to the server
    const response = await axios.post('http://localhost:5000/chat', { user_message: userInput });

    // Receive and display chatbot response
    const botResponse = { role: 'bot', message: response.data.bot_response };
    setConversation(prevConversation => [...prevConversation, botResponse]);
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {conversation.map((chat, index) => (
          <div key={index} className={`message ${chat.role}`}>
            <strong>{chat.role === 'user' ? 'You:' : 'Chatbot:'}</strong> {chat.message}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
