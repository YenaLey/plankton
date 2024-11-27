import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/List.css";
import { MdOutlinePlace } from "react-icons/md";

export default function List() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const dummyData = [
    {
      name: "서울세계불꽃놀이축제",
      position: "여의도한강공원",
      distance: "2km",
    },
  ];

  const handleClick = (position) => {
    setSelectedItem(position);
  };

  return (
    <div className="list-container">
      <div className="list-welcome">
        <div className="list-logo">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
        </div>
        <h1>
          와글와글에 오신 걸 환영해요! <br />내 주변 축제에 지금 입장하세요
        </h1>
      </div>
      <div className="list-list">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className={`list-block ${
              selectedItem === item.position ? "selected" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(item.position)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleClick(item.position);
            }}
          >
            <h2>{item.name}</h2>
            <p className="list-position">
              <MdOutlinePlace />
              &nbsp;{item.position}
            </p>
            <img src={process.env.PUBLIC_URL + "/image.png"} alt="img"></img>
            <div className="list-distance">
              <p>현재 내 위치에서</p>
              <hr />
              <p>{item.distance}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`list-enter ${selectedItem === null ? "" : "yes"}`}
        onClick={() => {
          if (selectedItem) {
            navigate("/main", { state: { position: selectedItem } });
          }
        }}
      >
        입장하기
      </button>
    </div>
  );
}
