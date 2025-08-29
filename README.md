# TruthNode

A modern web application built with React, TypeScript, and Express, featuring a decentralized approach to truth verification and content management using blockchain technology and IPFS for immutable data storage.

## 🚀 Features

- Modern React-based frontend with TypeScript
- Express.js backend server
- Tailwind CSS for styling
- Type-safe database operations with Drizzle ORM
- Real-time WebSocket communication
- Authentication and session management
- Responsive and accessible UI components
- Dark mode support
- **Blockchain Integration:**
  - Smart contract-based truth verification
  - Decentralized content validation
  - Immutable record keeping
  - Token-based incentives
- **IPFS Integration:**
  - Decentralized file storage
  - Content addressing
  - Immutable data storage
  - Distributed content delivery

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI Components
  - React Query
  - React Hook Form
  - ethers.js for blockchain interaction

- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - Drizzle ORM
  - WebSocket
  - IPFS client

- **Blockchain:**
  - Ethereum/Smart Contracts
  - Web3.js/ethers.js
  - IPFS for decentralized storage
  - Token standards (ERC-20/ERC-721)

- **Database:**
  - PostgreSQL (via Neon Serverless)
  - IPFS for immutable data

- **Authentication:**
  - Passport.js
  - Express Session
  - Web3 wallet authentication

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL database
- IPFS node (local or remote)
- Web3 wallet (MetaMask or similar)
- Access to Ethereum network (Mainnet/Testnet)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd DecentralizedTruth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables:
     - Blockchain network configuration
     - IPFS node connection details
     - Smart contract addresses
     - Database credentials

4. **Set up IPFS**
   ```bash
   # Install IPFS CLI
   npm install -g ipfs
   # Initialize IPFS
   ipfs init
   # Start IPFS daemon
   ipfs daemon
   ```

5. **Deploy Smart Contracts**
   ```bash
   # Compile contracts
   npm run compile:contracts
   # Deploy to network
   npm run deploy:contracts
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
DecentralizedTruth/
├── client/           # Frontend React application
├── server/           # Backend Express server
├── shared/           # Shared types and utilities
├── contracts/        # Smart contracts
├── ipfs/            # IPFS configuration and utilities
├── assets/          # Static assets
└── dist/            # Production build output
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check the project
- `npm run db:push` - Push database schema changes
- `npm run compile:contracts` - Compile smart contracts
- `npm run deploy:contracts` - Deploy smart contracts
- `npm run ipfs:start` - Start IPFS daemon

## 🔒 Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption secret
- `NODE_ENV` - Environment (development/production)
- `IPFS_API_URL` - IPFS API endpoint
- `IPFS_GATEWAY_URL` - IPFS gateway URL
- `BLOCKCHAIN_NETWORK` - Ethereum network (mainnet/testnet)
- `CONTRACT_ADDRESS` - Deployed smart contract address
- `PRIVATE_KEY` - Wallet private key for contract deployment

## 📚 Documentation

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [ethers.js Documentation](https://docs.ethers.org/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible UI components
- [Drizzle ORM](https://orm.drizzle.team/) for the type-safe database operations
- [IPFS](https://ipfs.tech/) for decentralized storage
- [Ethereum](https://ethereum.org/) for blockchain infrastructure
- [ethers.js](https://docs.ethers.org/) for blockchain interaction
