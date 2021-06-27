import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
//import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import {Button} from '../components/Button';
import {RoomCode} from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import {Question} from '../components/Question';

import '../styles/room.scss';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string
}

export function AdminRoom(){

  //const notify = () => toast('Here is your toast.');

  const {user} = useAuth();

  const params = useParams<RoomParams>(); 
  const [newQuestion, setNewQuestion] = useState('');
  
  const history = useHistory();

  const roomId = params.id;

  const {title, questions} = useRoom(roomId);

  // async function handlerSendQuestion(event: FormEvent){

  //   event.preventDefault();

  //   if(newQuestion.trim() === ''){
  //     return;
  //   }
  //   if(!user){
  //     throw new Error('You munst log in');
  //   }

  //   const question = {
  //     content: newQuestion,
  //     author:{
  //       name: user.name,
  //       avatar: user.avatar 
  //     },
  //     isHighlighted: false,
  //     isAnswered: false
  //   };

  //   await database.ref(`rooms/${roomId}/questions`).push(question);

  //   setNewQuestion('');
  // }
  async function handlerDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja excluir essa pergunta')){
      const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function goingToHome(){
    history.push('/');
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo LetMeAsk" onClick={goingToHome}/>
            <div>
            <RoomCode code={roomId}/> 
            <Button isOutlined>Encerrar sala</Button>
            </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas(a)</span>}
        </div>

        <form>
          <textarea 
            placeholder="O que gostaria de perguntar!" 
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {/* <span hidden={user != null}>para enviar uma pergunta, <button>faça login</button></span> */}

            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                Olá {user.name}, envie sua pergunta!
              </div>
            ) : (
              <span>para enviar uma pergunta, <button>faça login</button></span>
            )}

            <Button  type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        {/* {JSON.stringify(questions)} */}

        <div className="question-list">
          {questions.map(question =>{
            return(
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button onClick={() => handlerDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta"/>
                </button>
              </Question>
            )
          })}
        </div>
        
      </main>
      
    </div>
  )
}

//algoritimo de reconciliação - estudar