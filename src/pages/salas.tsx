
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
    FormControl,
    MenuItem,
    InputLabel,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import {useParams} from 'react-router-dom';
  import Select, { SelectChangeEvent } from '@mui/material/Select';

const Salas = () => {

    const { regiao } = useParams()

    const [currentRegion, setCurrentRegion] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomActive, setRoomActive] = useState(true);
    const [regions, setRegions] = useState<any>([]);
    const [rooms, setRooms] = useState<any>([])

    const handleChange = (event: SelectChangeEvent) => {
      setCurrentRegion(event.target.value);
    };

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

  async function updateRoomActivation(room: string, region: string, active: boolean){
    await FirebaseService.updateRoomActivation({
      uid: region + ' - ' + room,
      active: active,
    })
    fetchRooms()
  }

  async function fetchRegions() {
    const data = await FirebaseService.getAll({
      collection: 'regions'
    }) as Array<any>
    setRegions(data[0].regions)
  }

    async function createRooms() {
      await FirebaseService.createRoom({
          name: roomName,
          region: currentRegion??regiao,
          active: roomActive,
        })
      fetchRooms()
    }

    
  async function deleteRoom(roomName: string, regionName: string) {
    await FirebaseService.deleteRoom({
        room: roomName,
        region: regionName,
      })
    fetchRooms()
  }

  useEffect(() => {
    fetchRegions()
    fetchRooms()
  }, [])

  return (
      <div>
      <br></br>
      <span> Room Name: </span><input onChange={
        (e) => setRoomName(e.target.value)
      }></input>
      <br></br>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentRegion}
          onChange={handleChange}
          label="Age"
        >
          {regions?.map((region: any, idx: number) => (
              <MenuItem value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <span> Room Active: </span><input type="checkbox" checked={roomActive} onChange={
        (e) => setRoomActive(e.target.checked)
      }></input>
      <br></br>

      <br></br>
      <button onClick={createRooms}>
        Create Room
      </button>
      { /*
      <button onClick={() => FirebaseService.updateRoomActivation({
        uid: regionName + ' - ' + roomName,
        active: roomActive,
      }).then(k => console.log(k))}>
        updateRoomActivation
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
                {/* @ts-ignore */}
                <input type="checkbox" checked={room.active} onChange={(e) => updateRoomActivation(room.name, room.region, e.target.checked)}></input>
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