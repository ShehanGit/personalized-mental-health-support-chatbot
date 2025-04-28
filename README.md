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
