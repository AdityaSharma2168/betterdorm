import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your CampusNest assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you find apartments near SJSU. What's your budget?",
        "We have several dorm options available. Would you like to see some?",
        "Looking for a roommate? Try our matching system for best results!",
        "Most apartments near campus range from $1,200 to $2,500 per month.",
        "You'll need to verify your student status with a university email.",
        "Our listings are updated daily. Check back often for new options!",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-primary-500'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-10 w-80 rounded-lg bg-white shadow-xl transition-all duration-300 sm:w-96 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat header */}
        <div className="rounded-t-lg bg-primary-500 p-4 text-white">
          <h3 className="font-semibold">CampusNest Assistant</h3>
          <p className="text-xs text-white/80">Ask me anything about student housing</p>
        </div>
        
        {/* Chat messages */}
        <div className="h-80 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-navy-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="mt-1 text-right text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;