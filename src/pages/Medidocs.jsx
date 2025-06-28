import React, { useState } from 'react';
import { IoCloudUploadOutline, IoDocumentTextOutline, IoMedicalOutline, IoFlaskOutline, IoScanOutline, IoExitOutline, IoSearchOutline } from 'react-icons/io5';
import Layout from '../components/Layout.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const mockDocuments = [
	{
		id: '1',
		name: 'Annual Checkup Report',
		date: '2025-04-15',
		type: 'other',
		notes: 'Annual physical examination report',
		fileUrl: '/uploads/annual-checkup.pdf',
		originalFileName: 'annual-checkup.pdf',
	},
	{
		id: '2',
		name: 'Blood Test Results',
		date: '2025-05-20',
		type: 'labReport',
		notes: 'Complete blood count, lipid profile',
		fileUrl: '/uploads/blood-test.pdf',
		originalFileName: 'blood-test.pdf',
	},
	{
		id: '3',
		name: 'Mammogram Results',
		date: '2025-03-10',
		type: 'imaging',
		notes: 'Annual screening mammogram',
		fileUrl: '/uploads/mammogram.pdf',
		originalFileName: 'mammogram.pdf',
	},
];

const iconMap = {
	prescription: <IoMedicalOutline />,
	labReport: <IoFlaskOutline />,
	imaging: <IoScanOutline />,
	discharge: <IoExitOutline />,
	other: <IoDocumentTextOutline />,
};

const MedidocsScreen = () => {
	const [search, setSearch] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [docName, setDocName] = useState('');
	const [docType, setDocType] = useState('');
	const [docDate, setDocDate] = useState('');
	const [docDoctor, setDocDoctor] = useState('');
	const [docLink, setDocLink] = useState('');
	const [documents, setDocuments] = useState(mockDocuments);
	const { theme } = useTheme();

	const filteredDocs = documents.filter(doc =>
		doc.name.toLowerCase().includes(search.toLowerCase()) ||
		doc.type.toLowerCase().includes(search.toLowerCase()) ||
		(doc.notes && doc.notes.toLowerCase().includes(search.toLowerCase()))
	);

	const formatDate = dateStr => new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric'
	});

	const handleDelete = async (doc) => {
		if (!doc.originalFileName && !doc.savedAs) {
			setDocuments(prev => prev.filter(d => d.id !== doc.id));
			return;
		}

		const filename = doc.savedAs || doc.originalFileName;
		try {
			const res = await fetch(`http://localhost:5000/delete/${filename}`, {
				method: 'DELETE'
			});
			const result = await res.json();
			if (res.ok) {
				alert(`File deleted successfully. Hash recorded: ${result.hash}`);
				setDocuments(prev => prev.filter(d => d.id !== doc.id));
			} else {
				alert(result.error || 'Delete failed.');
			}
		} catch (err) {
			alert('Delete request failed.');
		}
	};

const handleOpen = async (doc) => {
  try {
    const filename = doc.savedAs || doc.originalFileName;
    const res = await fetch(`http://localhost:5000/file/${filename}`);
    const data = await res.json();

    if (res.ok && data.fileUrl) {
      window.open(data.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(data.error || 'File URL not found.');
    }
  } catch (error) {
    console.error('Error opening document:', error);
    alert('Failed to open document.');
  }
};
``

	return (
		<Layout>
			<div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
				<div className="w-full max-w-6xl mx-auto">
					<div className="flex items-center gap-4 mb-6">
						<div className="relative w-full">
							<IoSearchOutline className="absolute left-3 top-3" style={{ color: theme.textSecondary }} />
							<input
								type="text"
								className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring"
								style={{ background: theme.surface, color: theme.text, borderColor: theme.border }}
								placeholder="Search documents..."
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</div>
						<button
							onClick={() => setModalOpen(true)}
							className="px-4 py-2 rounded-md font-medium"
							style={{ background: theme.primary, color: theme.text, border: 'none' }}
						>
							Upload
						</button>
					</div>

					<div className="space-y-4">
						{filteredDocs.length > 0 ? (
							filteredDocs.map(doc => (
								<div key={doc.id} className="shadow rounded-lg p-4 border" style={{ background: theme.card, borderColor: theme.border, color: theme.text }}>
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2 text-xl" style={{ color: theme.primary }}>
											{iconMap[doc.type] || iconMap.other}
											<h2 className="text-lg font-semibold" style={{ color: theme.text }}>{doc.name}</h2>
										</div>
										<span className="text-sm" style={{ color: theme.textSecondary }}>{formatDate(doc.date)}</span>
									</div>
									<p className="text-sm mb-1" style={{ color: theme.accent, fontWeight: 500 }}>{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</p>
									<p className="text-sm" style={{ color: theme.textSecondary }}>{doc.notes}</p>
									{doc.doctor && <p className="text-sm" style={{ color: theme.textSecondary }}>Doctor: {doc.doctor}</p>}
									{doc.link && (
										<a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm block mt-1">
											Open Document
										</a>
									)}
									<div className="flex gap-2 mt-2">
										<button
											className="mt-0 px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
											onClick={() => handleDelete(doc)}
										>
											Delete
										</button>
										{(doc.fileUrl || doc.originalFileName) && (
											<button
												className="mt-0 px-3 py-1 rounded border text-xs bg-white border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 transition-colors"
												style={{ borderColor: theme.primary, color: theme.primary, background: theme.surface }}
												onClick={() => handleOpen(doc)}
											>
												Open File
											</button>
										)}
									</div>
									{doc.hash && <div className="text-xs text-gray-400 mt-1">Hash: {doc.hash}</div>}
								</div>
							))
						) : (
							<div className="text-center mt-20" style={{ color: theme.textSecondary }}>
								<IoDocumentTextOutline className="mx-auto text-6xl mb-4" style={{ color: theme.disabled }} />
								<p>No documents found. Upload a new document to get started.</p>
							</div>
						)}
					</div>

					{isModalOpen && (
						<div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
							<div className="rounded-md shadow-lg p-6 w-full max-w-md" style={{ background: theme.card, color: theme.text }}>
								<h3 className="text-xl font-semibold mb-4">Upload New Document</h3>
								<input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Document Name" value={docName} onChange={e => setDocName(e.target.value)} />
								<input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Document Type" value={docType} onChange={e => setDocType(e.target.value)} />
								<input type="date" className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} value={docDate} onChange={e => setDocDate(e.target.value)} />
								<input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Doctor's Name" value={docDoctor} onChange={e => setDocDoctor(e.target.value)} />
								<input className="w-full rounded-md px-3 py-2 mb-3 border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} placeholder="Document Link (optional)" value={docLink} onChange={e => setDocLink(e.target.value)} />
								<input type="file" onChange={e => setFile(e.target.files[0])} className="w-full border border-dashed py-2 px-3 mb-4 rounded-md text-sm" style={{ background: theme.surface, color: theme.text, borderColor: theme.disabled }} />
								<div className="flex gap-3">
									<button className="w-full py-2 rounded-md border" style={{ background: theme.surface, color: theme.text, borderColor: theme.border }} onClick={() => setModalOpen(false)}>Cancel</button>
									<button className="w-full py-2 rounded-md" style={{ background: theme.primary, color: theme.text, border: 'none' }} onClick={async () => {
										if (!file || !docName || !docType || !docDate || !docDoctor) return alert('Please fill all required fields and select a file.');
										const formData = new FormData();
										formData.append('document', file);
										formData.append('name', docName);
										formData.append('type', docType);
										formData.append('date', docDate);
										formData.append('doctor', docDoctor);
										formData.append('link', docLink);
										formData.append('notes', 'Uploaded via blockchain-like backend');
										try {
											const response = await fetch('http://localhost:5000/upload', { method: 'POST', body: formData });
											const data = await response.json();
											alert(`Document uploaded securely. Hash: ${data.hash}`);
											setDocuments(prev => [...prev, {
												id: Date.now().toString(),
												name: docName,
												type: docType,
												date: docDate,
												doctor: docDoctor,
												link: docLink,
												notes: 'Uploaded via blockchain-like backend',
												hash: data.hash,
												url: data.fileUrl,
												originalFileName: data.originalFileName,
												savedAs: data.savedAsṣ
											}]);
											setModalOpen(false);
											setFile(null);
											setDocName('');
											setDocType('');
											setDocDate('');
											setDocDoctor('');
											setDocLink('');
										} catch (err) {
											alert('Upload failed.');
										}
									}}>Upload</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default MedidocsScreen;
