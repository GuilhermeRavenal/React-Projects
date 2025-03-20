import { useState, useEffect } from 'react'

import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

import { Navigate } from 'react-router-dom'

export default function Private({ children }){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                //se tem usuário logado
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);

                } else {
                    //não possui usuario logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();
    }, [])

    if(loading){
        return(
        <div>
            <br/>
            <hr/>
                <center><h1>Carregando... Espere</h1></center>
                <center><img src='https://i.pinimg.com/originals/44/5f/1a/445f1ab89041d998d9fa937ad7f9efa3.gif' /></center>
            <hr/>            
        </div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>
    }

    return children;
}