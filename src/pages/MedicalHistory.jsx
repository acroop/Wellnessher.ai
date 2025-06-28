import React, { useState } from 'react';
import {
  IoPersonOutline,
  IoBusinessOutline,
  IoClose,
  IoAdd,
  IoMedkitOutline,
  IoFitnessOutline,
  IoMedicalOutline,
  IoShieldCheckmarkOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';
import Layout from '../components/Layout.jsx';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';

const initialRecords = [
  {
    id: '1',
    type: 'medication',
    name: 'Metformin',
    date: '2025-03-15',
    details: 'For PCOS management, 500mg twice daily',
    doctor: 'Dr. Sarah Johnson',
    hospital: "Women's Health Clinic",
  },
  {
    id: '2',
    type: 'condition',
    name: 'PCOS',
    date: '2024-12-10',
    details: 'Diagnosed with Polycystic Ovary Syndrome',
    doctor: 'Dr. James Wilson',
    hospital: 'Metropolitan Hospital',
  },
  {
    id: '3',
    type: 'procedure',
    name: 'Gynecological Examination',
    date: '2025-01-22',
    details: 'Annual checkup and pap smear',
    doctor: 'Dr. Sarah Johnson',
    hospital: "Women's Health Clinic",
  },
  {
    id: '4',
    type: 'vaccination',
    name: 'HPV Vaccine',
    date: '2024-09-05',
    details: 'Gardasil 9, 2nd dose',
    doctor: 'Dr. Robert Brown',
    hospital: 'Community Wellness Center',
  },
  {
    id: '5',
    type: 'allergy',
    name: 'Penicillin',
    date: '2023-06-30',
    details: 'Severe skin rash reaction',
    doctor: 'Dr. Linda Martinez',
    hospital: 'City General Hospital',
  },
];

const iconMap = {
  medication: <IoMedkitOutline />,
  condition: <IoFitnessOutline />,
  procedure: <IoMedicalOutline />,
  vaccination: <IoShieldCheckmarkOutline />,
  allergy: <IoAlertCircleOutline />,
};

const MedicalHistoryScreen = () => {
  const { theme, isDark } = useTheme();
  const [records, setRecords] = useState(initialRecords);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: 'medication',
    name: '',
    date: '',
    details: '',
    doctor: '',
    hospital: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newRecord = {
      ...form,
      id: Date.now().toString(),
    };
    setRecords((prev) => [newRecord, ...prev]);
    setForm({
      type: 'medication',
      name: '',
      date: '',
      details: '',
      doctor: '',
      hospital: '',
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <Layout>
      <div
        className="min-h-screen px-4 py-6 flex flex-col items-center"
        style={{ backgroundColor: theme.background, color: theme.text }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
          <p className="mb-6" style={{ color: theme.textSecondary }}>
            Manage your health history
          </p>

          {/* Existing Records */}
          {records.map((record) => (
            <Card
              key={record.id}
              title={record.name}
              subtitle={`Date: ${new Date(record.date).toLocaleDateString('en-US')}`}
              icon={iconMap[record.type]}
              footer={
                <div
                  className="flex justify-between items-center text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  <div className="flex gap-2">
                    {record.doctor && (
                      <span className="flex items-center gap-1">
                        <IoPersonOutline />
                        {record.doctor}
                      </span>
                    )}
                    {record.hospital && (
                      <span className="flex items-center gap-1">
                        <IoBusinessOutline />
                        {record.hospital}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleDelete(record.id)} className="text-red-500 text-xs">
                    Delete
                  </button>
                </div>
              }
            >
              <p className="text-sm">{record.details}</p>
            </Card>
          ))}

          {/* Add Medical Note Card */}
          <Card
            title="Add Medical Note"
            icon={<IoAdd size={24} className="text-green-500" />}
            onClick={() => setShowModal(true)}
            className="cursor-pointer hover:shadow-md transition duration-300 border-2 border-dashed border-green-500"
          >
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Click here to add a new medical record to your history.
            </p>
          </Card>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          >
            <div
              className="rounded-lg p-6 w-full max-w-md relative"
              style={{ backgroundColor: theme.surface, color: theme.text }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', top: 12, right: 12, color: theme.textSecondary }}
              >
                <IoClose size={22} />
              </button>
              <h2 className="text-xl font-bold mb-4">Add Medical Note</h2>
              <div className="space-y-3">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                >
                  <option value="medication">Medication</option>
                  <option value="condition">Condition</option>
                  <option value="procedure">Procedure</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="allergy">Allergy</option>
                </select>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <input
                  type="text"
                  name="doctor"
                  placeholder="Doctor's Name"
                  value={form.doctor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital"
                  value={form.hospital}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <textarea
                  name="details"
                  placeholder="Details"
                  value={form.details}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  style={{
                    backgroundColor: isDark ? '#333' : '#fff',
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <button
                  onClick={handleAdd}
                  className="w-full py-2 rounded font-semibold"
                  style={{ backgroundColor: theme.primary, color: '#fff' }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicalHistoryScreen;
