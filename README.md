# URL Shortener

## Technologies

- Next JS
- TypeScript
- MySQL
- Prisma
- Zod
- Tailwind CSS

## Run Locally

Clone the project

```bash
  git clone https://github.com/asif-jalil/url-shortener.git
```

Go to the project directory

```bash
  cd url-shortener
```

Install dependencies

```bash
  npm install
```

Copy `.env.example` to `.env` and fill credential

Generate prisma instance

```bash
  npx prisma generate
```

Prepare database

```bash
 npm run db:baseline
```

Start the server

```bash
  npm run dev
```

## How to

- Build for production : `npm run build:prod`
- Run production : `npm start`
- Check linting: `npm run lint`
- Formatting: `npm run format`
- Type checking: `npm run typecheck`

## Summary: Unique ID Generation and Uniqueness

#### Key Features of the getUniqueId Function

1. **Custom Alphabet:** Uses a 64-character urlAlphabet (Base64-like) for ID generation.
2. **Cryptographic Randomness:** Ensures robust randomness via crypto.getRandomValues, making IDs hard to predict and secure.
3. **Random Byte Pool:** Optimizes performance by reusing a prefilled pool of random bytes, reducing overhead for frequent ID generation.

#### Uniqueness Analysis

- **Total Possible IDs:**

  - **Size 6 (Default):** 64^6 = 68.7 billion unique IDs.

- **Collision Probability:**

  - For 𝑁 = 68.7 billion (size 6):
    - Generating 1 million IDs: ~0.73% chance of collision.
    - Generating 10 million IDs: ~71.7% chance of collision.

- **Practical Implications:**

  - **Size 6:** Suitable for small systems generating up to a few hundred thousand IDs.
  - **Size 8:** Ideal for large-scale systems with negligible collision probability.

- **Handling Collisions:**
  - In critical systems, ensure uniqueness by checking generated IDs in a database or combining random IDs with timestamps or contextual data.
