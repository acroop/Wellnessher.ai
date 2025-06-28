const express = require('express');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: 'uploads/' });
const ledgerFile = 'ledger.json';

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Ensure ledger file exists and is valid JSON
if (!fs.existsSync(ledgerFile) || fs.readFileSync(ledgerFile, 'utf8').trim() === '') {
  fs.writeFileSync(ledgerFile, '[]');
}

// POST /upload
app.post('/upload', upload.single('document'), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    const originalName = path.basename(req.file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueName = `${uuidv4()}_${originalName}`;
    const newPath = path.join(__dirname, 'uploads', uniqueName);
    fs.renameSync(req.file.path, newPath);

    const entry = {
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      notes: req.body.notes,
      hash,
      fileUrl: `http://localhost:5000/files/${uniqueName}`,
      originalFileName: originalName,
      savedAs: uniqueName,
      status: 'uploaded',
      timestamp: new Date().toISOString()
    };

    let ledger = [];
    try {
      ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));
    } catch {
      ledger = [];
    }

    ledger.push(entry);
    fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));

    res.json({ message: 'Document uploaded and recorded.', ...entry });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload document.' });
  }
});

// DELETE /delete/:filename
app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  try {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      fs.unlinkSync(filePath);

      const entry = {
        savedAs: filename,
        hash,
        status: 'deleted',
        timestamp: new Date().toISOString()
      };

      let ledger = [];
      try {
        ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));
      } catch {
        ledger = [];
      }

      ledger.push(entry);
      fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));

      res.json({ message: 'File deleted and recorded.', ...entry });
    } else {
      res.status(404).json({ error: 'File not found.' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file.' });
  }
});

// GET /file/:filename -> return full file URL from ledger
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  try {
    const ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));
    const entry = ledger.find(doc => doc.savedAs === filename || doc.originalFileName === filename);

    if (!entry) return res.status(404).json({ error: 'File not found in ledger.' });

    return res.json({ fileUrl: entry.fileUrl });
  } catch (err) {
    console.error('Error fetching file from ledger:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Start server
app.listen(5000, () => console.log('🚀 Hash node with full audit log running on http://localhost:5000'));
