<h1 align="center">🤝 Contributing</h1>

## 📋 Prerequisites

- `Node.js` (v18+)
- `pnpm`

## 🚀 Installation & Development

```bash
# Clone the repository
git clone https://github.com/kratiuk/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
pnpm install
```

```bash
# Start development server
pnpm dev
```

```bash
# Build for production
pnpm build
```

```bash
# Preview production build
pnpm preview
```

## ✍️ Commits

Use Conventional Commits format:

```
type(scope): description
```

## ✅ Linting

Pre-commit hook runs `pnpm lint` automatically. Ensure linting passes before committing

## 🚀 Release

To create a release, push a version tag without `v` prefix (this prevents an infinite loop in CI, and ensures the final v-prefixed tag is created by the bot, so the release belongs to the bot):

```bash
# Update version in package.json, then:
git add -A
git commit -m "chore(release): X.X.X"
git push origin master

# Create and push the tag
git tag X.X.X
git push origin X.X.X
```

The CI/CD pipeline will automatically:

- Transform the tag (`X.X.X` → `vX.X.X`)
- Build the project
- Deploy to server at [kratiuk.me](https://kratiuk.me)
