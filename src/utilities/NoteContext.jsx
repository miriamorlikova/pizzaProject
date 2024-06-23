import { createContext, useState, useContext } from 'react';

const NotesContextValue = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState({}); // Initialize notes state as an object

  function updateNote(pizzaId, newNote) {
    setNotes((prevNotes) => ({ ...prevNotes, [pizzaId]: newNote }));
  }

  return (
    <NotesContextValue.Provider value={{ updateNote, notes }}>
      {children}
    </NotesContextValue.Provider>
  );
}

function useNoteContext() {
  const context = useContext(NotesContextValue);
  if (context === undefined)
    throw new Error('You are trying to use context outside the NotesProvider');
  return context;
}
export { NotesContextValue, NotesProvider, useNoteContext };
