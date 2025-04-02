# Fixed Bugs

✅ Total Words And Avg Words counts is wrong on the dashboard. i created two articles of 1200 and 1000 word wount. It says 012001000 Total Words and 6000500 Avg. Words/Post
- Fixed by converting word counts to numbers before summing and using toLocaleString() for formatting

✅ clicking on the edit button in the dashboard doesn't direct to the edit screen but preview screen.
- Fixed by creating a dedicated 'edit' view mode in App.tsx and updating the Dashboard component to properly navigate to it

✅ the edit screen is to small, only 3 row are visible
- Fixed by increasing the textarea height to min-h-[500px] and making it resizable vertically

✅ the view screen doesn't show html formatted text but the raw md text.
- Fixed by ensuring HtmlPreview is used for formatted view and MarkdownPreview for markdown view

✅ Raw html button shows raw md text
- Fixed by improving the view mode cycling logic in BlogPreview component

# Current Issues
- None

# Feature Requests
- Add more statistics on the dashboard
- Improve HTML formatting options
- Add export functionality
