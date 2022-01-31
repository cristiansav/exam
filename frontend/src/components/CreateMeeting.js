import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from '../Calls';
import {meetingRoute} from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateMeeting(){

    const [meeting, setMeeting] = useState
    ({
        MeetingDescription: "",
        MeetingURL: "",
        MeetingDateTime: null,
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    useEffect(async () => {
        if (!id)
            return;

        let data = await get(meetingRoute, id);
        setMeeting(data);    
    }, [])

    const onChangeMeeting = e => {
        setMeeting({...meeting, [e.target.MeetingDescription]: e.target.value});
    }

    const saveMeeting = async () => {
        if (!id)
            await post(meetingRoute, meeting);
        else
            await put(meetingRoute, id, meeting);
            
        navigate("/");    
    }

    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="MeetingDescription"
                        name="MeetingDescription"
                        label="Meeting Description"
                        fullWidth
                        value={meeting.MeetingDescription}
                        onChange={e => onChangeMeeting(e)}
                        />
                </Grid>

                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="MeetingURL"
                        name="MeetingURL"
                        label="Meeting URL"
                        fullWidth
                        value={meeting.MeetingURL}
                        onChange={e => onChangeMeeting(e)}
                        />
                </Grid>
            </Grid>

            <Button color="primary" variant='outlined' startIcon={<CancelIcon />}
                onClick={() => {navigate("/")}}
            >
                Cancel
            </Button>  

             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveMeeting}
            >
                Save
            </Button>  

        </div>
    )
}