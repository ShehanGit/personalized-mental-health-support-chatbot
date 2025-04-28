# MindCompanion - Personalized Mental Health Support Chatbot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-v14%2B-green)](https://nodejs.org)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)](https://reactnative.dev/)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technical Stack](#technical-stack)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🔍 Project Overview

MindCompanion is an innovative mental health support platform designed to provide personalized assistance through a conversational AI interface. The application leverages advanced machine learning to offer emotional support, detect potential crisis situations, and maintain a continuous, personalized dialogue with users.

Our mission is to make mental health support accessible, immediate, and personalized, helping users navigate their emotional well-being with privacy and care.

## ✨ Key Features

- **Personalized Chat Experience**: AI-driven conversations tailored to individual user profiles and needs
- **Crisis Detection**: Real-time analysis of conversations to identify potential crisis situations
- **Mood Tracking**: Visual representation of emotional patterns over time
- **Multiple Chat Sessions**: Support for different conversation threads and topics
- **Private & Secure**: End-to-end encryption and local storage of sensitive information
- **User Profile Customization**: Personalized settings to enhance user experience
- **Multi-step Onboarding**: Guided setup process for new users

## 🏗️ Architecture

MindCompanion follows a three-tier architecture designed for scalability, security, and performance:

\`\`\`
├── backend/           # Node.js/Express backend server
├── mobile/            # React Native/Expo mobile application
└── ml-model/          # Crisis detection ML model service
\`\`\`

### Core Components

1. **Mobile Application**: React Native/Expo frontend that provides the user interface
2. **Backend API**: Node.js/Express server that handles authentication, data storage, and OpenAI integration
3. **ML Service**: Python-based crisis detection model using DistilBERT for real-time text analysis

## 🛠️ Technical Stack

### Mobile Application
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Drawer)
- **State Management**: React Context API
- **Storage**: AsyncStorage & Secure Store
- **Networking**: Axios
- **UI Components**: Custom components with React Native Animatable
- **Visualization**: React Native Chart Kit & SVG

### Backend Server
- **Runtime**: Node.js 14+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth system
- **External API**: OpenAI API integration
- **Security**: bcrypt for password hashing
- **Environment**: dotenv for configuration

### ML Service
- **Framework**: FastAPI
- **ML Libraries**: PyTorch, Transformers
- **Model**: Fine-tuned DistilBERT
- **Language**: Python 3.8+

## 📥 Installation & Setup

### Prerequisites
\`\`\`bash
# Node.js 14+ for backend
# Python 3.8+ for ML model
# MongoDB instance
# OpenAI API key
\`\`\`

### Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
\`\`\`

### Mobile App Setup
\`\`\`bash
cd mobile
npm install
# Update api.ts with your backend URL
expo start
\`\`\`

### ML Model Setup
\`\`\`bash
cd ml-model/my-crisis-detection
pip install -r requirements.txt
python crisis_service.py
\`\`\`

## 🔌 API Documentation

### Authentication
- POST \`/api/auth/signup\` - User registration
- POST \`/api/auth/login\` - User login

### Chat
- POST \`/api/chat/new-session\` - Create new chat session
- POST \`/api/chat/message\` - Send message
- GET \`/api/chat/sessions\` - Get user's chat sessions
- GET \`/api/chat/history/:sessionId\` - Get chat history

### Crisis Detection
- POST \`/predict\` - Analyze text for crisis indicators

## 📂 Project Structure

\`\`\`
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
\`\`\`

## 👥 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📮 Contact
For any queries regarding this project, please open an issue in the repository.
`;

  // Write the README file to the current directory
  fs.writeFileSync(path.join(process.cwd(), 'README.md'), readmeContent);
  console.log('README.md has been successfully generated!');
}

// Execute the function
generateReadme();

module.exports = { generateReadme };
