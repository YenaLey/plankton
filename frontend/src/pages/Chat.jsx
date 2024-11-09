import { useEffect, useState } from "react";
import "@/styles/Chat.css";
import { chat } from "@/services/chatbotService";

export default function Chat() {
  const [inputValue, setInputValue] = useState(""); // 사용자 입력값
  const [messages, setMessages] = useState([]); // 대화 메시지 리스트
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [showFAQ, setShowFAQ] = useState(true); // 자주 묻는 질문 표시 상태

  const faqQuestions = [
    {
      question: "행사 운영 시간은 언제인가요?",
      answer:
        "행사는 오후 5시부터 10시까지 진행됩니다. 불꽃놀이는 오후 8시부터 시작됩니다.",
    },
    {
      question: "주요 이벤트는 무엇인가요?",
      answer:
        "불꽃놀이 외에도 다양한 공연과 먹거리 부스가 운영되며, 포토존에서 사진을 찍으실 수 있습니다.",
    },
    {
      question: "부스별 안내를 받을 수 있나요?",
      answer:
        "행사장 내에 안내 부스가 마련되어 있으며, 각 부스의 위치와 정보를 제공해드립니다.",
    },
    {
      question: "우천 시에도 행사가 진행되나요?",
      answer:
        "우천 시에는 일부 일정이 조정될 수 있으며, 폭우 시에는 행사가 취소될 수 있습니다. 관련 정보는 홈페이지와 SNS에서 확인해주세요.",
    },
    {
      question: "반려동물 동반이 가능한가요?",
      answer:
        "불꽃놀이 축제는 많은 인파와 큰 소음이 발생하므로 반려동물 동반은 권장하지 않습니다.",
    },
  ];

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content:
          "안녕하세요? 궁금하신 점을 말씀해주세요.\n하단의 자주 묻는 질문을 확인해보세요!",
      },
    ]);
  }, []);

  const fetchChat = async (query) => {
    setIsLoading(true); // 로딩 시작
    const { status, data } = await chat(query);

    if (status === 200 && data) {
      // 응답 메시지를 messages 상태에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: data }, // 응답 메시지
      ]);
    } else {
      console.error("Error fetching chat response:", status);
    }
    setIsLoading(false); // 로딩 종료
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // 사용자 입력 메시지를 messages 상태에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputValue },
    ]);

    // 사용자 입력을 기반으로 챗봇 응답을 요청
    fetchChat(inputValue);

    // 입력 필드 초기화
    setInputValue("");

    // 사용자가 메시지를 전송하면 FAQ를 숨김
    setShowFAQ(false);
  };

  const handleFAQClick = (answer) => {
    // 선택된 FAQ 답변을 messages에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "bot", content: answer },
    ]);

    // FAQ 버튼 클릭 시에도 FAQ를 숨김
    setShowFAQ(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">답변을 기다리는 중...</div>
        )}
      </div>
      {showFAQ && (
        <div className="faq-container">
          {faqQuestions.map((faq, index) => (
            <button
              key={index}
              className="faq-button"
              onClick={() => handleFAQClick(faq.answer)}
            >
              {faq.question}
            </button>
          ))}
        </div>
      )}
      <div className="chat-input-box">
        <input
          placeholder="궁금한 사항을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
