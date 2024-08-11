import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Faucet from "./components/Faucet.js";
import TransactionERC from "./components/TransactionERC.js";
import TransactionManager from "./components/TransactionManager.js";
import Wallet from "./components/Wallet.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Wallet} />
        <Route exact path="/transaction" component={TransactionERC} />
        <Route exact path="/faucet" component={Faucet} />
      </Switch>
    </Router>
  );
}

export default App;
