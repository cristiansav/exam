import './App.css';
import MeetingList from './components/MeetingList';
import CreateMeeting from './components/CreateMeeting';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element ={<MeetingList/>} />
            <Route path="/CreateMeeting" element ={<CreateMeeting/>} />
            <Route path="/CreateMeeting/:id" element ={<CreateMeeting/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
