# 🚀 Real-Time Collaborative Code Editor

A powerful **real-time collaborative code editor** that allows multiple users to write and edit code simultaneously — similar to Google Docs or VS Code Live Share.

---

## 📸 Preview

<img src="https://via.placeholder.com/900x400?text=Collaborative+Editor+Preview" />

---

## ✨ Features

* 🔄 Real-time code synchronization across users
* 👥 Multi-user room support
* 🧑‍💻 Live user presence with colored badges
* 🖱️ Real-time cursor tracking with usernames
* 🎨 Clean UI (light theme)
* ⚡ Fast and responsive Monaco Editor
* 🔐 Room-based collaboration (join via ID)

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router
* Monaco Editor
* Socket.io-client

### Backend

* Node.js
* Express.js
* Socket.io


## 📁 Project Structure

```
Project2/
├── client/        # React frontend
│   ├── src/
│   └── package.json
│
├── server/        # Node backend
│   ├── index.js
│   └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Collaborative-Code-Editor.git
cd Collaborative-Code-Editor
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
node index.js
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🚀 Usage

1. Open the app in browser
2. Enter a **Room ID**
3. Share the same Room ID with others
4. Start coding together in real-time

---

## 🧠 How It Works

* Socket.io establishes real-time WebSocket connections
* Users join rooms using unique IDs
* Code changes are broadcasted instantly to all users in the room
* Cursor positions are tracked and rendered dynamically
* Server maintains room state and user presence

---

## 📌 Future Improvements

* 🔐 Authentication system (login/signup)
* 💾 Save code to database
* 🌐 Multi-language support
* 📹 Voice/video collaboration
* 🧠 CRDT-based conflict resolution (Google Docs level)
* 🎯 Syntax-aware collaboration

---

## 🤝 Contributing

Contributions are welcome!

```bash
Fork the repo
Create a new branch
Commit your changes
Push and open a PR
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Monaco Editor (Microsoft)
* Socket.io
* Inspired by Google Docs & VS Code Live Share

---

## ⭐ Show Some Love

If you like this project, give it a ⭐ on GitHub!

---
