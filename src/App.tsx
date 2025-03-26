import { Provider } from "react-redux";
import styles from "./App.module.css";
import User from "./Components/User/User";
import { Users } from "./pages/Users/Users";
import { store } from "./store/store";
import { useEffect } from "react";
import { UsersService } from "./userServices";

function App() {
  useEffect(() => {
      UsersService.initialize().then(() => {
          console.log("Users data loaded successfully");
      });
  }, []);
    return (
        <Provider store={store}>
            <div className={styles.container}>
                <Users />
                <User />
            </div>
        </Provider>
    );
}

export default App;
