# Galaxy Learning Computer - Certificate Verification System

A professional certificate verification website for Galaxy Learning Computer Institute. Users can enter their certificate number to instantly verify and view their certificate details.

## 🎯 Features

### Core Functionality
- **Certificate Lookup** - Search by certificate number (format: GLC-YYYY-XXXXXX)
- **Real-time Verification** - Instant validation and status checking
- **Complete Details Display**:
  - Student name and certificate number
  - Course/Program name
  - Issue and expiry dates
  - Grade/Score
  - Course description
  - Verifier information
  - Verification timestamp

### User Interface
- ✨ Modern, professional design with gradient backgrounds
- 📱 Fully responsive (desktop, tablet, mobile)
- ⚡ Smooth animations and transitions
- 🎨 Color-coded status badges (Valid/Expired)
- 🔄 Loading indicators for better UX

### Technical Features
- Pure HTML, CSS, and JavaScript (no dependencies)
- Client-side processing for fast performance
- Beautiful certificate cards with organized information display
- Keyboard support (Enter key to submit)
- Smooth scrolling between sections

## 📋 Sample Certificate Numbers

Test the system with these certificate numbers:

| Certificate Number | Student Name | Status |
|-------------------|-------------|--------|
| GLC-2024-001234 | Raj Kumar | ✓ Valid |
| GLC-2024-001235 | Aisha Patel | ✗ Expired |
| GLC-2024-001236 | Vikram Desai | ✓ Valid |
| GLC-2024-001237 | Neha Gupta | ✗ Expired |
| GLC-2024-001238 | Arjun Malhotra | ✓ Valid |

## 📁 Project Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality and certificate database
└── README.md       # Documentation (this file)
```

## 🚀 Quick Start

### Local Testing
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Enter a certificate number from the sample list above
4. View the certificate details

### Deployment
- **GitHub Pages**: Enable GitHub Pages in repository settings and point to the main branch
- **Web Server**: Upload the files to any web hosting service
- **Docker**: Create a simple Nginx container to serve the files

## 🔧 How It Works

### Current Implementation
- Certificates are stored in `script.js` in the `certificateDatabase` object
- When a user enters a certificate number, the system searches the database
- If found, certificate details are displayed in a formatted card
- Status (Valid/Expired) is determined by comparing expiry date with today's date

### Certificate Database Structure
```javascript
'GLC-2024-001234': {
    studentName: 'Name',
    course: 'Course Name',
    issueDate: 'YYYY-MM-DD',
    expiryDate: 'YYYY-MM-DD',
    grade: 'A+',
    description: 'Course description',
    verifiedBy: 'Verifier Name',
    status: 'valid' // or 'expired'
}
```

## 🔌 Integration Guide

### Connecting to Backend API
To connect to a real certificate database, replace the local database lookup with an API call:

```javascript
// In script.js, modify the setTimeout section:
setTimeout(() => {
    loadingSpinner.classList.add('hidden');
    
    if (!certificateNumber) {
        showError('Please enter a certificate number');
        return;
    }
    
    // Replace with API call:
    fetch(`https://your-api.com/certificates/${certificateNumber}`)
        .then(response => response.json())
        .then(certificate => {
            if (!certificate) {
                showError('Certificate not found.');
                return;
            }
            displayCertificate(certificateNumber, certificate);
        })
        .catch(error => {
            showError('Error verifying certificate. Please try again.');
            console.error(error);
        });
}, 1000);
```

### Adding New Certificates
Simply add entries to the `certificateDatabase` object in `script.js`:

```javascript
'GLC-2024-001239': {
    studentName: 'New Student',
    course: 'New Course',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    grade: 'A',
    description: 'Course description here',
    verifiedBy: 'Instructor Name',
    status: 'valid'
}
```

## 🎨 Customization

### Color Scheme
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Change this */
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    --error-color: #ef4444;
    /* ... other colors */
}
```

### Institute Name & Branding
Update in `index.html`:
- Header title: `<h1>🎓 Galaxy Learning Computer</h1>`
- Subtitle: `<p>Certificate Verification System</p>`
- Footer: `&copy; 2026 Galaxy Learning Computer Institute`

### Certificate Format
Modify the certificate format in `index.html` details-grid section to add/remove fields as needed.

## 📊 Data Privacy & Security

⚠️ **Important**: This is a public verification system. Do not store sensitive personal information beyond what's necessary for verification. Consider:

- Using HTTPS in production
- Implementing rate limiting
- Adding certificate PIN verification for additional security
- Storing sensitive data securely on the backend, not in frontend code

## 🔐 Security Considerations

- Current implementation uses client-side database (only for demo)
- For production: Use backend API with database encryption
- Implement certificate PIN or additional verification methods
- Use HTTPS only
- Consider CORS restrictions
- Implement rate limiting on API endpoints
- Add audit logging for certificate verification requests

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Certificate Not Found
- Check the certificate number format: `GLC-YYYY-XXXXXX`
- Verify the number matches exactly (case-insensitive)
- Ensure the certificate exists in the database

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Ensure `styles.css` is in the same directory as `index.html`

### JavaScript Not Working
- Check browser console for errors (F12 or Cmd+Option+J)
- Ensure `script.js` is in the same directory as `index.html`
- Verify JavaScript is enabled in browser

## 📈 Future Enhancements

- [ ] Add certificate download/print functionality
- [ ] Implement QR code scanning
- [ ] Add multi-language support
- [ ] Create admin panel for certificate management
- [ ] Add email verification option
- [ ] Implement certificate renewal system
- [ ] Add analytics dashboard
- [ ] Create API documentation

## 📝 License

Galaxy Learning Computer Institute - Certificate Verification System
© 2026 All rights reserved.

## 📞 Support

For issues or feature requests, please create an issue in the GitHub repository.

---

**Last Updated**: May 14, 2026
**Version**: 1.0.0
