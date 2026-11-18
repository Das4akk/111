import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleSkinConsultation } from './src/server/consultantHandler.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for Skin Consultant powered by Gemini 3.8 Flash + Google Search
app.post('/api/skin-consultant', async (req, res) => {
  try {
    const result = await handleSkinConsultation(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error' });
  }
});

// Serve static client assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
