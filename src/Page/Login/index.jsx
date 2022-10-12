import React, { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../Api/connection";
import Spiner from "../../Components/loading";

const Login = ({ title }) => {
  // State
  const [email, setEmail] = useState("");
  const [toogle, setToogle] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    status: false,
    class: "",
  });
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToogle(true);

    if (email === "") {
      setError({
        message: "Preencha o campo email",
        status: true,
        class: "error",
      });
      return;
    } else if (password === "") {
      setError({
        message: "Preencha o campo senha",
        status: true,
        class: "error",
      });
      return;
    }

    api
      .post("/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.data);
          setToogle(false);

          localStorage.setItem("user", JSON.stringify(response.data.data));

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Logado com sucesso",
          });

          window.location.reload();
          navigate("/home");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: error.message,
        });
      });

    setEmail("");
    setPassword("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setToogle(true);
    if (email === "") {
      setError({
        message: "Preencha o campo email",
        status: true,
        class: "error",
      });
      return;
    } else if (password === "") {
      setError({
        message: "Preencha o campo senha",
        status: true,
        class: "error",
      });
      return;
    }

    api
      .post("/create/user", { username, email, password })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setToogle(false);
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Usuário criado com sucesso",
          });

          navigate("/login");
        }
      })
      .catch((error) => {
        setError({
          message: error.message,
          status: true,
          class: "error",
        });
        return;
      });

    setEmail("");
    setPassword("");
  };

  // return de login para entrar na aplicação
  if (title === "Login") {
    return (
      <div className="container-login">
        <img src="/img/ilus_bg.svg" alt="alt" className="imgWave" />
        <div className="content-login">
          <div className="content-form">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-email">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-password">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-button">
                {toogle ? (
                  <Spiner />
                ) : (
                  <button type="submit" className="btn">
                    Login
                  </button>
                )}
              </div>
              <Link to="/registrar" className="link-register">
                <p>Fazer o cadastro</p>
              </Link>
            </form>
          </div>
          <div className="content-img">
            <img src="img/imgLogin.jpg" alt="logo" />
          </div>
        </div>
      </div>
    );
  } else {
    // return de cadastro para criar uma conta
    return (
      <div className="container-login">
        <img src="/img/ilus_bg.svg" alt="alt" className="imgWave" />
        <div className="content-login">
          <div className="content-form">
            <h1>{title}</h1>
            <form onSubmit={handleCreate}>
              <div className="form-username-register">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-email-register">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-password-register">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-button">
                {toogle ? (
                  <Spiner />
                ) : (
                  <button type="submit" className="btn">
                    Registrar
                  </button>
                )}
              </div>
              <Link to="/login" className="link-register">
                <p>Entrar </p>
              </Link>
            </form>
          </div>
          <div className="content-img">
            <img src="img/imgLogin.jpg" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
