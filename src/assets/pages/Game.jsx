import {useEffect, useState } from "react";
import {Link} from 'react-router';
// import click from '../sound/click.mp3';
import par_mp3 from '../sound/A.mp3';
import click_mp3 from '../sound/B.mp3';
import winner_mp3 from '../sound/C.mp3';
import error_mp3 from '../sound/D.mp3';
const cartasInit = ['A', 'B', 'C', 'D', 'E','F','A', 'B', 'C', 'D', 'E','F'];

function tarjetas(){
    const cartas = cartasInit.sort(()=> Math.random() - 0.5).map((value, index)=>{return {id: index, value, giro: false, par: false}}); 
    return cartas
}

function Game() {
    const [cartas, setCartas] = useState(tarjetas());
    const [desable, setDesable] = useState(false);
    const [tiro1, setTiro1] = useState(null);
    const [tiro2, setTiro2] = useState(null);
    const [giro, setGiro] = useState(true);
    const [scores, setScores] = useState(0);
    const [winner, setWinner] = useState(false);

    useEffect(()=>{
        let id;
        if(giro){
            id = setTimeout(()=>{
                setGiro(false);
            },800);
        }

        return ()=>{clearTimeout(id)}
    },[giro]);


    useEffect(()=>{
        if(tiro1 && tiro2){
            setDesable(true)
            if(tiro1.value === tiro2.value){
                setCartas(prev => {
                    const newCards = prev.map((card)=>{
                    if(card.value === tiro1.value){
                        return {...card, par: true}
                    }
                    return card;
                })

                ganador(newCards);
                return newCards;
            });
                
                click(par_mp3);
                setScores(scores + 2);
                resetTurno();
            }else{
                // resetTurno();
                click(error_mp3);
                setTimeout(()=>{
                    setCartas(prev => prev.map(card => {
                        if(tiro1.id === card.id || tiro2.id === card.id){
                            return {...card, giro: false, par: false}
                        }
                        return card;
                    }))
                    
                    console.log(cartas);
                    resetTurno();
                },800);
            }
        }
    },[tiro1, tiro2])

    function click(audio){
        const sonido = new Audio(audio);
        if(sonido){
            sonido.play()
        }
    }
    
    
    function volteoDeCartas(card){
        if(desable || card.giro ||(tiro1 && tiro1.id === card.id)){return}
        click(click_mp3);
        setCartas(prev => {return prev.map((item)=>{
            if(item.id === card.id){
                return {...item, giro: true}
            }else{
                return item
            }  
        })})
        
        if(!tiro1){
            setTiro1(card)
        }else{
            setTiro2(card)
        }
    }
    
    function resetTurno(){
        setDesable(false);
        setTiro1(null);
        setTiro2(null);
    }

    function resetGame(){
        setWinner(false);
        setScores(0);
        setCartas(tarjetas());
        resetTurno();
        setTimeout(()=>{
            setGiro(true);
        },800)
    }

    function ganador(win){
        const winner = win.every(item => item.par)
        if(winner){
            click(winner_mp3);
            setWinner(true);
        }
    }
    
    
// console.log(cartas);

  return (
    <main className='main-game'>

        <h1 className="title">Momorama</h1>
        <section className='container-game'>
            <p className="scores">Puntuacion: {scores}</p>
            {cartas.map((item)=>{
                return (
                    <article key={item.id} className={`card ${giro || item.giro || item.par ? 'activa' : ''}`} onClick={()=> volteoDeCartas(item)}>
                        <div className='card-face'>{item.value}</div>
                        <div className='card-back'></div>
                    </article>
                );
            })}
            {winner && (
                <article className="winner">
                    <h1>Has Ganado</h1>
                    <button className="btn" onClick={resetGame}>Reset</button>
                </article>
            )}
        </section>

        <button className="btn-home">
            <Link className="link" to="/">Ir a inico</Link>
        </button>

    </main>
  )
}

export default Game