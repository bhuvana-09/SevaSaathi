# SevaSaathi 🏛️

> **Empowering citizens to discover government schemes & welfare benefits easily.**

SevaSaathi is an accessible, voice-enabled, and multilingual web application designed to help citizens across India discover government scholarships, financial aid, and welfare schemes tailored to their unique demographic and socio-economic profile.

---

## 📌 Problem Statement & Who It's For

Millions of eligible citizens in India miss out on life-changing government welfare programs and educational scholarships due to:
- **Complex eligibility criteria** buried in dense official documents.
- **Language barriers** for non-English speakers.
- **Digital literacy challenges** in filling out structured web forms.
- **Uncertainty regarding required documentation** and where to apply.

**SevaSaathi** bridges this gap for students, low-income families, rural citizens, and underserved communities by offering a **voice-first, plain-language assistant** that evaluates profile parameters in real time and provides step-by-step guidance.

---

## ✨ Key Features

- 🎤 **Voice-First Input (Web Speech API)**: Citizens can speak their details in natural sentences (e.g. *"Age 22, Maharashtra, income 2 lakh, Category OBC, Female, Graduate"*) to automatically populate the form fields.
- 🌐 **Multilingual Support (English, Hindi, Telugu)**: The entire interface—headers, sidebar, form fields, scheme cards, badges, gap explanations, and document checklists—translates dynamically into **English**, **Hindi (हिंदी)**, or **Telugu (తెలుగు)**.
- 🎯 **AI-Assisted Eligibility Engine**: Evaluates profile criteria (Age, State, Income, Category, Gender, Education) against scheme rules and categorizes schemes into:
  - **🟢 Eligible Schemes**: Highlighted with a prominent checkmark and plain-language qualification reasons.
  - **🟡 Near-Miss Schemes**: Clearly explains the exact threshold gap (e.g., *"Income is ₹50,000 above the upper limit of ₹2.5 Lakh"*).
- 📋 **Document Checklist & Obtainment Guide**: Generates custom document checklists for each scheme with step-by-step instructions on where and how to obtain them (e.g., e-District, Tahsildar, UIDAI Kendra).
- 🔊 **Text-to-Speech (TTS) Narration**: Reads match results and document checklists aloud in the selected language. Includes an **asynchronous voice detection fallback chain** (`te-IN` → `hi-IN` -> `en-IN`) with a visible device notice if a native voice is unavailable.
- ⏹️ **Dedicated Voice Controls**: Instant `Read Aloud` and `Stop Voice` controls allow users to play or immediately halt narration at any point.
- 🔄 **One-Click Form Reset**: Instantly resets form fields, voice transcripts, and scheme results, stopping audio playback and returning the stepper to Step 1.
- 📱 **Clean & Mobile-Friendly**: Responsive layout with high-contrast cards, touch-optimized targets (48px min height), and smooth auto-scrolling to results.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript (`typescript`)
- **Build Tool**: Vite 6 (`vite`, `@vitejs/plugin-react`)
- **Browser APIs**:
  - `Web Speech API` (`SpeechRecognition` / `webkitSpeechRecognition` for Voice Fill)
  - `SpeechSynthesis API` (`SpeechSynthesisUtterance` for Text-to-Speech)
- **Styling**: Modern CSS3 (Custom Properties, Flexbox, CSS Grid, Responsive Media Queries)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (`express`)
- **Middleware**: CORS (`cors`)
- **Data Store**: In-memory JSON dataset (`schemes.json`)

---

## 📂 Project Structure

```
SevaSaathi/
├── backend/
│   ├── server.js          # Express API server & eligibility matching rules engine
│   ├── schemes.json       # Government scheme rules & document repository
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Root layout & global language state
│   │   ├── UserForm.tsx     # Demographic form, Voice Fill, & Reset logic
│   │   ├── ResultsDisplay.tsx # Eligible & Near-Miss cards, collapsible details, & checklist modal
│   │   ├── InfoCard.tsx     # Left sidebar with "About SevaSaathi" & standard document guide
│   │   ├── StepIndicator.tsx# 2-step progress stepper (Details → Results)
│   │   ├── speechParser.ts  # Multilingual voice-fill text parser (en/hi/te)
│   │   ├── speechSynthesis.ts # Async TTS engine with language fallback chain
│   │   ├── translateUtil.ts # Scheme & document translation dictionary
│   │   ├── api.ts           # REST client for /match and /checklist endpoints
│   │   ├── constants.ts     # UI translations, states, categories, genders, education levels
│   │   └── style.css        # App styling & mobile responsive theme
│   ├── index.html
│   └── package.json       # Frontend dependencies
└── README.md
```

---

## 🚀 How to Run Locally

### **Prerequisites**
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Browser**: Google Chrome, Microsoft Edge, or Brave (recommended for Web Speech API support)

---

### **Step 1: Start the Backend Server**

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
   *The backend server will run on `http://localhost:5000`.*

---

### **Step 2: Start the Frontend Application**

1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend application will run on `http://localhost:5173`.*

---

### **Step 3: Test the Application**

1. Open **`http://localhost:5173`** in your browser.
2. Select your preferred language (**English**, **हिंदी**, or **తెలుగు**).
3. Fill out the form manually or click **"Voice Fill"** and speak your details aloud.
4. Click **"Submit"** to view matched schemes, listen to voice narration, and open document checklists.

---

## ⚡ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/schemes` | Returns list of all available schemes in the system |
| `POST` | `/match` | Accepts profile JSON (`age`, `state`, `income`, `category`, `gender`, `education`) and returns eligible and near-miss schemes with reasons |
| `GET` | `/checklist/:schemeId` | Returns document checklist & obtainment hints for a specific scheme |

---

## 🤖 Built with LatentCode

This project was developed iteratively with **LatentCode**—an interactive CLI software engineering assistant.

**LatentCode** assisted across all development sprints in:
- Scaffolding the React Vite TypeScript frontend and Express backend.
- Implementing the multilingual voice-fill parser and Web Speech API integration.
- Building the custom rules engine for eligibility matching and near-miss threshold detection.
- Implementing speech synthesis with asynchronous device voice fallback chains.
- Designing responsive UI components and verifying TypeScript builds across iterative updates.

---
