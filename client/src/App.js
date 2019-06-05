import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos from "./pages/Todos";
import About from "./pages/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import Wrapper from "./components/Wrapper";


function App() {
  return (
    <Router>
      <div>
      {/* <Wrapper> */}
        <Nav /> 
          <Route exact path="/" component={About} />
          <Route exact path="/about" component={About} />
          <Route exact path="/todos" component={Todos} />
        <Footer />
      {/* </Wrapper> */}
      </div>
    </Router>
  );
}

export default App;
