import { useHistory } from 'react-router';
import inllustratorImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoGoogleImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import {useAuth} from '../hooks/useAuth';

import '../styles/auth.scss';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home(){
const history = useHistory();
const { user, signInWithGoogle } = useAuth();
const [roomCode, setRoomCode] = useState('');


async function handlerCreateRoom(){
  if(!user){
    await signInWithGoogle();
  }

  history.push('/room/new');
}

async function goingToHome(){
  history.push('/');
}

async function handlerJoingRoom(event: FormEvent){
  event.preventDefault();

  if(roomCode.trim() === ''){
    return;
  }


  const rooRef = await database.ref(`rooms/${roomCode}`).get();

  if(!rooRef.exists()){
    alert('Room not exists!');
    return;
  }

  if(rooRef.val().endedAt){
    alert('Room already closed.');
    return;
  }

  history.push(`room/${roomCode}`);

}

  return(
    <div id="page-auth">
      <aside>
        <img src={inllustratorImg} alt="Inlustração de perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>

      </aside>
      <main>

        <div className="main-container">
          <img src={logoImg} alt="LetMeAsk" onClick={goingToHome}/>

          <button className="create-roon" onClick={handlerCreateRoom}>
            <img src={logoGoogleImg} alt="logo do google" />
            Entrar com Google
          </button>

          <div className="separator">
            ou entre em uma sala existente
          </div>

          <form onSubmit={handlerJoingRoom}>
            <input 
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            type="text" 
            name="code_roon" 
            id="codeRoon" 
            placeholder="Informe o código da sala"/>
            <Button type="submit">
              Entrar
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}