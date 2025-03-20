import estilos from "./FaleConosco.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const faleConoscoSchema = z.object({
  nome: z
    .string()
    .min(3, "Informe um nome!")
    .max(25, "Máximo de 25 caracteres!"),
  email: z.string().email({ message: "Informe um e-mail válido!" }),
  mensagem: z.string().min(1, { message: "Digite sua mensagem, por favor!" }),
});

export function FaleConosco() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(faleConoscoSchema),
  });

  function obterDadosFormulario(data) {
    alert(
      `Nome: ${data.nome} \nE-mail: ${data.email} \nMensagem: ${data.mensagem}`
    );
  }

  return (
    <div className={estilos.conteiner}>
      <p className={estilos.text}>Fale Conosco</p>
      <div className={estilos.formConteiner}>
        <form
          className={estilos.formulario}
          onSubmit={handleSubmit(obterDadosFormulario)}
        >
          <input
            {...register("nome")}
            className={estilos.campo}
            placeholder="Digite seu Nome"
          />
          {errors.nome && (
            <p className={estilos.mensagem}>{errors.nome.message}</p>
          )}
          <input
            {...register("email")}
            className={estilos.campo}
            placeholder="Digite seu E-mail..."
          />
          {errors.email && (
            <p className={estilos.mensagem}>{errors.email.message}</p>
          )}
          <textarea
            {...register("mensagem")}
            className={estilos.campoMensagem}
            placeholder="Digite sua mensagem..."
          />
          {errors.mensagem && (
            <p className={estilos.mensagem}>{errors.mensagem.message}</p>
          )}
          <button className={estilos.botao} type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
