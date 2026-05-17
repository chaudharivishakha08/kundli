const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path : path.join(__dirname, "config/config.env")});
const { connectDatabase } = require('./config/database');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const queryRouter = require('./routes/query');
const kundliRouter = require('./routes/kundli');

// Import constants
// const { planets, rashiList, nakshatraList,debilatedSignEffects, exaltedSignEffects, planetTranslations, rashiTranslations } = require('./consts/consts');
const { 
  planets,
  rashiList,
  nakshatraList,  
  debilatedSignEffects,
  exaltedSignEffects,
  planetTranslations,
  rashiTranslations
} = require('./consts/consts');
const { convertRashiMapToNumbers,findPlanetsInSameHouseObj,findPlanetsInNearestHouses,findPlanetsInOppositeHouses, extractDatesFromText,getCurrentDashaFromNakshatra, extractRashi, getMatchMakingYog } = require('./utils/utils');
const { log } = require('console');

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

connectDatabase();

// Import and use auth routes
app.use('/api/v1',userRouter);
app.use('/api/v1',queryRouter);
app.use('/api/v1',kundliRouter);




// File upload config
const upload = multer({ dest: 'uploads/' });

// Remove EJS setup
// app.set('view engine', 'ejs');

// Remove EJS-based root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Serve client build if it exists (will be copied into backend/client_build by Dockerfile)
const clientBuildPath = path.join(__dirname, 'client_build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // For any route not starting with /api, return the React app
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).end();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  const filePath = req.file.path;
  const language = req.query.language || 'en'; // Default to English if no language specified

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const lines = pdfData.text.split('\n').map(l => l.trim()).filter(Boolean);

    let nakshatra;
    let nakshatraPada;
    const planetRashiMap = new Map();

    // --- Extract planet, rashi, nakshatra, and pada info from PDF ---
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // console.log(line);

      for (let planet of planets) {
        if (line.startsWith(planet)) {
          // console.log("line started with planet",planet);
          
          // --- Find Rashi ---
          let rashi = rashiList.find(r => line.includes(r));
          // console.log("line has planet rashi both",planet,rashi);
          
          if (!rashi && i + 1 < lines.length) {
            rashi = rashiList.find(r => lines[i + 1].includes(r));
            if (rashi) {
              planetRashiMap.set(planet, rashi);
              i++;
              break;
            }
          }

          if (rashi) {
            planetRashiMap.set(planet, rashi);
          }

          // ✅ Add Nakshatra + Pada extraction for Chandra
          if (planet === 'Chandra') {
            nakshatra = nakshatraList.find(n => line.includes(n));

            // Extract the Pada number (1–4) after the nakshatra
            const padaMatch = line.match(/[, ](\d)\b/);
            nakshatraPada = padaMatch ? parseInt(padaMatch[1], 10) : null;

            // // console.log(`Nakshatra: ${nakshatra}, Pada: ${nakshatraPada}`);
          }

          break; // stop checking other planets for this line
        }
      }
    }
    // console.log('Extracted Planet-Rashi Map:', planetRashiMap);

    // --- Convert and find planetary positions ---
    const planetRashiNumberMap = convertRashiMapToNumbers(planetRashiMap);
    const planetsInSameHouse = findPlanetsInSameHouseObj(planetRashiNumberMap);
    const planetsInNearestHousesResult = findPlanetsInNearestHouses(planetRashiNumberMap);
    const planetsInOppositeHousesResult = findPlanetsInOppositeHouses(planetRashiNumberMap);

    const planetPositions = {
      planetsInSameHouse,
      planetsInNearestHousesResult,
      planetsInOppositeHousesResult
    };

    // --- Extract dates (birthdate / timestamps) from the PDF text ---
    const fullText = pdfData.text;
    const extractedDates = extractDatesFromText(fullText);
    // // console.log('Extracted dates from PDF:', extractedDates);

    // Normalize to YYYY-MM-DD (take date portion of ISO); keep order and filter nulls
 const extractedDatesFormatted = extractedDates
  .filter(Boolean)
  .map(d => {
    const date = new Date(d); // JS can parse some formats like YYYY-MM-DD
    return isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
  })
  .filter(Boolean);

const birthDate = extractedDatesFormatted.length > 0
  ? new Date(extractedDatesFormatted[0])
  : null;

    

    // const dasha = getCurrentDashaFromNakshatra(nakshatra, nakshatraPada, birthDate);
    

    fs.unlinkSync(filePath); // delete uploaded file

    // --- Find debilitated and exalted results ---
    const debilitatedResults = [];
    const exaltedResults = [];

    for (const [planet, rashi] of planetRashiMap.entries()) {
      const debilitatedMatch = debilatedSignEffects.find(item => item.planet === planet && item.rashi === rashi);
      const exaltedMatch = exaltedSignEffects.find(item => item.planet === planet && item.rashi === rashi);

      const planet_en = planetTranslations[planet]?.en || planet;
      const planet_mr = planetTranslations[planet]?.mr || planet;
      const rashi_en = rashiTranslations[rashi]?.en || rashi;
      const rashi_mr = rashiTranslations[rashi]?.mr || rashi;

      if (debilitatedMatch) {
        debilitatedResults.push({
          planet: language === 'mr' ? planet_mr : planet_en,
          rashi: language === 'mr' ? rashi_mr : rashi_en,
          effect: language === 'mr' ? debilitatedMatch.effect_mr : debilitatedMatch.effect_en
        });
      }

      if (exaltedMatch) {
        exaltedResults.push({
          planet: language === 'mr' ? planet_mr : planet_en,
          rashi: language === 'mr' ? rashi_mr : rashi_en,
          effect: language === 'mr' ? exaltedMatch.effect_mr : exaltedMatch.effect_en
        });
      }
    }

    // --- Final response ---
    res.json({
      planetPositions,
      debilitatedResults,
      exaltedResults,
      extractedDates,
      extractedDatesFormatted,
      // dasha
    });

  } catch (err) {
    console.error('Error processing PDF:', err);
    res.status(500).json({ error: 'Error processing PDF' });
  }
});

app.post('/match-making', upload.fields([
  { name: 'malePdf', maxCount: 1 },
  { name: 'femalePdf', maxCount: 1 }
]), async (req, res) => {
  let maleFilePath = null;
  let femaleFilePath = null;

  try {
    const maleFile = req.files?.malePdf?.[0];
    const femaleFile = req.files?.femalePdf?.[0];

    maleFilePath = maleFile?.path;
    femaleFilePath = femaleFile?.path;

    if (!maleFile || !femaleFile) {
      console.error('Missing file(s) in request. Received fields:', req.body);
      console.error('Received files object:', req.files);
      return res.status(400).json({ error: 'Both malePdf and femalePdf files are required (multipart form fields)' });
    }

    // --- LOG FILE METADATA (Steps 1 & 3 are included for context/logging) ---
    // console.log("--- Uploaded Male File Log ---");
    // console.log("Original Name:", maleFile.originalname);
    // ... other logs
    // console.log("--- Uploaded Female File Log ---");
    // console.log("Original Name:", femaleFile.originalname);
    // ... other logs

    // 2. Read and parse both PDFs
    const maleBuffer = fs.readFileSync(maleFilePath);
    const femaleBuffer = fs.readFileSync(femaleFilePath);

    const malePdf = await pdfParse(maleBuffer);
    const femalePdf = await pdfParse(femaleBuffer);

    const maleText = malePdf.text || '';
    const femaleText = femalePdf.text || '';

    // --- LOG THE EXTRACTED PDF CONTENT ---
    // console.log("--- Extracted Male PDF Text (Truncated) ---");
    // console.log(maleText.substring(0, 500) + '...');
    // console.log("--- Extracted Female PDF Text (Truncated) ---");
    // console.log(femaleText.substring(0, 500) + '...');

    // 4. Extract the Rashi from both PDF texts
    const maleRashi = extractRashi(maleText);
    const femaleRashi = extractRashi(femaleText);

    // 5. Log the extracted Rashi values
    // console.log("--- Extracted Rashi Values ---");
    // console.log("Male Rashi:", maleRashi || "Not Found");
    // console.log("Female Rashi:", femaleRashi || "Not Found");

    // 6. Handle case where Rashi is not found
    if (!maleRashi || !femaleRashi) {
        return res.status(404).json({
            error: 'Could not extract Rashi from one or both PDFs.',
            details: {
                maleRashi: maleRashi || "Not Found",
                femaleRashi: femaleRashi || "Not Found"
            }
        });
    }

    const matchResult = getMatchMakingYog(maleRashi, femaleRashi);

    // cleanup files
    try { fs.unlinkSync(maleFilePath); } catch (e) {}
    try { fs.unlinkSync(femaleFilePath); } catch (e) {}
    
    // Return the extracted Rashi words
    return res.json({
      success: true,
      message: 'Rashi words successfully extracted for matchmaking.',
      maleRashi: maleRashi,      
      femaleRashi: femaleRashi,
      matchMakingResult: matchResult
    });

  } catch (err) {
    console.error('Error in /match-making:', err);
    
    // Attempt to clean up files even on error
    if (maleFilePath) { try { fs.unlinkSync(maleFilePath); } catch (e) {} }
    if (femaleFilePath) { try { fs.unlinkSync(femaleFilePath); } catch (e) {} }

    return res.status(500).json({ error: 'Error processing matchmaking PDFs' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
