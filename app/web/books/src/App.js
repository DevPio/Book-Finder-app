import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import "./index.css";
import Menu from "./Components/Menu";

function App() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/" exact></Route>

        <Route path="/createBook">
          <div>Crie seu livro</div>
        </Route>
        <Route path="/searchBook">
          <div>Busque seu livro</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
