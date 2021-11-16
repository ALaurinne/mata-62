
import * as FirebaseService from '../services/firestore.service';
import * as Auth from "firebase/auth";

import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    IconButton,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import {useParams} from 'react-router-dom'

// import { Container } from './styles';

const Salas = () => {

    const { regiao } = useParams()


    const [roomName, setRoomName] = useState("");
    const [roomActive, setRoomActive] = useState(true);
  
    const [rooms, setRooms] = useState<any>([])

    async function fetchRooms() {
      if(!regiao) {
          const data = await FirebaseService.getAll({
            collection: 'rooms'
          })
          setRooms(data)
      } else {
        const data = await FirebaseService.getRoomsFromRegion({
            region: regiao,
          })
          setRooms(data)
      }
  }

  async function deleteRoom(roomName: string, regionName: string) {
    await FirebaseService.deleteRoom({
        room: roomName,
        region: regionName,
      })
    fetchRooms()
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  console.log(rooms)

  return (
      <div>
      <br></br>
      <span> Room Name: </span><input onChange={
        (e) => setRoomName(e.target.value)
      }></input>
      <br></br>
      <span> Room Active: </span><input type="checkbox" checked={roomActive} onChange={
        (e) => setRoomActive(e.target.checked)
      }></input>
      <br></br>

      <br></br>
      <button onClick={fetchRooms}>
        getAllRooms
      </button>
      { /*
      <button onClick={() => FirebaseService.getRoomsFromRegion({
        region: regionName,
      }).then(k => console.log(k))}>
        getRoomsFromRegion
      </button>
      <button onClick={() => FirebaseService.createRoom({
        name: roomName,
        region: regionName,
        active: roomActive,
      }).then(k => console.log(k))}>
        createRoom
      </button>
      <button onClick={() => FirebaseService.updateRoomActivation({
        uid: regionName + ' - ' + roomName,
        active: roomActive,
      }).then(k => console.log(k))}>
        updateRoomActivation
      </button>
      <button onClick={() => FirebaseService.deleteRoom({
        room: roomName,
        region: regionName,
      }).then(k => console.log(k))}>
        deleteRoom
      </button>
    */ }
      <br></br>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Apagar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms?.map((room: any, idx: number) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {room.name}
                </TableCell>
                <TableCell>
                {room.region}
                </TableCell>
                <TableCell>
                <input type="checkbox" checked={room.active} onChange={(e) => setRoomActive(e.target.checked)}></input>
                </TableCell>
                <TableCell>
                <IconButton onClick={() => deleteRoom(`${room.name}`,`${room.region}`)} color="primary" aria-label="upload picture" component="span">
                            <DeleteIcon />
                        </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      </div>
  );
}

export default Salas;