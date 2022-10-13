import React, { useEffect, useState } from "react";
import "./styles.scss";
import { api } from "../../Api/connection";
import Card from "../../Components/Card";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [toogle, setToogle] = useState(false);
  const [toogleNew, setToogleNew] = useState(false);
  const id = JSON.parse(localStorage.getItem("user"))?.user_id;
  const [actual, setActual] = useState({
    id: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    api.get(`/consultar/${id}`).then((response) => {
      setData(response.data[0].tasks_tasks_user_idTousers);
    });
  }, []);

  const modalAdd = () => {
    setToogleNew(!toogle);
  };

  const modal = (item) => {
    setToogle(!toogle);
    setActual(item);
  };

  const edit = (item) => {
    api
      .put(`/atualizar/${item.task_id}`, {
        description: item.description,
        status: item.status,
        user_id: id,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setToogle(!toogle);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const remove = (item) => {
    window.confirm("Deseja realmente excluir essa tarefa?");

    if (item.status === "concluido") {
      api
        .delete(`/deletar/${item.task_id}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Tarefa não concluida");
    }
  };

  const deslogar = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (toogle) {
    return (
      <div className="container-homepage">
        <img src="/img/ilus_bg.svg" alt="alt" className="imgWave" />
        <div className="content-card">
          <div className="table-homepage">
            <table>
              <tbody>
                <tr className="title">
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Status</th>
                </tr>
                <tr className="tr-map">
                  <td>
                    <input type="text" value={actual.task_id} />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={actual.description}
                      onChange={(e) =>
                        setActual({ ...actual, description: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        setActual({ ...actual, status: e.target.value })
                      }
                    >
                      <option value="0">Selecione</option>
                      <option value="pendente">Pendente</option>
                      <option value="concluido">Concluido</option>
                    </select>
                  </td>
                </tr>
              </tbody>
              <div className="button-tag">
                <button className="btn" onClick={() => edit(actual)}>
                  Salvar
                </button>
                <button className="btn" onClick={() => remove(actual)}>
                  Excluir
                </button>
              </div>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-homepage">
      {toogleNew && <Card title="Adicionar Tarafas" />}
      <img src="/img/ilus_bg.svg" alt="alt" className="imgWave" />
      <div className="content-card">
        <div>
          <p>
            Usuario:
            <span>{JSON.parse(localStorage.getItem("user")).username}</span>
          </p>
          <p>
            <span onClick={() => deslogar()}>Sair</span>
          </p>
        </div>
        <div className="table-homepage">
          <table>
            <tbody>
              <tr className="title">
                <th>ID</th>
                <th>Descrição</th>
                <th>Status</th>
              </tr>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className={
                    item.status === "concluido" ? "tr-map concluido" : "tr-map"
                  }
                  onClick={() => modal(item)}
                >
                  <td>{item.task_id}</td>
                  <td>{item.description}</td>
                  <td>{item.status[0].toUpperCase() + item.status.slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-tag">
            <button className="btn" onClick={() => modalAdd()}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
