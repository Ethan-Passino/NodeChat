# NodeChat

NodeChat is a peer-to-peer (P2P) chat application built using Node.js. It enables direct and secure communication between users with no reliance on a central server. NodeChat offers a sleek and user-friendly web interface, ensuring seamless interaction and privacy for its users.

## Features 🎯

### Core Features 🚀
- **Direct Peer-to-Peer Messaging**: Messages are sent directly between users.
- **Secure Communication**: End-to-end encryption protects messages from unauthorized access.
- **Offline Messaging**: Store messages locally and deliver them when the recipient reconnects.
- **File Sharing**: Share files like images and documents seamlessly over the P2P connection.

### Enhanced Features 🌟
- **Multipeer Chat**: Create group chats for direct communication between multiple peers.
- **Custom Usernames**: Users can set unique usernames for easy identification.
- **Status Indicators**: Display user statuses such as online, offline, or typing.

### UI/UX Features 🎨
- **Clean and Simple Interface**: Intuitive design for an excellent user experience.
- **Dark Mode**: Switch to a dark theme for comfort during nighttime use.
- **Customizable Chat Themes**: Personalize the look and feel of the chat.
- **Message Timestamps**: See when messages were sent and received.

### Networking Features 🌐
- **Discovery**: Find peers via local network discovery or NAT traversal.
- **Encryption Key Exchange**: Securely exchange encryption keys using Diffie-Hellman or RSA.
- **Connection Quality Monitoring**: Notify users of connection stability.

### Bonus Features (Planned) 🛠️
- **Chat Backup**: Enable local or encrypted file backups.
- **Notifications**: Notify users of new messages even when minimized.
- **Self-Destructing Messages**: Messages that disappear after a set time.

## Tech Stack 🛠️
- **Backend**: Node.js
- **Frontend**: React.js (for a modern web-based interface)
- **Networking**: WebRTC, `socket.io-p2p`
- **Encryption**: `crypto` (Node.js built-in library)

## Project Structure 📂
```
NodeChat/
├── backend/               # Backend server code
├── frontend/              # React-based frontend
├── public/                # Static assets
├── README.md              # Project documentation
├── package.json           # Node.js dependencies
└── .env                   # Environment variables
```

## How It Works 🔧
1. **Connection Establishment**:
   - Uses WebRTC or `socket.io-p2p` for initial connection setup.
2. **Message Transmission**:
   - Messages are encrypted and sent directly over P2P connections.
3. **Encryption**:
   - End-to-end encryption is implemented to secure communication.
4. **User Interface**:
   - A web-based interface displays chats with customization options.

## Demo 📺
_🚧 Demo section will be updated once the MVP is completed._

## Getting Started 🏁

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nodechat.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nodechat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to see NodeChat in action.

## Contributing 🤝
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License 📜
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Stay tuned for updates and improvements! 🚀
