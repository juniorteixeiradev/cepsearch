import styles from "./Formulario.module.css"
import { useState } from "react";
import api from "../../services/apiCep";

function Formulario({children}){
    const [input, setInput] = useState(''); //Usestate
    //input ai é uma variavel que é criada
    //seInput é uma função que muda o valor da variavel
    const [cep, setCep] = useState({});
    const [display, setDisplay] = useState('');
    const [transition, setTransition] = useState('');
    async function searchCep(){
        try{
            const response = await api.get(`${input}/json`);  
            setCep(response.data);
            console.log(response.data)
            setInput('');
        }

        catch{
            alert('Erro ao buscar');
            setInput('');
        }
        
    }

    function handleClick (){
        searchCep();
        setTransition(1);
        setDisplay('flex');
    }

    //jsx
    return(
        <>
            <div className={styles.formulario}>
                {children}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite seu cep" />
                <button onClick={handleClick}>Buscar!</button>


            </div>
            <div style={{display: display, opacity: transition}} className={styles.result}>
                    <h2>CEP: {cep.cep}</h2>
                    <h3>RUA: {cep.logradouro}</h3>
                    <h3>CIDADE: {cep.localidade}</h3>
                    <h3>ESTADO: {cep.uf}</h3>
                </div>
                <footer>Desenvolvido por <a href="https://www.linkedin.com/in/junior-teixeiradev/">Jun1or Teixeira.</a></footer>
        </>
    );
}

export default Formulario;