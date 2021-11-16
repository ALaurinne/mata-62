import * as FirebaseService from '../services/firestore.service';

import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
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


function Regiao(){
  const [regionName, setRegionName] = useState("");
  const [regions, setRegions] = useState<any>([]);

  async function fetchRegions() {
    const data = await FirebaseService.getAll({
      collection: 'regions'
    }) as Array<any>
    setRegions(data[0].regions)
  }

  async function deleteRegion(regionName: string) {
    await FirebaseService.deleteRegion({
      name: regionName
    })
    fetchRegions()
  }

  async function createRegion() {
    await FirebaseService.createRegion({
      name: regionName
    })
    setRegionName("")
    fetchRegions()
  }

  useEffect(() => {
    fetchRegions()
  }, [])
  
    return (
    <div>
      <br></br>
      <span> Region: </span><input onChange={
        (e) => setRegionName(e.target.value)
      }></input>
      <br></br>
      <br></br>
      <button onClick={createRegion}>
        createRegion
      </button>
      <button onClick={() => deleteRegion(regionName)}>
        deleteRegion
      </button>
      <br></br>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Apagar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regions?.map((region: any, idx: number) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {region}
                </TableCell>
                <TableCell align="right">
                        <IconButton onClick={() => deleteRegion(`${region}`)} color="primary" aria-label="upload picture" component="span">
                            <DeleteIcon />
                        </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    )
}

export default Regiao;