import { useNavigate } from "react-router-dom";
import "@/styles/List.css";

export default function List() {
  const navigate = useNavigate();

  const dummyData = [
    {
      name: "서울세계불꽃놀이축제",
      position: "여의도한강공원",
      distance: "2km",
    },
    {
      name: "이태원할로윈축제",
      position: "이태원역",
      distance: "1.5km",
    },
  ];

  const handleClick = (position) => {
    navigate("/main", { state: { position } });
  };

  return (
    <div className="list-container">
      <h1>와글와글에 오신걸 환영해요!</h1>
      <div className="list-block">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="list-item"
            role="button"
            tabIndex={0} // Makes the element focusable
            onClick={() => handleClick(item.position)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleClick(item.position);
            }}
          >
            <h2>{item.name}</h2>
            <p>거리: {item.distance}</p>
            <p>위치: {item.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
