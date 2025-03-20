import estilos from './Sobre.module.css'

import foto from '../assets/usuario.jpeg'

export function Sobre(){

    return(
        <div className={estilos.conteiner}> 

            <img className={estilos.avatar} src={foto} />
            <p className={estilos.texto}>Guilherme Oliveira Costa</p>
            <p className={estilos.texto}>3°DSA</p>

        </div>
    )
}
