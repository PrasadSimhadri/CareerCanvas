# BuildUrSite - Premium Portfolio Builder

BuildUrSite is a high-performance, user-friendly platform designed for developers and students to create stunning, professional portfolio websites in minutes. In today’s competitive job market, a resume isn't enough; BuildUrSite provides the digital presence you need to stand out.

![BuildUrSite Logo](https://buildursite.vercel.app/logo.png)

## 🚀 Key Features

- **5 Elite Templates**: Choose from 5 top-tier, fully responsive designs (Minimal, Creative, Sidebar, Futuristic, and Sleek).
- **Placement Ready**: Designed specifically to help students and developers catch the eye of recruiters with professional aesthetics.
- **Zero Friction**: Skip the boilerplate and CSS headaches. Just pick a template, add your details, and your site is live.
- **Modern UI/UX**: Ultra-smooth animations powered by Framer Motion, glassmorphism, and sleek dark modes.
- **High Performance**: Built with the latest Next.js 16 and React 19 for blazing-fast speed and SEO optimization.
- **Secure & Reliable**: Robust data management with MongoDB and secure social login via Google OAuth.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Media**: [Cloudinary](https://cloudinary.com/) for optimized image hosting
- **Authentication**: Google OAuth and JWT
- **Communication**: [Nodemailer](https://nodemailer.com/) for automated emails

## 📦 Project Structure

```bash
├── src/
│   ├── app/          # Next.js App Router (Pages & API)
│   ├── components/   # UI & Template components (Reusable parts)
│   ├── contexts/     # Auth & Theme context providers
│   ├── lib/          # Utilities, mailer, and Cloudinary config
│   ├── models/       # Database schemas (User, Portfolio)
│   └── styles/       # Global CSS & Tailwind configuration
├── public/           # Static assets & logos
└── .env.example      # Environment variables template
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v20 or higher recommended)
- MongoDB Atlas account
- Cloudinary account
- Google Cloud Console project (for OAuth)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd careercanvas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Authentication
   JWT_SECRET=your_super_secret_key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

   # App Config
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your application.

## 📄 License

This project is licensed under the MIT License. Built for developers, by developers.
