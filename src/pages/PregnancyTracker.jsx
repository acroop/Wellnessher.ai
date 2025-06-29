import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { IoAdd, IoCheckmarkCircle, IoHeartCircleOutline } from 'react-icons/io5';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import Layout from '../components/Layout.jsx';


// Baby size mapping for each week
const babySizeByWeek = [
  'Poppy Seed', 'Sesame Seed', 'Lentil', 'Blueberry', 'Kidney Bean', 'Grape', 'Kumquat', 'Fig',
  'Lime', 'Plum', 'Peach', 'Lemon', 'Apple', 'Avocado', 'Onion', 'Sweet Potato', 'Mango',
  'Banana', 'Carrot', 'Eggplant', 'Cantaloupe', 'Coconut', 'Corn', 'Butternut Squash',
  'Papaya', 'Grapefruit', 'Cauliflower', 'Lettuce', 'Pineapple', 'Cabbage', 'Acorn Squash',
  'Butternut Squash', 'Coconut', 'Honeydew Melon', 'Watermelon', 'Pumpkin', 'Jackfruit',
  'Spaghetti Squash', 'Leek', 'Swiss Chard', 'Mini Watermelon', 'Small Pumpkin'
];

const phaseByWeek = [
  { name: 'First Trimester', start: 1, end: 13 },
  { name: 'Second Trimester', start: 14, end: 26 },
  { name: 'Third Trimester', start: 27, end: 40 }
];

const mockPregnancyData = {
  isPregnant: true,
  dueDate: '2026-01-15',
  weeksPregnant: 16,
  // babySize is now dynamic
  appointments: [
    {
      id: '1',
      date: '2025-07-10',
      time: '10:00 AM',
      doctorName: 'Dr. Emily Carter',
      purpose: 'Regular Checkup',
      notes: 'Bring previous ultrasound report',
    },
    {
      id: '2',
      date: '2025-08-05',
      time: '11:30 AM',
      doctorName: 'Dr. Emily Carter',
      purpose: 'Anomaly Scan',
      notes: '',
    },
  ],
  symptoms: [
    {
      id: '1',
      date: '2025-06-22',
      symptoms: ['Nausea', 'Fatigue'],
      intensityLevel: 6,
      notes: 'Feeling better in the afternoon',
    },
    {
      id: '2',
      date: '2025-06-20',
      symptoms: ['Backache', 'Food Cravings'],
      intensityLevel: 4,
      notes: 'Craving ice cream',
    },
    {
      id: '3',
      date: '2025-06-18',
      symptoms: ['Nausea', 'Headache'],
      intensityLevel: 7,
      notes: '',
    },
  ],
  weightTracking: [
  { week: 8, weight: 60.5 },
  { week: 10, weight: 61.2 },
  { week: 12, weight: 61.8 },
  { week: 14, weight: 62.9 },
  { week: 16, weight: 63.5 }
],
};

const PregnancyTracker = () => {
  const { theme } = useTheme();
  const [pregnancyData, setPregnancyData] = useState(mockPregnancyData);
  const [showDetails, setShowDetails] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // Interactive week selection
  const [selectedWeek, setSelectedWeek] = useState(pregnancyData.weeksPregnant);

  const dueDate = new Date(pregnancyData.dueDate);
  const today = new Date();
  // Calculate weeks pregnant from due date and today
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const conceptionDate = new Date(dueDate.getTime() - 40 * msPerWeek);
  const weeksPregnant = Math.max(1, Math.min(40, Math.floor((today - conceptionDate) / msPerWeek) + 1));
  const daysUntilDueDate = Math.max(0, Math.floor((dueDate - today) / (1000 * 60 * 60 * 24)));
  const progress = (weeksPregnant / 40) * 100;

  // For interactive week selection
  const displayWeek = selectedWeek;
  const babySize = babySizeByWeek[displayWeek - 1] || 'Baby';
  const phase = phaseByWeek.find(p => displayWeek >= p.start && displayWeek <= p.end)?.name || '';

  const upcoming = pregnancyData.appointments.filter(
    a => new Date(a.date) >= today
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  const next = upcoming[0];
  const nextAppointment = next;

  // Handler for reschedule
  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleDate(appointment.date);
    setRescheduleTime(appointment.time);
    setShowReschedule(true);
  };
  const handleRescheduleSave = () => {
    setPregnancyData(prev => ({
      ...prev,
      appointments: prev.appointments.map(a =>
        a.id === selectedAppointment.id
          ? { ...a, date: rescheduleDate, time: rescheduleTime }
          : a
      )
    }));
    setShowReschedule(false);
    setSelectedAppointment(null);
  };
  // Handler for view details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto">
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pregnancy Tracker</h1>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <p style={{ color: theme.primary }}>Baby is the size of a{['A','E','I','O','U'].includes(babySize[0].toUpperCase()) ? 'n' : ''}</p>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{babySize}</h2>
              <p style={{ color: theme.textSecondary }}>
                Due on {dueDate.toLocaleDateString()}
              </p>
              <span style={{
                backgroundColor: theme.primary,
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'inline-block',
                marginTop: '0.5rem'
              }}>
                {phase}
              </span>
              <div style={{
                background: theme.border,
                borderRadius: '4px',
                height: '8px',
                marginTop: '10px',
                width: '100%',
                maxWidth: 400
              }}>
                <div style={{
                  background: theme.primary,
                  height: '8px',
                  width: `${(displayWeek / 40) * 100}%`,
                  borderRadius: '4px'
                }}></div>
              </div>
              <p style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                {displayWeek} of 40 weeks
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 32, width: '100%', alignItems: 'center', marginTop: 8 }}>
                {/* Week selection slider */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label htmlFor="week-slider" style={{ color: theme.textSecondary, marginBottom: 0, whiteSpace: 'nowrap' }}>Select Week</label>
                  <input
                    id="week-slider"
                    type="range"
                    min={1}
                    max={40}
                    value={selectedWeek}
                    onChange={e => setSelectedWeek(Number(e.target.value))}
                    style={{ flex: 1, maxWidth: 200 }}
                  />
                  <span style={{ color: theme.textSecondary, minWidth: 60, textAlign: 'center' }}>{displayWeek} / 40</span>
                </div>
                {/* Actual week of pregnancy slider (read-only) */}
                
              </div>
            </div>
          </Card>

          {nextAppointment && (
            <Card title="Next Appointment" icon="calendar">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontWeight: 600, color: theme.text }}>
                  {new Date(nextAppointment.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  })} at {nextAppointment.time}
                </div>
                <div style={{ color: theme.text }}>{nextAppointment.doctorName}</div>
                <div style={{ color: theme.primary, fontWeight: 500 }}>{nextAppointment.purpose}</div>
                {nextAppointment.notes ? (
                  <div style={{ color: theme.textSecondary, fontStyle: 'italic' }}>
                    Note: {nextAppointment.notes}
                  </div>
                ) : null}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <Button
                    title="Reschedule"
                    type="outline"
                    size="small"
                    onClick={() => handleReschedule(nextAppointment)}
                    style={{ flex: 1, borderColor: theme.primary, color: theme.primary }}
                    textStyle={{ color: theme.primary }}
                  />
                  <Button
                    title="View Details"
                    size="small"
                    onClick={() => handleViewDetails(nextAppointment)}
                    style={{ flex: 1, backgroundColor: theme.primary, color: '#fff' }}
                    textStyle={{ color: '#fff' }}
                  />
                </div>
              </div>
            </Card>
          )}
          {/* Reschedule Modal */}
          {showReschedule && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ background: theme.card, color: theme.text, padding: 24, borderRadius: 12, minWidth: 320 }}>
                <h3 style={{ marginBottom: 16 }}>Reschedule Appointment</h3>
                <label style={{ display: 'block', marginBottom: 8 }}>Date:</label>
                <input type="date" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)} style={{ marginBottom: 16, width: '100%' }} />
                <label style={{ display: 'block', marginBottom: 8 }}>Time:</label>
                <input type="time" value={rescheduleTime} onChange={e => setRescheduleTime(e.target.value)} style={{ marginBottom: 16, width: '100%' }} />
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <Button title="Cancel" type="outline" onClick={() => setShowReschedule(false)} style={{ flex: 1 }} />
                  <Button title="Save" onClick={handleRescheduleSave} style={{ flex: 1, backgroundColor: theme.primary, color: '#fff' }} />
                </div>
              </div>
            </div>
          )}
          {/* Details Modal */}
          {showDetails && selectedAppointment && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ background: theme.card, color: theme.text, padding: 24, borderRadius: 12, minWidth: 320, maxWidth: 400 }}>
                <h3 style={{ marginBottom: 16 }}>Appointment Details</h3>
                <div><b>Date:</b> {new Date(selectedAppointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div><b>Time:</b> {selectedAppointment.time}</div>
                <div><b>Doctor:</b> {selectedAppointment.doctorName}</div>
                <div><b>Purpose:</b> {selectedAppointment.purpose}</div>
                {selectedAppointment.notes && <div><b>Notes:</b> {selectedAppointment.notes}</div>}
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <Button title="Close" onClick={handleCloseDetails} style={{ flex: 1, backgroundColor: theme.primary, color: '#fff' }} />
                </div>
              </div>
            </div>
          )}
          <Card title="Weight Tracking">
            <div style={{ height: '250px', marginBottom: '1rem'}}>
            <LineChart
              width={1100}
              height={250}
              data={pregnancyData.weightTracking}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis dataKey="week" tick={{ fill: theme.textSecondary }} label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }} />
            <YAxis domain={['auto', 'auto']} tick={{ fill: theme.textSecondary }} unit="kg" />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke={theme.primary} strokeWidth={3} dot={{ fill: theme.primary }} />
          </LineChart>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
      <Button
        title="Log Weight"
        onClick={() => {
          const latestWeek = pregnancyData.weightTracking[pregnancyData.weightTracking.length - 1].week;
          const newWeight = prompt('Enter your current weight (kg):');
          if (newWeight && !isNaN(newWeight)) {
            const newData = [...pregnancyData.weightTracking, { week: latestWeek + 1, weight: parseFloat(newWeight) }];
            setPregnancyData(prev => ({ ...prev, weightTracking: newData }));
          }
        }}
        style={{ flex: 1, backgroundColor: theme.accent, color: '#fff', fontWeight: 'bold' }}
      />
      <Button
        title="Delete Last"
        onClick={() => {
          if (pregnancyData.weightTracking.length > 0) {
            const newData = pregnancyData.weightTracking.slice(0, -1); // removes last item
            setPregnancyData(prev => ({ ...prev, weightTracking: newData }));
          }
        }}
        type="outline"
        style={{ flex: 1, borderColor: theme.danger, color: theme.danger }}
        textStyle={{ color: theme.danger }}
      />
    </div>
          </Card>

          <Card title="Weekly Development">
            <h3 style={{ color: theme.primary, marginBottom: '1rem' }}>
              Week {pregnancyData.weeksPregnant}: Key Developments
            </h3>
            <ul style={{ paddingLeft: 0, marginTop: '0.5rem', listStyle: 'none' }}>
              {[
                'Baby’s eyes can now sense light.',
                'The baby can now make sucking movements.',
                'Baby is about 4.5 inches long.'
              ].map((text, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: theme.success + '22', marginRight: 10 }}>
                    <IoCheckmarkCircle size={18} style={{ color: theme.success }} />
                  </span>
                  <span style={{ color: theme.text, fontSize: '1rem' }}>{text}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Symptoms">
            {pregnancyData.symptoms.slice(0, 3).map(s => (
              <div key={s.id} style={{ marginBottom: '1rem' }}>
                <p>{new Date(s.date).toDateString()}</p>
                <p style={{ color: theme.textSecondary }}>
                  Level {s.intensityLevel}/10
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {s.symptoms.map((sym, i) => (
                    <span key={i} style={{
                      background: theme.primary + '20',
                      color: theme.primary,
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {sym}
                    </span>
                  ))}
                </div>
                {s.notes && (
                  <p style={{ fontStyle: 'italic', color: theme.textSecondary }}>
                    {s.notes}
                  </p>
                )}
              </div>
            ))}
          </Card>

          <Card title="Nutrition">
            <p>Focus on key nutrients like Folic Acid, Omega-3, and Iron.</p>
          </Card>

          <button style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: theme.primary,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.25)'
          }}>
            <IoAdd size={24} />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PregnancyTracker;
