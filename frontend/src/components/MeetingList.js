import {useState, useEffect} from 'react';
import {get, remove} from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {meetingRoute} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';

export default function MeetingList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(meetingRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteMeeting = async(id, index) => {
        await remove(meetingRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    }

    return(
        <div>

            <div>
                <Button
                    variant='contained'
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {navigate("CreateMeeting")}}
                >
                    Create meeting
                </Button>
            </div>

            <br/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Meeting Id</TableCell>
                            <TableCell align="right">Meeting Description</TableCell>
                            <TableCell align="right">Meeting URL</TableCell>
                            <TableCell align="right">Meeting DateTime</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.MeetingId}>
                                <TableCell component="th" scope="row">
                                    {row.MeetingId}
                                </TableCell>
                                <TableCell align='right'>{row.MeetingDescription}</TableCell>
                                <TableCell align='right'>{row.MeetingURL}</TableCell>
                                <TableCell align='right'>{row.MeetingDateTime}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => navigate(`/AddMagazin/${row.MeetingId}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteMeeting(row.MeetingId, index)}>
                                        <DeleteIcon color="secondary" />
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