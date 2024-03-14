## Trello Clone: A Feature-Rich Project Management Tool (Next.js)

**Tech Stack:**

- **Frontend:** Next.js, React 18, ShadcnUI, TailwindCSS

- **Backend:** MySQL DB, Prisma ORM

- **Extras:** Stripe, Unsplash API, Clerk, @tanstack/react-query, Zod (data validation), zustand (state management), Lodash (utility library)

**Key Functionalities:**

- **Secure User Management:** Integrated Clerk.dev for robust user authentication and authorization.

- **Organizational Structure:** Create and manage organizations/workspaces for efficient team collaboration.

- **Advanced Board Features:** Create, rename, delete, and reorder boards with ease. Personalize boards with beautiful cover images.

- **Comprehensive Activity Tracking:** Maintain a transparent activity log for the entire organization.

- **Flexible List & Card Management:** Create, manage, drag & drop, and copy lists and cards for optimized workflows. Each card has its own activity log.

- **Scalability and Control:** Board limits per organization promote responsible use in the free tier. Stripe subscription unlocks unlimited boards for large teams.

- **User-Friendly Interface:** Leverage ShadcnUI and Tailwind CSS for a visually appealing and responsive UI.

**Beyond Functionality:**

This project goes beyond replicating Trello. It demonstrates my ability to:

- **Blend Creativity with Technical Skills:** Implement intricate features seamlessly.

- **Prioritize User Experience:** Design a delightful and user-friendly interface.

- **Work with a Robust Tech Stack:** Utilize best-in-class tools for efficient development.

### Cloning the repository

```shell
git clone https://github.com/AldinRekic/taskmagnet.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

STRIPE_API_KEY=

NEXT_PUBLIC_APP_URL=

STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma

Add PostgreSQL Database (I used Supabase)

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
