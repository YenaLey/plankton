import React, { useState, useEffect } from "react";
import "./WaggleChat.css";

export default function WaggleChat() {
  // 로컬스토리지에서 메시지를 가져오고 초기화
  const getStoredMessages = () => {
    const storedMessages = localStorage.getItem("waggleChatMessages");
    return storedMessages
      ? JSON.parse(storedMessages)
      : [
          {
            id: 1,
            text: "지금 사람 많이 붐비나요?",
            time: "오전 11:10",
            type: "received",
          },
          {
            id: 2,
            text: "안쪽 부스가 조금 덜 붐빈다고 들었어요!",
            time: "오전 11:45",
            type: "received",
          },
          {
            id: 3,
            text: "입구 쪽보다는 조금 더 들어가면 한적해요~",
            time: "오후 12:05",
            type: "received",
          },
        ];
  };

  const [messages, setMessages] = useState(getStoredMessages);
  const [newMessage, setNewMessage] = useState("");

  // 로컬스토리지에 메시지 저장
  const storeMessages = (messages) => {
    localStorage.setItem("waggleChatMessages", JSON.stringify(messages));
  };

  // 메시지 전송 핸들러
  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        type: "sent",
      };

      const updatedMessages = [...messages, newMessageObject];
      setMessages(updatedMessages);
      storeMessages(updatedMessages); // 로컬스토리지에 저장
      setNewMessage("");
    }
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    setMessages(getStoredMessages());
  }, []);

  return (
    <div className="wchat-container">
      <div className="wchat-messages">
        <h1>실시간 채팅에 참여하였습니다.</h1>
        {messages.map((message) => (
          <div key={message.id} className={`wchat-message ${message.type}`}>
            <span className="wchat-message-time">{message.time}</span>
            <p className="wchat-message-text">{message.text}</p>
          </div>
        ))}
      </div>
      <div className="wchat-input-container">
        <input
          type="text"
          placeholder="채팅을 입력해 보세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} className="wchat-send-button">
          🚀
        </button>
      </div>
    </div>
  );
}
