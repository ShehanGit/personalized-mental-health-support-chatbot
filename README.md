# MindCompanion - personalized-mental-health-support-chatbot



MindCompanion is a mobile mental health chatbot designed to provide compassionate support and personalized advice. The app collects user details during onboarding and uses this data to tailor its responses through integration with the OpenAI API. The project consists of a Node.js/Express backend (with MongoDB Atlas and OpenAI integration) and a React Native (Expo) mobile app.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Mobile App Setup](#mobile-app-setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

MindCompanion offers a supportive, personalized experience by:
- Collecting personal details (nickname, age range, primary mental health concerns, daily routine, etc.) during onboarding.
- Storing these details locally (using AsyncStorage) for personalization.
- Allowing users to chat with a mental health companion that uses OpenAI API responses tailored to their input.
- Enabling multiple chat sessions, session management via a side drawer, and viewing/updating profile information.

## Features

- **Multi-Step Onboarding:**  
  Collects essential personal and mental health-related information from users.
- **User Profile:**  
  Saves and displays user data from AsyncStorage.
- **Personalized Chat:**  
  Uses user details to create a dynamic system prompt for the OpenAI API.
- **Session Management:**  
  Create new chat sessions and select previous sessions using a side drawer.
- **Mood Tracker (Optional):**  
  Log and visualize daily moods (integrated with chart libraries).
- **Responsive UI:**  
  Handles keyboard avoidance, smooth scrolling with FlatList, and custom theming.
- **Backend Integration:**  
  Uses Express and MongoDB Atlas for data storage and processing.

## Tech Stack

- **Backend:**  
  - Node.js / Express  
  - MongoDB Atlas (Mongoose)  
  - OpenAI API  
- **Mobile App:**  
  - React Native with Expo  
  - AsyncStorage  
  - React Navigation (Stack, Drawer)  
  - Axios for HTTP requests  
  - Optional: react-native-chart-kit for mood tracking

## Installation

### Backend Setup

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   git clone <repository_url>
   cd <repository_folder>/backend
