import {Link, useHistory} from 'react-router-dom';
import inllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import {useAuth} from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom(){

  const {user} = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handlerCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomref = database.ref('rooms');

    const firebaseRoom = await roomref.push({
      authorId: user?.id,
      authorName: user?.name,
      title: newRoom,
    }); 

    history.push(`/room/${firebaseRoom.key}`);

  } 

  return(
    <div id="page-auth">
      <aside>
        <img src={inllustrationImg} alt="Inlustração de perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire dúvidas em tempo real</p>

      </aside>
      <main>

        <div className="main-container">
          <img src={logoImg} alt="LetMeAsk" />
          <h1>{user?.name}</h1>
          <div className="separator">
            Criar uma nova sala
          </div>

          <form onSubmit={handlerCreateRoom}>
            <input 
            onChange={event => setNewRoom(event.target.value)} 
            value={newRoom}
            type="text" name="code_roon" id="codeRoon" placeholder="nome da sala"/>
            <Button type="submit">
              Criar Sala
            </Button>

          </form>
          <p>Quer entrar uma nova sala existente <Link to="/">Clique aqui</Link></p>
        </div>

      </main>
    </div>
  )
}