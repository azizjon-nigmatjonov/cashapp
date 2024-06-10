import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const routes = useSelector((state) => state.website.routes);
  console.log("routes login", routes);
  const navigateToRegistrationForm = () => navigate("/registration");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход в систему</h1>

      <LoginForm navigateToRegistrationForm={navigateToRegistrationForm} />
    </div>
  );
};

export default Login;
