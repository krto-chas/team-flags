# Team Flags EDU - DevSecOps Learning Platform

> **Educational version** of the Team Flags platform, designed for learning Docker, CI/CD, and DevSecOps practices.

A Next.js application showcasing modern DevSecOps workflows. This project is used by students at Chas Academy to learn containerization, security scanning, and deployment automation.

## 🎯 What You'll Learn

- 🐳 **Docker**: Multi-stage builds, security best practices, image optimization
- 🔄 **CI/CD**: Automated builds, testing, and deployments
- 🔒 **Security**: Container scanning, vulnerability management, SBOM generation
- ☸️ **Kubernetes**: Container orchestration, policies, monitoring
- 📊 **Observability**: Logging, metrics, alerting

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker Desktop (for containerization)
- MongoDB Atlas account (free tier works!)

### Local Development (Without Docker)

```bash
# 1. Fork this repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/team-flags-edu.git
cd team-flags-edu

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB connection string

# 5. Run the development server
npm run dev

# 6. Open http://localhost:3000
```

### Running with Docker (Recommended for Week 2+)

```bash
# 1. Build the Docker image
docker build -t team-flags:v1 .

# 2. Run the container
docker run -p 3000:3000 \
  -e MONGODB_URI="your-connection-string" \
  -e MONGODB_DB="team-flags-edu" \
  team-flags:v1

# 3. Open http://localhost:3000
```

## 📚 Project Structure

```
team-flags-edu/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # Database connection
│   └── types.ts           # TypeScript types
├── public/                # Static assets
├── Dockerfile             # Production-grade container definition
├── .dockerignore          # Files to exclude from Docker build
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🐳 Docker Best Practices Demonstrated

This Dockerfile showcases production-ready patterns:

1. **Multi-stage builds** - Separate build and runtime stages
2. **Minimal base images** - Using Alpine Linux for smaller size
3. **Non-root user** - Running as `nextjs` user for security
4. **Layer caching** - Optimized layer order for faster builds
5. **`.dockerignore`** - Excluding unnecessary files
6. **Production optimizations** - Environment variables and build settings

## 🔒 Security Features

- [ ] Non-root container user
- [ ] Minimal attack surface (Alpine base)
- [ ] No secrets in image (environment variables only)
- [ ] Dependency vulnerability scanning ready
- [ ] SBOM generation compatible

## 📖 Learning Path

### Week 2: Container Basics
- [✅] Fork this repository
- [✅] Run locally without Docker
- [✅] Write your first Dockerfile (use ours as reference)
- [✅] Build and run a Docker container
- [✅] Understand multi-stage builds

### Week 3-4: CI/CD Pipeline
- [ ] Set up GitHub Actions
- [ ] Automate Docker builds
- [ ] Add linting and testing
- [ ] Deploy to a container registry

### Week 5-6: Security Integration
- [ ] Add Trivy container scanning
- [ ] Implement dependency checks
- [ ] Generate SBOM
- [ ] Configure security gates

### Week 7-8: Kubernetes Deployment
- [ ] Create Kubernetes manifests
- [ ] Deploy to local cluster (kind/minikube)
- [ ] Implement OPA Gatekeeper policies
- [ ] Set up runtime security (Falco)

### Week 9-10: SRE & Operations
- [ ] Define SLIs/SLOs
- [ ] Set up monitoring and alerting
- [ ] Write runbooks
- [ ] Practice incident response

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Docker
docker build -t team-flags .                    # Build image
docker run -p 3000:3000 team-flags              # Run container
docker ps                                        # List running containers
docker logs <container-id>                      # View logs
docker exec -it <container-id> sh              # Shell into container
docker stop <container-id>                      # Stop container

# Clean up
docker system prune -a   # Remove all unused containers, images, networks
```

## 🤝 Contributing

This is an educational project! Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests
- Use it for learning

## 📝 License

MIT License - see [LICENSE](LICENSE) file

Copyright (c) 2026 Retro 87

## 🎓 Credits

Created for [Chas Academy](https://chasacademy.se/) - IT- och Cybersäkerhetstekniker program

**For commercial licensing or the full-featured platform, contact Retro 87.**

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OWASP Docker Security](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)

---

Happy learning! 🚀
