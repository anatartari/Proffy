import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/PageHeader";
import Input from "../../components/Input";
import WarningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItens, setScheduleItens] = useState([
    {
      week_day: "",
      from: "",
      to: "",
    },
  ]);

  function AddNewScheduleItem() {
    setScheduleItens([
      ...scheduleItens,
      {
        week_day: "0",
        from: "",
        to: "",
      },
    ]);
  }

  function setScheduleItemValue(
    position: Number,
    field: string,
    value: string
  ) {
    const newArr = scheduleItens.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setScheduleItens(newArr);
  }

  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    var classes = {
      name: name,
      avatar: avatar,
      whatsapp: whatsapp,
      bio: bio,
      subject: subject,
      cost: Number(cost),
      schedule: scheduleItens,
    };
    console.log(classes);
    await api
      .post("/classes", classes)
      .then(() => {
        alert("Aula criada com sucesso");

        history.push("/");
      })
      .catch(() => alert("Erro ao criar a aula"));
  }
  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrivel que você quer dar aulas"
        description="O primeiro passo é preeencher esse formulario de instrição"
      />

      <main>
        <form onSubmit={onFormSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Matemética", label: "Matemética" },
                { value: "Física", label: "Física" },
                { value: "Quimica", label: "Quimica" },
                { value: "Português", label: "Português" },
                { value: "Geografia", label: "Geografia" },
                { value: "Historia", label: "Historia" },
                { value: "Literatura", label: "Literatura" },
                { value: "Ingles", label: "Ingles" },
              ]}
            />

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={AddNewScheduleItem}>
                + Novo horários
              </button>
            </legend>
            {scheduleItens.map((item, index) => {
              return (
                <div className="schedule-item" key={item.week_day}>
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItens[index].week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sabado" },
                    ]}
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    //value={item.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />

                  <Input
                    name="to"
                    label="Ate"
                    type="time"
                    // value={item.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={WarningIcon} alt="Aviso importante" />
              Importante: <br />
              Preencha todos os dados!
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
