import estilos from './Perfil.module.css'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'


const perfilSchema = z.object({

    nome: z.string()
           .min(2, 'Informe um nome!')
           .max(25, 'Máximo de 25 caracteres!'),
    
    email: z.string()
            .email({message: 'Informe um e-mail válido!'}),

    senha: z.string()
            .min(6, 'Mínimo de 6 caracteres!')
            .max(6, 'Máximo de 6 caracteres!')      
})


export function Perfil(){

    const {register, 
           handleSubmit,
           formState: {errors}
        } = useForm({
            resolver: zodResolver(perfilSchema)
        })


    function obterDadosFormulario(data){ 
        alert(`Nome: ${data.nome} \nE-mail: ${data.email} \nSenha: ${data.senha}`)
    }

    return(
        <div className={estilos.conteiner}> 

            <p className={estilos.titulo}>Perfil</p>

            <form 
                className={estilos.formulario}
                onSubmit={handleSubmit(obterDadosFormulario)}
            > 
                <input 
                    {...register('nome')}
                    className={estilos.campo}
                    placeholder='Nome' 
                />
                {errors.nome && (
                    <p className={estilos.mensagem}>
                        {errors.nome.message}
                    </p>
                )}

                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='E-mail' 
                />
                {errors.email && (
                    <p className={estilos.mensagem}>
                        {errors.email.message}
                    </p>
                )}

                <input 
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha' 
                />
                {errors.senha && (
                    <p className={estilos.mensagem}>
                        {errors.senha.message}
                    </p>
                )}

                <button
                    className={estilos.botao}
                    type='submit'
                >Confirmar</button>
            </form>
        </div>
    )
}
