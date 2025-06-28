import React, { useState } from 'react';
import { Activity, Apple, Bed, Plus, FileText, Video, Mic, Link, CheckCircle, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Layout from '../components/Layout.jsx';

const PCOSManagementScreen = () => {
  const { theme } = useTheme();
  const [isDiagnosed, setIsDiagnosed] = useState(true);

  const symptoms = [
    { id: '1', name: 'Irregular periods', tracked: true },
    { id: '2', name: 'Weight gain', tracked: true },
    { id: '3', name: 'Acne', tracked: true },
    { id: '4', name: 'Hair growth', tracked: false },
    { id: '5', name: 'Fatigue', tracked: true },
  ];

  const medications = [
    { id: '1', name: 'Metformin', dosage: '500mg', frequency: 'twice daily', timeOfDay: 'morning, evening' },
    { id: '2', name: 'Birth Control', dosage: '1 pill', frequency: 'once daily', timeOfDay: 'morning' },
  ];

  const recentLogs = [
    { date: '2025-06-23', symptoms: ['Irregular periods', 'Acne'], level: 7, notes: 'Stress might be worsening symptoms' },
    { date: '2025-06-20', symptoms: ['Weight gain', 'Fatigue'], level: 5, notes: 'Started new diet' },
    { date: '2025-06-15', symptoms: ['Hair growth', 'Acne'], level: 6, notes: '' },
  ];

  const resources = [
    { id: '1', title: 'Understanding PCOS', type: 'article' },
    { id: '2', title: 'PCOS Diet Tips', type: 'video' },
    { id: '3', title: 'Managing PCOS Symptoms', type: 'podcast' },
    { id: '4', title: 'Exercise for PCOS', type: 'article' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'article': return <FileText style={{ color: theme.accent }} />;
      case 'video': return <Video style={{ color: theme.accent }} />;
      case 'podcast': return <Mic style={{ color: theme.accent }} />;
      default: return <Link style={{ color: theme.accent }} />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto"> {/* Broader layout for consistency */}
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>PCOS Management</h1>
          <p style={{ marginBottom: '1.5rem', color: theme.textSecondary }}>
            Track and manage your PCOS journey
          </p>

          {!isDiagnosed ? (
            <Card title="PCOS Assessment">
              <p style={{ color: theme.textSecondary }}>Take our assessment for guidance.</p>
              <button
                onClick={() => setIsDiagnosed(true)}
                style={{
                  marginTop: '1rem',
                  backgroundColor: theme.accent,
                  color: theme.buttonText,
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Start Assessment
              </button>
            </Card>
          ) : (
            <>
              <Card title="Tracked Symptoms">
                {symptoms.map(symptom => (
                  <div key={symptom.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: `1px solid ${theme.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: symptom.tracked ? theme.accent : theme.border
                      }}></div>
                      <span>{symptom.name}</span>
                    </div>
                    {symptom.tracked ? <Eye style={{ color: theme.accent }} /> : <EyeOff style={{ color: theme.textSecondary }} />}
                  </div>
                ))}
              </Card>

              <Card title="Medications">
                {medications.map(med => (
                  <div key={med.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '1rem',
                    borderBottom: `1px solid ${theme.border}`
                  }}>
                    <div>
                      <p style={{ fontWeight: '500' }}>{med.name}</p>
                      <p style={{ fontSize: '0.9rem', color: theme.textSecondary }}>{med.dosage} • {med.frequency}</p>
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: theme.textSecondary }}>{med.timeOfDay}</p>
                    </div>
                    <CheckCircle style={{ color: theme.success }} />
                  </div>
                ))}
              </Card>

              <Card title="Recent Logs">
                {recentLogs.map((log, idx) => (
                  <div key={idx} style={{
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: `1px solid ${theme.border}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontWeight: 500 }}>{new Date(log.date).toDateString()}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        backgroundColor: theme.accent,
                        borderRadius: '12px',
                        color: theme.buttonText,
                        fontWeight: 600
                      }}>
                        Level {log.level}/10
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '0.5rem' }}>
                      {log.symptoms.map((s, i) => (
                        <span key={i} style={{
                          backgroundColor: theme.badgeBackground,
                          color: theme.accent,
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.875rem'
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    {log.notes && <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: theme.textSecondary }}>{log.notes}</p>}
                  </div>
                ))}
                <p style={{ textAlign: 'center', color: theme.accent, cursor: 'pointer' }}>View All Logs</p>
              </Card>
            </>
          )}

          <Card title="PCOS Resources">
            {resources.map(res => (
              <div key={res.id} style={{
                backgroundColor: theme.surface || '#1c1c1c', // fallback dark shade
                borderRadius: '10px',
                padding: '10px 16px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getIcon(res.type)}
                  <span>{res.title}</span>
                </div>
                <ChevronRight style={{ color: theme.textSecondary }} />
              </div>
            ))}
          </Card>


          <Card title="Lifestyle Recommendations">
            {[
              {
                icon: <Activity style={{ color: theme.accent }} />,
                title: 'Exercise Regularly',
                description: 'Aim for 30 minutes of moderate exercise most days.'
              },
              {
                icon: <Apple style={{ color: theme.accent }} />,
                title: 'Balanced Diet',
                description: 'Eat low-glycemic foods, lean proteins, fruits, and veggies.'
              },
              {
                icon: <Bed style={{ color: theme.accent }} />,
                title: 'Prioritize Sleep',
                description: 'Aim for 7–9 hours of quality sleep per night.'
              }
            ].map((rec, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem' }}>
                <div style={{
                  backgroundColor: theme.badgeBackground,
                  padding: '10px',
                  borderRadius: '50%'
                }}>
                  {rec.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 600 }}>{rec.title}</p>
                  <p style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>{rec.description}</p>
                </div>
              </div>
            ))}
          </Card>

          <button
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: theme.accent,
              color: theme.buttonText,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
              cursor: 'pointer'
            }}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PCOSManagementScreen;
