# AI Chatbot - Powered by Google Gemini

A professional, full-stack AI chatbot application built with Next.js and Google Gemini API. This application provides a sleek, modern interface for interacting with AI through text, images, documents, and audio files.

## 🌟 Features

- **Multi-modal AI Interaction**: Chat with AI using text, images, documents, and audio
- **Professional Design**: Modern, responsive UI with Tailwind CSS
- **Real-time Chat**: Smooth, real-time conversation experience
- **File Upload Support**:
  - Images (PNG, JPG, GIF, etc.)
  - Documents (PDF, DOC, DOCX, TXT)
  - Audio files (MP3, WAV, etc.)
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **TypeScript**: Fully typed for better development experience

## 🚀 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: Google Gemini 1.5 Flash API
- **Icons**: Lucide React
- **File Handling**: Built-in file upload and processing

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes for Gemini integration
│   │   ├── generate-text/
│   │   ├── generate-from-image/
│   │   ├── generate-from-document/
│   │   └── generate-from-audio/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/              # Reusable React components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── Header.tsx           # Application header
│   ├── LoadingSpinner.tsx   # Loading animation component
│   └── FileDropzone.tsx     # File upload component
├── lib/
│   └── gemini.ts           # Gemini AI client configuration
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gemini-flash-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Usage

1. **Text Chat**: Type your message and press Enter or click Send
2. **Image Analysis**: Upload an image and ask questions about it
3. **Document Processing**: Upload documents for analysis and summarization
4. **Audio Transcription**: Upload audio files for transcription and analysis
5. **Quick Actions**: Use the suggested prompts for common tasks

## 🔒 API Security

- All API calls are server-side only
- Environment variables are properly secured
- File uploads are processed safely with size limits
- Input validation on all endpoints

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional interface
- **Smooth Animations**: CSS animations for better user experience
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Prepared for dark mode implementation
- **Accessibility**: Following web accessibility guidelines

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers (1920px and above)
- Laptops (1024px - 1919px)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## 🤖 AI Capabilities

### Text Generation

- Natural language conversations
- Question answering
- Content creation
- Code explanation

### Image Analysis

- Object detection and description
- Scene understanding
- Text extraction from images
- Visual question answering

### Document Processing

- Document summarization
- Content extraction
- Analysis and insights
- Format conversion assistance

### Audio Processing

- Speech-to-text transcription
- Audio content analysis
- Language detection
- Audio summarization

## 🔧 Configuration

### Tailwind CSS Customization

The application uses custom Tailwind configuration with:

- Custom color palette
- Animation utilities
- Component classes
- Responsive utilities

### Next.js Configuration

- TypeScript support
- App Router
- API routes
- Environment variable handling

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean
- AWS
- Google Cloud Platform

## 📈 Performance

- **Fast Loading**: Optimized bundles and code splitting
- **Efficient Rendering**: React 18 with concurrent features
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Proper caching strategies implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues
2. Create a new issue with detailed description
3. Provide reproduction steps

## 🔮 Future Enhancements

- [ ] Chat history persistence
- [ ] User authentication
- [ ] Multiple conversation threads
- [ ] Export conversation feature
- [ ] Voice input/output
- [ ] Dark mode toggle
- [ ] Custom AI model selection
- [ ] Collaborative features

---

Built with ❤️ using Next.js and Google Gemini AI
