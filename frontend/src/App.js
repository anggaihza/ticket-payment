import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<EventList />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
