import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./Alert.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ auth }) => {
  // const [user, setUser] = useState(getUserInfoFromLocalStorage());
  const [user, setUser] = useState("");
  //SessionTimeOut
  const [time, setTime] = useState(0);
  const [isMobile, setIsmobile] = useState(false); // show-nav

  //* Session expire si on ne fait rien pendant 5 minutes
  const SessionTimeOut = () => {
    setTime(time + 1);
    console.log(time);
    if (time === 3) {
      // 3 minutes
      localStorage.clear();
      window.location.reload();
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      SessionTimeOut();
    }, 300000);
    return () => clearInterval(interval);
  }, [time]);

  // //quand je me login j'enlève le bouton login et j'affiche le bouton logout
  //   const [AuthButton, setAuthButton] = useState(false);

  //   const authButton = () => {
  //     setAuthButton(true);
  //   };

  let navigate = useNavigate(); // Use for Navigate on Previous

  const LogOut = () => {
    localStorage.removeItem("email"); // Remove Authenticated User
    localStorage.clear(); // Clear All Local Storage
    navigate(`/login`); // Navigate to Login Page
    setUser(auth.first_name("")); // Set User Name to Empty
  };

  useEffect(() => {
    let auth = localStorage.getItem("email");
    setUser(auth);
  }, []);

  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <h3 className="logo">Logo</h3>
        </Link>
        <ul
          className={isMobile ? "nav-links-mobile active" : "nav-links"} // Toggle Mobile Menu
          onClick={() => setIsmobile(false)}
          on
        >
          {/* <ul className="nav-links"> */}

          <Link to="/" className="home">
            <li>Home</li>
          </Link>
          {/* si l'utilisateur est connecté on cache le bouton register et si il
            n'est pas connecté on affiche register */}
          {/* si l'utilisateur est authentifié on affiche le ajouter */}
          {auth ? (
            <Link to="/add" className="ajouter">
              <li>AddT</li>
            </Link>
          ) : (
            "" // si l'utilisateur n'est pas authentifié on affiche rien
          )}

          {!auth && (
            <Link to="/register" className="register">
              <li>Register</li>
            </Link>
          )}

          {auth && ( // Logout nous redirige à la page d'accueil et on supprime le localstorage
            <Link to="/" className="Logout" onClick={LogOut}>
              <li>Logout</li>
            </Link>
          )}

          {/* <Link to="/login" className="login"></Link> */}
          {/* si l'utilisateur est connecté on enlève le bouton login / si l'utilisateur n'est pas connecté on affiche le bouton login */}
          {!auth && (
            <Link to="/login" className="login" onClick={LogOut}>
              <li>Login</li>
            </Link>
          )}

          {/* si l'utilisateur est connecté on affiche son userName et on retire notre login */}
          {/* {auth && (
              <span className="logout"> */}
          {/* Welcome: {SessionUsers} */}
          {/* <div className="user"> */}
          {/* Welcome: {auth.first_name} */}
          {/* {auth.first_name} */}
          {/* <Link to="/" className="Logout" onClick={LogOut}>
                    <li>Logout</li>
                  </Link>
                </div>
              </span>
            )}   */}
        </ul>

        <button
          className="mobile-menu-icon"
          onClick={() => setIsmobile(!isMobile)} // Toggle Mobile Menu
        >
          {isMobile ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </nav>
      {/* <div className="line">
          <hr />
        </div> */}
      <div className="bar"></div>
    </header>
  );
};

export default Navbar;
