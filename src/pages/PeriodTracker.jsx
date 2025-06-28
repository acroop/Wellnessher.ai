// src/pages/PeriodTracker.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoInformationCircleOutline, IoAdd } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout.jsx';
import '../styles/Calendar.css';



const PeriodTrackerScreen = () => {
  const { theme, isDark } = useTheme();
  const [date, setDate] = useState(new Date());

  // Restore stats and tips arrays for lower cards
  const stats = [
    { label: 'Avg. Cycle (days)', value: '28' },
    { label: 'Avg. Period (days)', value: '6' },
    { label: 'Cycle Variation', value: 'Regular' },
  ];

  const tips = [
    "Stay hydrated and drink plenty of water during your period to help reduce bloating.",
    "Light exercise like walking or yoga can help ease cramps and improve mood.",
  ];

  // State for period logs and notes, keyed by date string
  const [periodLogs, setPeriodLogs] = useState({}); // { 'YYYY-MM-DD': { flow: 'heavy'|'medium'|'light', note: '' } }
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [flowValue, setFlowValue] = useState('medium');
  const [noteValue, setNoteValue] = useState('');

  // Helper to get date string
  const getDateStr = (d) => d.toISOString().split('T')[0];
  const selectedDateStr = getDateStr(date);

  // Open modals with current values if present
  const openFlowModal = () => {
    setFlowValue(periodLogs[selectedDateStr]?.flow || 'medium');
    setShowFlowModal(true);
  };
  const openNoteModal = () => {
    setNoteValue(periodLogs[selectedDateStr]?.note || '');
    setShowNoteModal(true);
  };

  // Save flow
  const saveFlow = () => {
    setPeriodLogs((prev) => ({
      ...prev,
      [selectedDateStr]: {
        ...prev[selectedDateStr],
        flow: flowValue,
      },
    }));
    setShowFlowModal(false);
  };
  // Save note
  const saveNote = () => {
    setPeriodLogs((prev) => ({
      ...prev,
      [selectedDateStr]: {
        ...prev[selectedDateStr],
        note: noteValue,
      },
    }));
    setShowNoteModal(false);
  };

  // Render dots for calendar
  const renderDotsForDate = (date) => {
    const dots = [];
    const dateStr = getDateStr(date);
    // Period flow
    if (periodLogs[dateStr]?.flow) {
      const color = periodLogs[dateStr].flow === 'heavy' ? '#D50000' :
                    periodLogs[dateStr].flow === 'medium' ? '#FF5252' :
                    '#FF8A80';
      dots.push(<span key={color} style={{ backgroundColor: color }} className="dot" />);
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        {dots}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto">
          <h1 style={{ color: theme.text, fontSize: '2rem', fontWeight: 'bold' }}>Period Tracker</h1>
          <p style={{ color: theme.textSecondary, marginBottom: '1rem' }}>4 days until next period</p>

          <Card title="My Calendar" icon="calendar" className="justify-center">
            <div style={{  width: '100%', margin: '0 auto', borderRadius: '12px', padding: '1rem', background: isDark ? '#2a2a2a' : '#fff' }}>
              <Calendar
                onChange={setDate}
                value={date}
                prevLabel="←"
                nextLabel="→"
                next2Label="»"
                prev2Label="«"
                showNeighboringMonth
                className="themed-calendar"
                tileContent={({ date, view }) => view === 'month' ? renderDotsForDate(date) : null}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
              {[{ label: 'Heavy Flow', color: '#D50000' }, { label: 'Medium Flow', color: '#FF5252' }, { label: 'Light Flow', color: '#FF8A80' }, { label: 'Ovulation', color: '#1976D2' }, { label: 'Fertile Window', color: '#64B5F6' }].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, marginRight: '5px' }}></div>
                  <span style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Show log/note for selected date */}
          <Card title={`Details for ${selectedDateStr}`} icon="calendar">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>
                <b>Period Flow:</b> {periodLogs[selectedDateStr]?.flow ? periodLogs[selectedDateStr].flow.charAt(0).toUpperCase() + periodLogs[selectedDateStr].flow.slice(1) : 'Not logged'}
                <Button title={periodLogs[selectedDateStr]?.flow ? 'Edit Flow' : 'Log Flow'} size="small" style={{ marginLeft: 12, backgroundColor: '#FF69B4' }} onClick={openFlowModal} />
              </div>
              <div>
                <b>Notes:</b> {periodLogs[selectedDateStr]?.note || 'No notes'}
                <Button title={periodLogs[selectedDateStr]?.note ? 'Edit Note' : 'Add Note'} size="small" style={{ marginLeft: 12, backgroundColor: '#9370DB' }} onClick={openNoteModal} />
              </div>
            </div>
          </Card>

          {/* Modals for flow and note */}
          {showFlowModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <div style={{ background: theme.card, padding: 24, borderRadius: 12, minWidth: 300 }}>
                <h3 style={{ color: theme.text, marginBottom: 12 }}>Log Period Flow</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['heavy', 'medium', 'light'].map(f => (
                    <label key={f} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                      <input type="radio" name="flow" value={f} checked={flowValue === f} onChange={() => setFlowValue(f)} />
                      <span style={{ marginLeft: 8, color: theme.text }}>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                    </label>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                  <Button title="Cancel" size="small" style={{ backgroundColor: '#ccc', color: '#222' }} onClick={() => setShowFlowModal(false)} />
                  <Button title="Save" size="small" style={{ backgroundColor: '#FF69B4' }} onClick={saveFlow} />
                </div>
              </div>
            </div>
          )}
          {showNoteModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <div style={{ background: theme.card, padding: 24, borderRadius: 12, minWidth: 300 }}>
                <h3 style={{ color: theme.text, marginBottom: 12 }}>Add/Edit Note</h3>
                <textarea
                  value={noteValue}
                  onChange={e => setNoteValue(e.target.value)}
                  rows={4}
                  style={{ width: '100%', borderRadius: 8, border: '1px solid #ccc', padding: 8, color: theme.text, background: isDark ? '#222' : '#fff' }}
                  placeholder="Write your note here..."
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                  <Button title="Cancel" size="small" style={{ backgroundColor: '#ccc', color: '#222' }} onClick={() => setShowNoteModal(false)} />
                  <Button title="Save" size="small" style={{ backgroundColor: '#9370DB' }} onClick={saveNote} />
                </div>
              </div>
            </div>
          )}

          <h2 style={{ color: theme.text, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Quick Add</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button title="Log Period" size="small" style={{ backgroundColor: '#FF69B4', flex: 1, maxWidth: '200px' }} onClick={openFlowModal} />
            <Button title="Add Notes" size="small" style={{ borderColor: '#9370DB', borderWidth: 1, flex: 1, maxWidth: '200px' }} onClick={openNoteModal} />
          </div>

          {/* ...existing stats and tips cards... */}
          <Card title="Your Cycle Stats" icon="analytics">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.primary }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Period Tips" icon="bulb">
            {tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                <IoInformationCircleOutline size={20} color={theme.primary} style={{ marginRight: 8 }} />
                <span style={{ color: theme.text }}>{tip}</span>
              </div>
            ))}
          </Card>

          <button
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              backgroundColor: theme.primary,
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: 'none',
            }}
            onClick={openFlowModal}
          >
            <IoAdd size={24} color="white" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PeriodTrackerScreen;