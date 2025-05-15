import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";
import { useAuth } from '../context/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NoteItem from "../components/NoteItem";
import CoverHeader from "../components/CoverHeader";

export default function Home() {
  const { user, logout } = useAuth();
  const [title, setTitle] = useState("Personal Diary");
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [emotions, setEmotions] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    API.get("/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Failed to pull notes:", err));
  }, []);

  const handleAddNote = () => {
    if (noteInput.trim() === "") return;

    const newNote = {
      text: noteInput.trim(),
      timestamp: new Date().toLocaleString(),
    };

    API.post("/notes", newNote)
    .then((res) => {
      setNotes((prev) => [res.data, ...prev]);
      setNoteInput(""); // delete input after adding
    })
    .catch((err) => {
      console.error("Failed to pull notes:", err);
      alert("Can't add note. Check the connection.");
    });
  };

  const handleEmotionChange = (date, emoji) => {
    setEmotions((prev) => ({ ...prev, [date]: emoji }));
    setSelectedDate(null); // close popup
  };

  const renderEmotionCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let day = 1 - firstDay;

    while (day <= daysInMonth) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const current = new Date(year, month, day);
        const dateKey = current.toISOString().slice(0, 10);
        const emoji = emotions[dateKey] || "";

        week.push(
          <div
            key={i + day}
            onClick={() => day > 0 && day <= daysInMonth && setSelectedDate(dateKey)}
            className="border rounded-md w-10 h-10 flex items-center justify-center text-sm relative cursor-pointer hover:bg-yellow-100"
          >
            {day > 0 && day <= daysInMonth ? (
              <>
                <span>{emoji || day}</span>

                {/* Popup emoji when a cell is clicked */}
                {selectedDate === dateKey && (
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white border rounded shadow-md p-1 z-10 flex gap-1">
                    {["😀", "😐", "😢", "😠"].map((em) => (
                      <span
                        key={em}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent close immediatle
                          handleEmotionChange(dateKey, em);
                        }}
                        className="text-lg hover:scale-110 transition-transform cursor-pointer"
                      >
                        {em}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        );
        day++;
      }

      weeks.push(<div key={day} className="flex gap-1">{week}</div>);
    }

    return <div className="space-y-1">{weeks}</div>;
  };

  return (
    <div className="w-full pb-16">
      <CoverHeader title={title} setTitle={setTitle} />

      {/* Quote */}
      <div className="ml-28 mt-4 bg-gray-100 rounded-md px-4 py-2 flex items-center max-w-xl">
        <p className="text-gray-700 italic">
          Stay Hungry, Stay Foolish — <span className="not-italic">Steve Jobs</span>
        </p>
      </div>

      {/* Notes */}
      <div className="ml-28 mt-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Your Notes</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none"
            placeholder="Write a new note..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
          />
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {notes.map((note) => (
            <NoteItem key={note._id} text={note.text} timestamp={note.timestamp} />
          ))}
        </ul>
      </div>

      {/* Emotion Calendar */}
      <div className="ml-28 mt-10 max-w-xl">
        <h2 className="text-xl font-semibold mb-3">Emotion Calendar</h2>
        <div className="bg-yellow-50 p-4 rounded-md text-gray-700 text-sm">
          {renderEmotionCalendar()}
        </div>
      </div>
    </div>
  );
}
