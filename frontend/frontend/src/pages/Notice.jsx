import React from "react";
import "@/styles/notice.css";

export default function Notice() {
    const notices = [
        {
            "title": "관람 구역에서 쓰러진 환자 발생 안내",
            "content": "현재 여의도공원 메인 무대 앞 구역에서 한 명의 관람객이 쓰러져 응급처치가 진행 중입니다. 가까이 계신 분들은 주변을 비워주시고, 해당 구역을 피하여 이동해 주시기 바랍니다.",
            "image": "https://example.com/emergency-icon.png",
            "level": 2,
            "timestamp": "2024-11-09T12:30:00Z",
        },
        {
            "title": "유모차 통행로 혼잡 안내",
            "content": "현재 푸드트럭과 메인 관람 구역을 잇는 유모차 전용 통행로가 매우 혼잡한 상태입니다. 다른 통로로 이동하시거나, 유모차 이용객 여러분께서는 안전에 유의해 주시기 바랍니다.",
            "image": null,
            "level": 1,
            "timestamp": "2024-11-09T11:24:00Z",
        },
        {
            "title": "화재 경미 발생 안내",
            "content": "현재 푸드트럭 구역에서 조리 과정 중 경미한 화재가 발생하여 안전요원이 진화 중입니다. 해당 구역에 계신 분들은 조금 떨어진 곳에서 대기해 주시기 바랍니다. 현재 추가 피해는 없으며, 신속히 조치 중입니다.",
            "image": null,
            "level": 2,
            "timestamp": "2024-11-09T10:45:00Z",
        }
    ];

    // 날짜를 오전/오후 형식으로 변환하는 함수
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat('ko-KR', options).format(date);
    };

    return (
        <div className="notice">
            <div className="notice-container">
                <div className="notice-title">
                    <h1>관리자 공지글</h1>
                </div>
                <div className="notice-list">
                    {notices.map((element, index) => {
                        return (
                            <div className="notice-box" key={index}>
                                <p style={{ color: element.level === 2 ? "red" : "rgb(31, 183, 0)" }}>{formatTimestamp(element.timestamp)}</p>
                                <div
                                    className="notice-box-content"
                                    style={{ borderLeftColor: element.level === 2 ? "red" : "rgb(31, 183, 0" }}
                                >
                                    <h1
                                        style={{ color: element.level === 2 ? "red" : "rgb(31, 183, 0)" }}
                                    >
                                        {element.title}
                                    </h1>
                                    <h4>{element.content}</h4>
                                    {(element.image !== null) &&
                                        // <img src={element.image} alt={index} />
                                        <img src={process.env.PUBLIC_URL + "/logo512.png"} alt={index} />
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
