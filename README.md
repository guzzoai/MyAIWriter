# MyWriter - Affiliate Blog Generator App

A modern web application that helps users generate high-quality, SEO-optimized blog posts for affiliate marketing using the Gemini Pro 2.5 model via the OpenRouter API.

## Features

- Form interface for configuring blog generation parameters
- Integration with OpenRouter API to access Gemini Pro 2.5 model
- Dashboard preview for viewing, editing, and managing generated blog posts
- Local storage for API key management
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (16.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mywriter.git
cd mywriter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Obtain an API key from [OpenRouter](https://openrouter.ai/)
2. Enter your API key in the header section and click "Save Key"
3. Fill out the blog post form with your desired parameters:
   - Blog Post Topic
   - Target Keyword
   - Word Count
   - Additional Context
   - Article Type
   - Tone
   - Intended Audience
   - Toggle options (First Person, Stories, Hook, Interactive HTML)
4. Click "Generate Blog Post" to create your content
5. View, edit, or delete your generated posts in the preview section

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- OpenRouter API

## License

This project is licensed under the MIT License - see the LICENSE file for details. 