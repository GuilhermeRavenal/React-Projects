import { useState } from 'react'
import './home.css'

import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

    async function handleLogin(e){
      e.preventDefault();

      if(email !== '' && password !== ''){

        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          //Navegas para main
          navigate('/admin', {replace: true } )
        })
        .catch(() =>{
          alert('Email ou senha errado!')
        })

      }else{
        alert("Preencha todos os campos")
      }

    }
    return(
      <div className="home-container">
        <h1>lista de tarefas</h1>
        <span>Gerencie sua agenda de forma facil</span>

      <form className='form' onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value) }
        />

        <button type='submit'>Acessar</button>
      </form>

      <Link className='button-Link' to='/register'>
        Não possui um conta? Cadastre-se
      </Link>
    </div>
    )
  }