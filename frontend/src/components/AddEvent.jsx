import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    venue: "",
    ticketQuota: "",
    ticketPrice: "",
  });

  const token = localStorage.getItem("token");
  console.log(token);

  console.log(event.name, event.date, event.ticketQuota, event.ticketPrice);

  const handleChange = (e) => {
    console.log(e.target.value);
    const {name, value} = e.target;
    setEvent({...event, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    try {
      await axios.post(
        "http://localhost:2000/event",
        {
          name: event.name,
          date: event.date,
          venue: event.venue,
          ticketQuota: event.ticketQuota,
          ticketPrice: event.ticketPrice,
        },
        config
      );

      alert(`Sukses menambahkan event`);
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={event.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">
          Venue
        </label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={event.venue}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ticketQuota"
          className="block text-gray-700 font-bold mb-2">
          Ticket Quota
        </label>
        <input
          type="number"
          id="ticketQuota"
          name="ticketQuota"
          value={event.ticketQuota}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ticketPrice"
          className="block text-gray-700 font-bold mb-2">
          Ticket Price
        </label>
        <input
          type="number"
          step="0.01"
          id="ticketPrice"
          name="ticketPrice"
          value={event.ticketPrice}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddEvent;
