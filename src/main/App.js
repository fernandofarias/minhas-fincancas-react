import React from "react";

import 'bootswatch/dist/morph/bootstrap.css';
import '../custom.css';

import Rotas from "./rotas";
import Navbar from "../componentes/navbar/navbar";
import ProvedorAutenticacao from "./provedorAutenticacao";

import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <ProvedorAutenticacao>
      <Navbar style={{backgroundColor: "lightblue"}} />
      <div className="container">
      <Rotas />
      </div>
    </ProvedorAutenticacao>
  );
}

export default App;