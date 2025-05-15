import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from '../context/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NoteItem from "../components/NoteItem";
import CoverHeader from "../components/CoverHeader";

export default function Home() {
  const { user } = useAuth();
  const [title, setTitle] = useState("Personal Diary");
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [emotions, setEmotions] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    // Load notes
    API.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error("Failed to pull notes:", err));

    // Load emotions
    API.get(`/emotions/${user.id}`)
      .then(res => {
        const map = {};
        res.data.forEach(item => {
          map[item.date] = item.emotion;
        });
        setEmotions(map);
      })
      .catch(err => {
        console.error("Failed to pull emotions:", err);
      });
  }, [user?.id]);

  const handleAddNote = () => {
    if (noteInput.trim() === "") return;

    const newNote = {
      text: noteInput.trim(),
      timestamp: new Date().toLocaleString(),
    };

    API.post("/notes", newNote)
      .then((res) => {
        setNotes((prev) => [res.data, ...prev]);
        setNoteInput("");
      })
      .catch((err) => {
        console.error("Failed to pull notes:", err);
        alert("Can't add note. Check the connection.");
      });
  };

  const handleEmotionChange = (dateStr, emoji) => {
    setEmotions((prev) => ({ ...prev, [dateStr]: emoji }));
    setSelectedDate(null);

    API.post("/emotions", {
      userId: user.id,
      date: dateStr,
      emotion: emoji,
    }).catch((err) => {
      console.error("Failed to save emotion:", err);
      alert("Lưu cảm xúc thất bại.");
    });
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
          <Calendar
            value={new Date()}
            onClickDay={(value) => {
              const dateStr = value.toISOString().slice(0, 10);
              setSelectedDate(dateStr);
            }}
            tileContent={({ date }) => {
              const dateStr = date.toISOString().slice(0, 10);
              const emoji = emotions[dateStr];
              return <div className="text-lg text-center">{emoji}</div>;
            }}
          />
        </div>

        {/* Emoji picker */}
        {selectedDate && (
          <div className="mt-4 p-2 border rounded bg-white shadow flex gap-3 items-center">
            <p className="text-sm">Chọn cảm xúc cho <strong>{selectedDate}</strong>:</p>
            {["😀", "😐", "😢", "😠"].map((em) => (
              <span
                key={em}
                onClick={() => handleEmotionChange(selectedDate, em)}
                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
              >
                {em}
              </span>
            ))}
            <button
              onClick={() => setSelectedDate(null)}
              className="ml-auto text-xs text-gray-500 hover:underline"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
