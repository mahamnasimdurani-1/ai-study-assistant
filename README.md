# 🤖 AI Study Assistant

An AI-powered study assistant that helps students understand programming, machine learning, data science, and PDF documents through an interactive chat interface.

## ✨ Features

* 💬 AI-powered study chat
* 📄 PDF upload and question answering
* 🧠 AI explanations for programming and technical concepts
* 🔐 User authentication
* 🗄️ PostgreSQL database
* ⚡ FastAPI backend
* 🎨 Next.js frontend
* 🤖 Gemini API integration
* 🐍 Python-based AI service

## 🛠️ Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python
* Pydantic

### Database

* PostgreSQL
* SQLAlchemy

### AI

* Google Gemini API

### PDF Processing

* PyMuPDF

## 🏗️ Architecture

```text
                ┌─────────────────────┐
                │     Next.js UI      │
                │   TypeScript + CSS  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     FastAPI API     │
                │       Python        │
                └──────────┬──────────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
        ┌────────────────┐   ┌────────────────┐
        │  Gemini API    │   │  PostgreSQL    │
        │      AI        │   │    Database    │
        └────────────────┘   └────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │   PDF / Text   │
        │   Processing   │
        └────────────────┘
```

## 📁 Project Structure

```text
ai-study-assistant/
│
├── ai-service/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahamnasimdurani-1/ai-study-assistant.git
cd ai-study-assistant
```

### 2. Backend Setup

Go to the backend:

```bash
cd ai-service
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file inside `ai-service`:

```env
OPENAI_API_KEY=your_api_key
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your `.env` file to GitHub.

### 4. Run the Backend

From the `ai-service` directory:

```bash
fastapi dev app/main.py
```

Backend will run locally at:

```text
http://127.0.0.1:8000
```

### 5. Frontend Setup

Open another terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📚 What This Project Demonstrates

This project demonstrates practical experience with:

* Full-stack application development
* REST APIs
* FastAPI
* Next.js
* TypeScript
* PostgreSQL
* SQLAlchemy
* Authentication
* LLM API integration
* Prompt engineering
* PDF processing
* AI-powered question answering
* Frontend/backend communication

## 🔮 Future Improvements

Possible future improvements include:

* Persistent chat history
* Advanced RAG
* Vector database integration
* Study progress tracking
* Quiz generation
* Flashcard generation
* Streaming AI responses
* Production authentication
* Cloud deployment

## 👩‍💻 Author

**Maham Nasim Durani**

GitHub:
https://github.com/mahamnasimdurani-1

---

⭐ If you find this project useful, consider giving it a star.
