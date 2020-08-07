import React from "react";

import wppIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: Number;
  subject: string;
  cost: Number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {
  async function onWppClick() {
    await api.post("/connections", {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Avatar" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Proço/Hora
          <strong>{"R$" + teacher.cost}</strong>
        </p>

        <a
          target="_blank"
          onClick={onWppClick}
          href={"https://wa.me/" + teacher.whatsapp}
        >
          <img src={wppIcon} alt="wppIcon" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
