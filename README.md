# Fullstack Blog Application

Welcome to the My Blog project! The application will feature fetching and displaying posts on the home page, detailed post views, user authentication, and post editing capabilities.

## Features

- **Home Page:**
  - Fetch all posts from the database.
  
- **Post Details:**
  - Fetch detailed information about a specific post.
  - Retrieve information about the post's author using Mongoose's populate function.
  
- **Authentication:**
  - Implemented user registration and login functionality.
  - Used JSON Web Tokens (JWT) for authentication.

- **Authorization:**
  - Allow only the author of a post to edit their own posts.

- **Post Editing:**
  - Edit post title, summary, cover image, and content.
  - Use the Rich Text Editor for content editing.
  - Implement simple image upload functionality.

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Mongoose
- JSON Web Tokens (JWT)
- Ridge Editor (for content editing)
- React Context
- CSS

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mynstack-blog.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mynstack-blog
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up MongoDB and configure the connection in the Node.js backend.

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to explore the Blog Application.

## Contributing

We welcome contributions to improve and expand the Mynstack Blog Application. To contribute, follow these steps:

1. Fork the project.
2. Create a new branch for your feature: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.


## Contact

For any inquiries or support, please contact hrutuselar@gmail.com.
