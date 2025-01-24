# NodeChat (WIP)

NodeChat is a peer-to-peer (P2P) chat application built using Node.js. It provides direct and secure communication between users with a sleek and user-friendly web interface, ensuring privacy and simplicity for seamless interaction.

## Features 🎯

### Core Features 🚀
- **Direct Peer-to-Peer Messaging**: Messages are sent directly between users without a central server.
- **Secure Communication**: End-to-end encryption ensures all messages are private and protected.
- **Message Delivery**: Real-time message exchange without relying on server storage.

### Enhanced Features 🌟
- **Custom Usernames**: Users can set unique usernames for personalization.
- **Status Indicators**: Show online, offline, and typing statuses for better engagement.

### UI/UX Features 🎨
- **Clean and Modern Interface**: Intuitive design for a seamless user experience.
- **Customizable Themes**: Choose or create custom color themes.
- **Message Timestamps**: Clearly display when messages were sent and received.

### Networking Features 🌐
- **Peer Discovery**: Locate peers through local network discovery or signaling servers.
- **Encryption Key Exchange**: Securely exchange encryption keys using Diffie-Hellman or RSA.
- **Connection Quality Monitoring**: Notify users about the stability of their connection.

### Future Enhancements 🛠️
- **Notifications**: Alert users of new messages even when the app is minimized.
- **Self-Destructing Messages**: Allow messages to disappear after a set duration.
- **Chat Analytics**: Provide insights into user activity and engagement.

## Tech Stack 🛠️
- **Backend**: Node.js
- **Frontend**: React.js (modern web interface styled with Tailwind CSS)
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
1. **Connection Setup**:
   - WebRTC or `socket.io-p2p` initializes the peer-to-peer connection.
   - This will be the last part of the project that gets complete, for now we are just doing it all on the server.
   - A signaling server facilitates the initial connection.
2. **Messaging**:
   - Messages are encrypted and sent directly between peers.
   - Message delivery is immediate with no server storage.
3. **Encryption**:
   - AES-256 secures all messages with secure key exchange protocols.
4. **User Experience**:
   - Users interact with a web-based interface featuring customizable themes, status indicators, and more.

## Demo 📺
_🚧 Demo section will be updated once the MVP is completed._

## Getting Started 🏁

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/EthanPassino/NodeChat
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
