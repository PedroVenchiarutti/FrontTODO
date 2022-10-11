import React, { useEffect, useState } from "react";
import "./styles.scss";
import { api } from "../../Api/connection";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/consultar").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="container-homepage">
      <img src="/img/ilus_bg.svg" alt="alt" className="imgWave" />
      <div className="content-card">
        <div className="table-homepage">
          <table>
            <tr className="title">
              <th>ID</th>
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
            {data.map((item) => (
              <tr key={item.id} className="tr-map">
                <td>1</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
