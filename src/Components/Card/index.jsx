import React, { useState, useEffect } from "react";
import "./styles.scss";
import { api } from "../../Api/connection";
import { useNavigate } from "react-router-dom";

const Card = ({ title }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const id = JSON.parse(localStorage.getItem("user"))?.user_id;

  const close = () => {
    window.location.reload();
    navigate("/home");
  };

  const add = (item) => {
    const data = {
      description,
      status,
      user_id: id,
    };
    api.post("/create", data).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };

  return (
    <div className="card">
      <div className="card__header">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <div className="description">
            <label>Descrição: </label>
            <input
              type="text"
              placeholder="Digite sua descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="status">
            <label>Status: </label>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="0">Selecione</option>
              <option value="pendente">Pendente</option>
              <option value="concluido">Concluido</option>
            </select>
          </div>
          <div className="button-tag">
            <button className="btn" onClick={() => add()}>
              Adicionar
            </button>
            <button className="btn" onClick={() => close()}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
