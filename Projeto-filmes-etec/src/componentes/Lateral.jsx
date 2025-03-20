import estilos from "./Lateral.module.css";
import { Gear, FilmSlate, User, PaperPlaneRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import foto from "../assets/usuario.jpeg";

export function Lateral() {
  return (
    <aside className={estilos.conteiner}>
      <header>
        <img
          className={estilos.imagemCabecalho}
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <div className={estilos.perfil}>
          <img className={estilos.avatar} src={foto} />
          <strong>Guilherme Oliveira Costa</strong>
        </div>
      </header>
      <section className={estilos.opcoes}>
        <Link className={estilos.botao} to={"/inicial"}>
          <FilmSlate size={20} />
          <strong>Filmes</strong>
        </Link>

        <Link className={estilos.botao} to={"perfil"}>
          <Gear size={20} />
          <strong>Perfil</strong>
        </Link>

        <Link className={estilos.botao} to={"sobre"}>
          <User size={20} />
          <strong>Sobre</strong>
        </Link>

        <Link className={estilos.botao} to={"faleConosco"}>
          <PaperPlaneRight size={20} />
          <strong>Fale conosco</strong>
        </Link>
      </section>
    </aside>
  );
}
