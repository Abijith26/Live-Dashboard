# Live Dashboard

A real-time board built with **Next.js**, **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **Socket.IO**, and **React Query**.

## Features

* Create, update and delete cards
* Move cards between columns
* Real-time updates using Socket.IO
* Optimistic locking using version numbers

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Query
* Axios
* DnD Kit
* Socket.IO Client

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Socket.IO
* Zod

## Project Structure

```
client/
server/
```

## Setup

### Clone

```bash
git clone <repository-url>
```

### Backend

```bash
cd server

npm install
```

Create a `.env` file.

Run Prisma migration:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd client

npm install
```

Create a `.env.local` file.

Start the client:

```bash
npm run dev
```

The application will run at:

```
Frontend
http://localhost:3000

Backend
http://localhost:5000
```

## Environment Variables

### Server

```
DATABASE_URL=

PORT=5000
```

### Client

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Bonus Features Completed

* Optimistic locking
* Version conflict handling (In the backend side)

## Bonus Features Skipped

* Full drag-and-drop reordering within the same column
* Presence


## Future Improvements

* Improve drag-and-drop experience
* Add drag preview (DragOverlay)
* Better error notifications

Frontend

/ - renders the board

Backend

GET - /api/cards -> to fetch all the cards
POST - /api/cards -> to create new cards
PATCH - /api/card/:id -> to update the card title
PATCH - /api/card/:id/move -> to update the card movement
DELETE - /api/card/:id -> to delete the card

Picked Optimistic locking with version field approach to ensure data consistency and to avoid multiple edits by users.
Each time the card is moved or edited, the version field will get incremented and the field value is checked in the server side before making the edit.
If the version field value doesn't match, we will send message saying this item is already changed by other user. refresh the board.
