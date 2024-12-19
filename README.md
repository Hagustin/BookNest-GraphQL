# 📚 BookNest - GraphQL Book Search App

Welcome to **BookNest**, a full-stack web application that allows users to search for books, save their favorite titles, and manage personal reading lists. This project is built using modern technologies like GraphQL, Apollo Client, Express.js, MongoDB, and React.

---

## 🚀 Live Demo
🔗 [Live App on Render](#)

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Apollo Client, React Bootstrap
- **Backend:** Node.js, Express.js, Apollo Server, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **API Integration:** Google Books API

---

## 🎯 Features

✅ User Authentication (Signup/Login)  
✅ Search for Books using Google Books API 📚  
✅ Save Favorite Books 📖  
✅ Remove Saved Books ❌  
✅ Responsive Design for Mobile and Desktop 📱💻

---

## 📂 Folder Structure

```
📁 client   -> Frontend (React)
📁 server   -> Backend (GraphQL + MongoDB)
```

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Hagustin/BookNest-GraphQL.git
   cd booknest-graphql
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd server && npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   JWT_SECRET_KEY=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/booknest
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

4. Run the application:
   ```bash
   cd server && npm run dev
   cd client && npm start
   ```

---

## 📖 API Endpoints

### GraphQL Queries & Mutations

- `GET_ME` - Retrieve user data.
- `LOGIN_USER` - Authenticate a user.
- `ADD_USER` - Register a new user.
- `SAVE_BOOK` - Save a book to the user's account.
- `REMOVE_BOOK` - Remove a saved book.

---

## 🧪 Testing and Deployment

- **Testing:** Use Apollo Client DevTools and Insomnia for API testing.
- **Deployment:** Deployed on [Render](https://render.com).

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 📜 License

This project is licensed under the MIT License.

---

## ✨ Acknowledgments

- Google Books API for book data 📚
- React Bootstrap for UI components 🎨
- Apollo Client & Server for GraphQL integration 🚀

---

## 📬 Contact

For questions or collaboration, reach out at [your-email@example.com].

---

🎉 Thank you for visiting **BookNest**! Happy reading! 📖✨

