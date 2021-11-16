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

export default function SalaRequired() {

    const [rooms, setRooms] = useState<any>([])

    async function fetchRooms() {
            const data = await FirebaseService.getAll({
                collection: 'roomSolicitations'
            })
            setRooms(data)
    }

    useEffect(() => {
        fetchRooms()
      }, [])

    console.log(rooms)

    return (
        <div>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    )
}
