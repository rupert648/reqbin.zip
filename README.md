![Logo](public/logo.png)

# ReqBin.zip

ReqBin.zip is a modern day paste bin designed for a friendlier developer experience.

The app is built on top of the [T3 Stack](https://create.t3.gg/). Making use of nextjs (pages), tailwind, trpc, and prisma. The backend features a basic <del>MySQL database hosted on [Planetscale](https://planetscale.com)</del> SQLite database hosted on [Turso](https://turso.tech/)

All data stored in this application is encrypted at rest.

The application is deployed on Vercel.

# Getting started

After cloning the repository, install dependencies using your preferred method. By default this project uses yarn.

```
yarn
```

Make a copy of `.env.example`, and populate with your respective environment variables.

```
cp .env.example .env
```

Push the prisma schema to the database.

```
yarn prisma generate # generates your types
yarn prisma db push # Pushes the schema to the local sqlite database
```

Start the development server

```
yarn dev
```

# Contributions

I'm more than happy to accept contributions on this project and would greatly appreciate any ideas! I've created a number of issues in the repo to give you some ideas, but if theres something else you want to build, just create an issue and get going!
I spontaneously come back to this repo so if theres something you want to work on and I'm not responding fast enough just feel free to harass me on [twitter](https://twitter.com/rupert648).

# Notes

Planetscale removed their [free tier](https://planetscale.com/docs/concepts/hobby-plan-deprecation-faq), it was a great option, but its pretty hard to justify $40 a month for a hobby project. Turso offers a generous free tier, and the migration was extremely simple. See [this PR](https://github.com/rupert648/reqbin.zip/pull/9)
