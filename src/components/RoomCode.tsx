import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps){
  function copyRoomCodeToCleapboard(){
    navigator.clipboard.writeText(props.code)
  }
  return(
    <button className="room-code" onClick={copyRoomCodeToCleapboard}>
      <div>
        <img src={copyImg} alt="Copiar código da sala"  />
      </div>
      <span>{props.code}</span>
    </button>
  )
}