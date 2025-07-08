import React, { useState } from 'react';
import Button from '../../../components/Button';

interface Note {
  content: string;
  createdAt: string;
}

interface PrivateNotesSectionProps {
  notes: Note[];
  onSaveNote: (noteContent: string) => void;
}

const PrivateNotesSection: React.FC<PrivateNotesSectionProps> = ({ notes, onSaveNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleSaveNote = () => {
    if (newNote.trim()) {
      onSaveNote(newNote);
      setNewNote('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-text dark:text-text">Notas Privadas</h3>
      <div className="space-y-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nueva nota..."
          className="w-full p-2 border border-border rounded-lg bg-backgroundSecondary dark:bg-gray-700 text-text dark:text-text"
          rows={4}
        />
        <div className="flex justify-end">
          <Button text="Guardar Nota" onClick={handleSaveNote} variant="primary" />
        </div>
      </div>
      <div className="space-y-2">
        {notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((note, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-text dark:text-textSecondary">{note.content}</p>
            <p className="text-xs text-textMuted dark:text-gray-400 mt-1">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateNotesSection;
