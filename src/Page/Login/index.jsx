import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { firebaseDB } from "../../Api/connection";

const Login = ({ title }) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    status: false,
    class: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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

    firebaseDB
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data.user.refreshToken);
        const newUser = {
          email: data.user.email,
          refreshToken: data.user.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
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
        navigate("/");
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

    firebaseDB
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        Swal.fire({
          icon: "success",
          title: "Conta criada com sucesso",
          showConfirmButton: false,
          timer: 1500,
        });
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

  useEffect(() => {
    if (error.status) {
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
        icon: error.class === "error" ? "error" : "success",

        title: error.message,
      });
    }
  }, [error]);

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
                <button type="submit" className="btn">
                  Login
                </button>
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
                <button type="submit" className="btn">
                  Register
                </button>
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
