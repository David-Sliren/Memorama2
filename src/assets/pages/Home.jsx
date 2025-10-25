import {Link} from 'react-router';
function Home() {
  return (
    <section className="home">
        <h1 className="title">WELCOME</h1>

        <article className="inicio">
            <p>Para iniciar el juego haz click en el boton</p>
            <button className="btn inicio_btn">
              <Link className='link' to="/game">Go To Game</Link>
            </button>
        </article>
    </section>
  )
}

export default Home