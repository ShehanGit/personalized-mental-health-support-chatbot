# MindCompanion - Personalized Mental Health Support Chatbot

## Project Overview
MindCompanion is a comprehensive mental health support application that combines mobile technology, machine learning, and conversational AI to provide personalized mental health support. The system includes crisis detection capabilities and personalized chat interactions based on user profiles.

### Core Components

1. **Mobile Application (React Native/Expo)**
   - User authentication and profile management
   - Personalized chat interface
   - Mood tracking functionality
   - Profile customization
   - Multi-session chat management

2. **Backend Server (Node.js/Express)**
   - User authentication and session management
   - Chat history storage
   - Integration with OpenAI API
   - Crisis detection service integration

3. **Crisis Detection Service (Python/FastAPI)**
   - DistilBERT-based crisis detection model
   - Real-time text analysis
   - Crisis probability assessment

## Technical Stack

### Mobile App
- React Native with Expo
- TypeScript
- React Navigation (Stack & Drawer)
- AsyncStorage for local data
- Axios for API communication
- React Native Animatable
- Custom UI components

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT authentication
- OpenAI API integration
- RESTful API architecture

### ML Model
- FastAPI
- PyTorch
- Transformers (DistilBERT)
- Python 3.8+

## Features

### User Experience
- Multi-step onboarding process
- Personalized chat interactions
- Real-time crisis detection
- Mood tracking visualization
- Multiple chat sessions
- Customizable user profiles

### Security & Privacy
- JWT-based authentication
- Secure password hashing
- Protected API endpoints
- Local storage of sensitive data

### AI & ML Capabilities
- Crisis detection model
- Personalized response generation
- Context-aware conversations
- Real-time text analysis

## Installation & Setup

### Prerequisites

- Node.js 14+ for backend
- Python 3.8+ for ML model
- MongoDB instance
- OpenAI API key

## Backend Setup

```bash
git clone https://github.com/ShehanGit/personalized-mental-health-support-chatbot.git
cd synerharvest
```

```bash
cd backend
npm install
cp .env.example .env
```
```bash
# Configure environment variables
npm run dev
```

## Mobile App Setup

```bash
cd mobile
npm install
# Update api.ts with your backend URL
expo start
```

## ML Model Setup

```bash
cd ml-model/my-crisis-detection
pip install -r requirements.txt
python crisis_service.py
```

## Environment Variables

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```
## Project Structure

```bash
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── mobile/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   └── App.tsx
└── ml-model/
    └── my-crisis-detection/
        ├── crisis_service.py
        └── train_distilbert.py
```

### License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- OpenAI for API integration
- Hugging Face for transformer models
- MongoDB Atlas for database hosting
