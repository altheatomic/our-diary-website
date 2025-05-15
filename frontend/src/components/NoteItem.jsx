export default function NoteItem({ text, timestamp }) {
  return (
    <li className="bg-white shadow-sm rounded-md p-3 border">
      <p className="text-gray-800">{text}</p>
      <span className="text-sm text-gray-500">{timestamp}</span>
    </li>
  );
}
