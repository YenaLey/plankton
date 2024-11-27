import React, { useEffect, useState } from "react";
import "@/styles/notice.css";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch notices from the API
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        } else {
          console.error("Failed to fetch notices:", response.status);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Format timestamp to display in AM/PM format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  return (
    <div className="notice-container">
      <div className="notice-title">
        <h1>관리자 공지글</h1>
      </div>
      <div className="notice-list">
        {isLoading ? (
          <p>로딩 중입니다...</p>
        ) : (
          notices.map((element, index) => (
            <div className="notice-box" key={index}>
              {/* <p style={{ color: "red" }}>
                  {formatTimestamp(element.timestamp)}
                </p> */}
              <div
                className="notice-box-content"
                style={{ borderLeftColor: "red" }}
              >
                <h1 style={{ color: "red" }}>{element.title}</h1>
                <h4>{element.content}</h4>
                {/* {element.image && (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/img/${element.image}`}
                      alt={`notice-${index}`}
                    />
                  )} */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
