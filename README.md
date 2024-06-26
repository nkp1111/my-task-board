# My Task Board

This project is about creating tasks, adding steps to completion, finding task and their completion done by others.

## Table of Contents

- [Features](#features)
- [Technology](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)
- [Contact](#contact)

## Links

- [github link](https://github.com/nkp1111/my-task-board)
- [live server link](https://my-task-board-two.vercel.app/)

## Features

- jwt based authentication.
- Daisy UI for consistent, pre-build styling based on tailwind css.
- CRUD with tasks
- saving tasks in database(mongodb) for users

### Screenshot

![image](./public/assets/Screenshot%202024-05-19%20202859.png)

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- DaisyUI
- Jsonwebtoken
- mongoose
- mongo db
- react-toastify
- bcrypt
- zod

## Installation

Instructions on how to install and set up your project locally.

```bash
# Clone the repository
git clone https://github.com/nkp1111/my-task-board.git

# Navigate to the project directory
cd my-task-board

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Usage

- Sign in to create account.
- Able to save your tasks.
- And access them with your username and password.

## Folder Structure

```
my-task-board/
│
├── app/                 # React pages
│     ├── auth/          # React pages(for authentication)
├── components/          # React components
├── config               # config file(db connection)
├── constant             # constant data 
├── lib/                 # functions defined here 
├── models               # db schema 
├── public/              # Public assets
├── types                # types definition(used throughout code) defined here
├── .gitignore           # Git ignore file
├── package.json         # NPM package configuration
├── README.md            # Project documentation
├── tailwind.config.ts   # tailwind configuration
└── LICENSE              # Project license doc

```

## License

- This project is licensed under the [MIT License](https://opensource.org/license/mit).

## Contact

- Neeraj Parmar
- GitHub [nkp1111](https://github.com/nkp1111)
- LinkedIn [neeraj](https://www.linkedin.com/in/neeraj-parmar-058591244/)
- Twitter [@nkp11111507](https://twitter.com/@nkp11111507)
