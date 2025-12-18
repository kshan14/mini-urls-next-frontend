This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Getting Started

# Demo Video

[![Demo Video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/ToUp9gbN5_Y)

## TLDR: Run the entire frontend + backend as docker compose

## Local Development Setup

If you want to run this project locally as containers, follow the steps below:

1. Start the dependencies using Docker Compose:
   ```bash
   docker-compose up -d
   ```

---

## Setting Up the Initial Admin User

Once the containers are up and running, you can connect to the Postgres database using your preferred SQL client.

**Database connection details**:

- Database name: mini_url
- Username: postgres
- Password: admin

After connecting, run the following **SQL** command to create the initial admin user account:

```bash
INSERT INTO public."Users" ("Id", "Email", "Username", "Password", "Role") VALUES
('0199b46b-2762-7c8d-aa1e-91363a2c59b9'::uuid, 'admin@gmail.com', 'admin',
'$2a$11$jxARUCXQeHjG0D3V1K./A.sf8Vh4jZxccp0hL.mN1HmlGkTo98KrW', 'Admin');
```

### Accessing the UI

Now the UI is running at http://localhost:3000/app

### Application Admin User credentials (You can use this admin account to APPROVE or REJECT user urls)

- Username: admin
- Password: admin

---

## Environment Variables Configuration

This document describes the environment variables required for the application.

## Required Variables

### `API_BASE_URL`

- **Description**: The base URL for the API server
- **Default Value**: `http://localhost:8080`
- **Example**: `http://localhost:8080`
- **Usage**: Used for making HTTP requests to the backend API

### `JWT_SECRET_KEY`

- **Description**: Secret key used for signing and verifying JWT tokens
- **Default Value**: `"N2JGNCRtQHZKcFpuOCtlWHkkUjEqdUt3RzJjUWhBXnE1b0wjVDlpSzZlQg=="`
- **Security Note**:
  - This is a sensitive value that should be kept secure
  - In production, use a strong, randomly generated secret key
  - Never commit actual secret keys to version control

### `WS_BASE_URL`

- **Description**: WebSocket base URL for real-time communication
- **Default Value**: `ws://localhost:8080/api/miniurls/ws`
- **Example**: `ws://localhost:8080/api/miniurls/ws`
- **Usage**: Used for establishing WebSocket connections for real-time features

## Environment Setup

### Development

Create a `.env` file in the root directory with the following content:

```env
API_BASE_URL=http://localhost:8080
JWT_SECRET_KEY="N2JGNCRtQHZKcFpuOCtlWHkkUjEqdUt3RzJjUWhBXnE1b0wjVDlpSzZlQg=="
WS_BASE_URL=ws://localhost:8080/api/miniurls/ws
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
