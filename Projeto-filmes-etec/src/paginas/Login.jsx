import estilos from './Login.module.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export function Login(){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()


    function autenticarUsuario(e){

        e.preventDefault()

        console.log(`E-mail: ${email}`)
        console.log(`Senha: ${senha}`)

        navigate('inicial')

    }

    return(
        <div className={estilos.conteiner}> 

            <form 
                className={estilos.formulario}
                onSubmit={autenticarUsuario}
            > 

                <input 
                    className={estilos.campo}
                    placeholder='E-mail' 
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />

                <input 
                    className={estilos.campo}
                    placeholder='Senha' 
                    value={senha}
                    onChange={ e => setSenha(e.target.value) }
                />

                <button
                    className={estilos.botao}
                    type='submit'
                >Entrar</button>

            </form>
        </div>
    )
}
