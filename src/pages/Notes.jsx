import React, { useState } from 'react';
import { IoClose, IoAdd, IoSearch, IoDocumentText, IoCalendar, IoFitness, IoMedical, IoDocument } from 'react-icons/io5';
import Layout from '../components/Layout';

const categories = [
  { id: 'all', label: 'All Notes' },
  { id: 'general', label: 'General' },
  { id: 'symptom', label: 'Symptoms' },
  { id: 'medication', label: 'Medications' },
  { id: 'appointment', label: 'Appointments' },
];

const getCategoryIcon = (category) => {
  switch (category) {
    case 'appointment': return <IoCalendar />;
    case 'symptom': return <IoFitness />;
    case 'medication': return <IoMedical />;
    default: return <IoDocument />;
  }
};

const NotesScreen = () => {
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Doctor Appointment',
      content: 'Remember to ask about new medication side effects and bring test results.',
      date: 'June 30, 2025',
      category: 'appointment',
    },
    {
      id: '2',
      title: 'Symptom Journal',
      content: 'Experiencing mild headaches in the morning, possibly related to new medication.',
      date: 'June 22, 2025',
      category: 'symptom',
    },
    {
      id: '3',
      title: 'Medication Reminder',
      content: 'Take iron supplements with food to avoid stomach upset.',
      date: 'June 20, 2025',
      category: 'medication',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'general' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNote = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newNoteWithId = { ...newNote, id: Date.now().toString(), date: currentDate };
    setNotes([newNoteWithId, ...notes]);
    setModalVisible(false);
    setNewNote({ title: '', content: '', category: 'general' });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <button onClick={() => setModalVisible(true)} className="p-2 rounded-full bg-blue-600 text-white">
            <IoAdd size={24} />
          </button>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
          <IoSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}><IoClose className="text-gray-400" /></button>
          )}
        </div>

        <div className="flex space-x-2 overflow-x-auto mb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1 rounded-full border ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border-gray-300`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filteredNotes.length > 0 ? (
          <div className="space-y-4">
            {filteredNotes.map(note => (
              <div key={note.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    {getCategoryIcon(note.category)}
                    <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
                  </div>
                  <span className="text-sm text-gray-500">{note.date}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{note.content}</p>
                <div className="text-right">
                  <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <IoDocumentText className="mx-auto text-5xl mb-4" />
            <p>{searchQuery || selectedCategory !== 'all' ? 'No notes match your search' : 'No notes yet. Tap + to add one.'}</p>
          </div>
        )}

        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Note</h3>
                <button onClick={() => setModalVisible(false)}><IoClose /></button>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
                placeholder="Content"
                rows={4}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              ></textarea>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex space-x-2">
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <button
                      key={category.id}
                      onClick={() => setNewNote({ ...newNote, category: category.id })}
                      className={`px-3 py-1 rounded-full border ${newNote.category === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border-gray-300`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  className="w-full border border-gray-300 py-2 rounded-md"
                  onClick={() => setModalVisible(false)}
                >Cancel</button>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                  onClick={handleAddNote}
                  disabled={!newNote.title || !newNote.content}
                >Save Note</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotesScreen;
