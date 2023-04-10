import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function EventList() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    let response = await axios.get("http://localhost:2000/event");
    setEventList(response.data.data);
  };

  return (
    <div>
      <table className="w-full mt-8">
        <thead className="bg-gray-200">
          <tr className="text-gray-600 font-bold uppercase text-sm border-b-2 border-gray-300">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Venue</th>
            <th className="py-3 px-6 text-left">Quota Ticket</th>
            <th className="py-3 px-6 text-left">Ticket Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {eventList.map((event, index) => {
            return (
              <tr className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left">{event.name}</td>
                <td className="py-3 px-6 text-left">{event.date}</td>
                <td className="py-3 px-6 text-left">{event.venue}</td>
                <td className="py-3 px-6 text-left">{event.ticketQuota}</td>
                <td className="py-3 px-6 text-left">{event.ticketPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center">
        <Link
          to="/add-event"
          className="bg-slate-100 hover:bg-slate-200 shadow-gray-700 px-6 py-3 mt-10 rounded-md">
          Add Event
        </Link>
      </div>
    </div>
  );
}

export default EventList;
