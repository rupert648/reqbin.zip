![Logo](public/logo.png)

# ReqBin.zip

ReqBin.zip is a modern day paste bin designed for a friendlier developer experience.

The app is built on top of the [T3 Stack](https://create.t3.gg/). Making use of nextjs (pages cause I don't like appdir), tailwind, trpc, and prisma. The backend features a basic MySQL database hosted on [Planetscale](https://planetscale.com).

All data stored in this application is encrypted at rest. But this is hardly necessary and came from what the original idea was supposed to be (a whisper like app).

The application is deployed on Vercel.

# Feature List
- [ ] Configure PasteBin timeouts
- [ ] Syntax highlighting (or at least a slightly nicer textbox) - [CodeMirror](https://codemirror.net/) looks fun.
- [ ] textarea focus on page load
- [ ] Copy URL to clipboard on creation
- [ ] Improved mobile view
- [ ] Better error messages (or any at all lol)
- [ ] Slack link preview
- [ ] Raycast create paste bin command (Direct URL to create pastebin)
- [ ] .raw ending to just show the text
