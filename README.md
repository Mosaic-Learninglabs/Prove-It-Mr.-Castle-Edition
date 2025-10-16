# 🔍 Prove It! - Mr. Castle Edition

An interactive educational game for Mr. Castle's 7th grade History class at Terronez Middle School. Students practice finding, evaluating, and using evidence from historical passages about the American Revolution.

## Features

### Student Features
- **8 American Revolution Topics**: French Alliance, Geography & Terrain, Leadership, Guerrilla Tactics, British Challenges, Colonial Motivation, Economic Factors, and International Support
- **Interactive Sorting**: Drag-and-drop interface with undo/reset functionality
- **Vocabulary Support**: 90+ historical terms with hover definitions
- **Writing Integration**: Students write explanations connecting evidence to claims (minimum 50 characters)
- **Immediate Feedback**: Visual feedback with detailed card reviews
- **Progress Indicator**: Clear "Step X of 3" navigation
- **Time Tracking**: Automatic time tracking per attempt
- **Auto-save**: Drafts automatically saved to localStorage (24-hour expiration)
- **Mobile Friendly**: Touch support for tablets and Chromebooks
- **Accessibility**: Keyboard navigation and ARIA labels

### Teacher Features
- **Copy Results**: Students can copy formatted results to share with teacher
- **CSV Export**: Download all student attempts as CSV for analysis
- **Progress Tracking**: Last 20 attempts saved in localStorage

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Static Content** - Pre-written historical passages (no API required)

## Prerequisites

- Node.js 18+ and npm

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd prove-it
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
prove-it/
├── src/
│   ├── components/
│   │   ├── StartScreen.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── SortingPhase.jsx
│   │   ├── BuildingPhase.jsx
│   │   ├── FeedbackPhase.jsx
│   │   └── EvidenceCard.jsx
│   ├── data/
│   │   ├── topics.js
│   │   ├── staticContent.js
│   │   └── vocabulary.js
│   ├── hooks/
│   │   └── useGameState.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## Game Flow

1. **Topic Selection**: Students choose from 8 American Revolution topics
2. **Sorting Phase** (Step 1 of 3):
   - Read historical passage with vocabulary support
   - Drag 6 evidence cards into categories:
     - ✅ PROVES IT (strong, direct evidence)
     - 🤔 KINDA RELATED (connected but insufficient)
     - ❌ NOT RELEVANT (unrelated to claim)
   - Use Undo, Reset All, or Hint buttons
3. **Building Phase** (Step 2 of 3):
   - Select 2-3 pieces of evidence from "PROVES IT" zone
   - Write explanation (minimum 50 characters)
4. **Feedback Phase** (Step 3 of 3):
   - View score and percentage
   - See time spent
   - Review each card with feedback
   - Copy results or export CSV
   - Play again

## Topics Available

All topics focus on "Why did the Americans win the Revolutionary War?"

1. **French Alliance** 🇫🇷 - Role of French military support at Yorktown
2. **Geography & Terrain** 🗺️ - How landscape gave Americans advantages
3. **Leadership** ⭐ - Washington's critical leadership abilities
4. **Guerrilla Tactics** ⚔️ - Unconventional fighting methods
5. **British Challenges** 🚢 - Distance and logistics obstacles
6. **Colonial Motivation** 🔔 - Personal stakes driving American soldiers
7. **Economic Factors** 💰 - Financial pressures on Britain
8. **International Support** 🌍 - Multiple nations aiding America

## Recent Improvements

### Architecture
- Refactored from 798-line monolith to modular component structure
- Separated data, logic, and presentation
- Custom hook for game state management

### UX Improvements
- **Undo/Reset**: Fix mistakes without refreshing
- **Hint System**: Contextual hints for struggling students
- **Mobile Support**: Touch events for tablets/Chromebooks
- **Auto-save**: Prevents work loss on browser close
- **Time Tracking**: Shows time spent on each attempt
- **Progress Indicator**: Clear step navigation (1 of 3, 2 of 3, etc.)

### Teacher Tools
- **CSV Export**: Download all attempts with scores, times, and student responses
- **Copy Results**: Formatted text students can paste into assignment submissions

### Accessibility
- Keyboard navigation for all interactions
- ARIA labels for screen readers
- High contrast color schemes
- Focus indicators

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Click "Deploy"

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## Support

For issues or questions, please open an issue on GitHub.
