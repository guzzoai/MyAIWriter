## 🧠 Prompt: Build an Affiliate Blog Generator App (MyWriter)

```text
Build a modern web app called **MyWriter** that helps users generate high-quality, SEO-optimized blog posts for affiliate marketing using the Gemini Pro 2.5 model via the OpenRouter API.

---

### 🧩 App Functionality:

The app should include:
1. A **form interface** where users input the following fields:
   - Blog Post Topic (text)
   - Target Keyword (text)
   - Word Count (number)
   - Additional Context (textarea)
   - Article Type (dropdown: Informational, Listicle, How-To Guide, Anecdote, Story)
   - Tone (dropdown: Professional, Conversational, Friendly, Authoritative, Casual)
   - Intended Audience (text)
   - Toggles (boolean switches) for:
     - First Person (use “I”)
     - Include Stories & Examples
     - Add a Hook
     - Add Interactive HTML Element

2. A **“Generate” button** that triggers an API call to Gemini Pro 2.5 using OpenRouter (API key provided).

3. Use the dynamic form data to construct a blog generation prompt (as specified below) and send it to the Gemini API.

4. On successful response, **display the blog post in a dashboard preview**, where the user can:
   - View the generated blog post
   - Edit the content inline
   - Delete or regenerate posts

---

### 🔌 API Integration:

- Use `https://openrouter.ai/api/v1/chat/completions`
- Model: `google/gemini-pro`
- Use Bearer token from stored user API key
- POST request should send the blog prompt in the `messages` array as a system/user message

---

### 💡 Prompt Logic (passed to Gemini):

Use this template to construct the system prompt dynamically:

```
You are an expert SEO content writer specialized in affiliate marketing. Your task is to write a long-form, high-quality blog post optimized for Google SEO and affiliate link conversion.

Topic: {blog_topic}  
Target Keyword: {target_keyword}  
Word Count: {word_count}  
Additional Context: {additional_context}  
Article Type: {article_type}  
Tone: {tone}  
Intended Audience: {intended_audience}  
Use First Person: {first_person}  
Include Stories: {stories}  
Hook: {hook}  
Interactive HTML Element: {html_enabled}

Follow a structure with an engaging intro, well-structured body with subheadings, and a strong CTA conclusion. Include product comparisons, tips, and relevant CTAs for affiliate offers. Write in a clear, human tone, ready to publish.
```

---

### 🎨 UI Design:

- Clean, responsive layout (TailwindCSS or similar)
- Form in a card layout with fields on the left
- Output preview on the right
- Generated articles stored in a "Your Posts" section with edit/delete options

---

### 🧠 Tech Stack Suggestions (if relevant):

- Frontend: React, Next.js or Vue
- Backend: Node.js/Express or no backend (client-side fetch if safe)
- Auth (optional): API key input stored in localStorage
- Styling: TailwindCSS

---

Write and create with a clear outline and phases. 
```

