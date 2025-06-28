import React, { useState } from 'react';
import {
  Calendar,
  Info,
  Shield,
  Heart,
  Book,
  FileText,
  Video,
  Users,
  Activity,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Layout from '../components/Layout.jsx';

const initialRiskFactors = [
  { factor: 'Multiple Sexual Partners', present: false, weight: 2 },
  { factor: 'Early Sexual Activity (before 18)', present: false, weight: 2 },
  { factor: 'History of STIs', present: false, weight: 2 },
  { factor: 'Smoking', present: false, weight: 2 },
  { factor: 'Weakened Immune System', present: false, weight: 2 },
  { factor: 'Family History of Cervical Cancer', present: false, weight: 1 },
];

const CervicalCancerAwareness = () => {
  const { theme } = useTheme();
  const [reminders, setReminders] = useState([
    {
      id: '1',
      frequency: 'yearly',
      nextDate: '2026-01-15',
      completed: [true, false, true, true, false],
    },
  ]);
  const [riskFactors, setRiskFactors] = useState(initialRiskFactors);
  const [editing, setEditing] = useState(false);

  const nextDate = new Date(reminders[0]?.nextDate || '');
  const today = new Date();
  const daysUntilNextCheck = Math.max(
    0,
    Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Risk logic for cervical cancer
  function calculateRiskLevel(factors) {
    const highRiskFactors = ['Multiple Sexual Partners', 'Early Sexual Activity (before 18)', 'History of STIs', 'Smoking', 'Weakened Immune System'];
    const highRisk = factors.find(f => highRiskFactors.includes(f.factor) && f.present);
    if (highRisk) return 'High';
    const moderateCount = factors.filter(f => f.present).length;
    if (moderateCount >= 2) return 'Moderate';
    if (moderateCount === 1) return 'Low';
    return 'Low';
  }

  const riskLevel = calculateRiskLevel(riskFactors);
  const riskColor = {
    High: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    Moderate: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
    Low: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
  }[riskLevel];

  const completeCheck = () => {
    const updated = { ...reminders[0] };
    updated.completed = [...updated.completed, true];

    const next = new Date(updated.nextDate);
    next.setFullYear(next.getFullYear() + 1); // Yearly for cervical screening
    updated.nextDate = next.toISOString().split('T')[0];

    setReminders([updated]);
  };

  const handleToggleFactor = idx => {
    if (!editing) return;
    setRiskFactors(factors => {
      const updated = [...factors];
      updated[idx] = { ...updated[idx], present: !updated[idx].present };
      return updated;
    });
  };

  const handleEditOrSave = () => {
    setEditing(editing => !editing);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme.text }}>
              Cervical Cancer Awareness
            </h1>
            <p style={{ color: theme.textSecondary }}>Prevention and early detection save lives</p>
          </div>

          {/* Screening Reminder */}
          <Card title="Screening Reminder" icon={<Calendar size={24} className="text-purple-500" />}>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center bg-purple-100 dark:bg-purple-900/20">
                <div
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold ${
                    daysUntilNextCheck <= 30 ? 'bg-purple-500' : 'bg-gray-400'
                  }`}
                >
                  <span className="text-lg">{Math.ceil(daysUntilNextCheck / 30)}</span>
                  <span className="text-xs">months</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                  {daysUntilNextCheck <= 30
                    ? 'Screening is due soon!'
                    : 'Months until next screening'}
                </h3>
                <p className="mb-3" style={{ color: theme.textSecondary }}>
                  Next screening: {nextDate.toDateString()}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: theme.textSecondary }}>Your screening history:</span>
                  <div className="flex gap-1">
                    {reminders[0]?.completed.map((done, idx) => (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full ${
                          done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button title="Mark Screening as Completed" onPress={completeCheck} />
          </Card>

          {/* HPV Information */}
          <Card title="About HPV and Cervical Cancer" icon={<Info size={24} className="text-purple-500" />}>
            <p className="mb-6" style={{ color: theme.textSecondary }}>
              Most cervical cancers are caused by Human Papillomavirus (HPV). Here's what you need to know:
            </p>
            {[
              ['HPV is Common', 'Most sexually active people will get HPV at some point in their lives.'],
              ['Usually Harmless', 'Most HPV infections go away on their own without causing problems.'],
              ['High-Risk Types', 'Some HPV types can cause cervical cancer if they persist.'],
              ['Prevention Available', 'HPV vaccines and regular screening can prevent cervical cancer.'],
            ].map(([title, desc], idx) => (
              <div key={idx} className="flex items-start gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                  <p style={{ color: theme.textSecondary }}>{desc}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Risk Assessment */}
          <Card title="Risk Assessment" icon={<Shield size={24} className="text-purple-500" />}>
            <div className="flex items-center gap-4 mb-4">
              <span style={{ color: theme.textSecondary }}>Your Risk Level:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}>
                {riskLevel}
              </span>
            </div>
            <p className="text-sm italic mb-6" style={{ color: theme.textSecondary }}>
              Based on your inputs. Consult your doctor for professional assessment.
            </p>
            <div className="space-y-3">
              {riskFactors.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${editing ? 'hover:bg-purple-50 dark:hover:bg-purple-900/10 cursor-pointer' : ''}`}
                  style={{ border: `1px solid ${theme.border}` }}
                  onClick={() => { if (editing) handleToggleFactor(idx); }}
                >
                  <span>{item.factor}</span>
                  {editing ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.present ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {item.present ? 'Yes' : 'No'}
                    </span>
                  ) : item.present ? (
                    <CheckCircle size={20} className="text-red-500" />
                  ) : (
                    <XCircle size={20} className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={handleEditOrSave}
              >
                {editing ? 'Save Risk Factors' : 'Update Risk Factors'}
              </button>
            </div>
          </Card>

          {/* AI Cervical Cancer Risk Predictor Card */}
            <Card title="AI Cervical Cancer Risk Predictor" icon={<Shield size={24} className="text-pink-500" />}>
            <div className="mb-4">
                <p style={{ color: theme.textSecondary }}>
                 Try our AI-powered tool that analyzes your lifestyle and health inputs to assess cervical cancer risk more accurately. 
                <span className="font-semibold" style={{ color: theme.primary }}> Answer a few questions to get insights.</span>
                <br />
                <span className="text-xs italic">This tool is for educational and awareness purposes only.</span>
                </p>
            </div>
            <div className="flex justify-start">
                <a
                href="https://huggingface.co/spaces/prsoumyajit/cervical-cancer-predictor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                >
                <Button title="Check Your Risk Here" type="secondary" />
                </a>
            </div>
            </Card>


          {/* Screening Recommendations */}
          <Card title="Screening Recommendations" icon={<Heart size={24} className="text-purple-500" />}>
            <div className="space-y-4">
              {[
                ['Pap Test', 'Every 3 years for women aged 21-65. Checks for abnormal cells in the cervix.', Calendar],
                ['HPV Test', 'Every 5 years for women aged 30-65, or combined with Pap test.', Activity],
                ['Co-testing', 'Pap test + HPV test every 5 years for women 30-65.', Shield],
              ].map(([title, desc, IconComponent], idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: theme.surface }}
                >
                  <IconComponent className="text-purple-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                    <p style={{ color: theme.textSecondary }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Prevention Tips */}
          <Card title="Prevention Tips" icon={<Shield size={24} className="text-green-500" />}>
            <div className="space-y-4">
              {[
                ['Get HPV Vaccine', 'Most effective when given before sexual activity begins.', Shield],
                ['Regular Screening', 'Follow recommended Pap and HPV testing schedules.', Calendar],
                ['Practice Safe Sex', 'Use condoms and limit number of sexual partners.', Heart],
                ['Don\'t Smoke', 'Smoking increases the risk of cervical cancer.', Activity],
              ].map(([title, desc, IconComponent], idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: theme.surface }}
                >
                  <IconComponent className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                    <p style={{ color: theme.textSecondary }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default CervicalCancerAwareness;