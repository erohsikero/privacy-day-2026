# Expose-IF: Image Privacy Checker

<div align="center">
  <h3>🔒 Your pictures expose your location</h3>
  <p>A privacy-first tool to analyze EXIF metadata in your photos</p>
  <p><strong>Built for Data Privacy Day 2026</strong></p>
</div>

---

## 📋 Overview

**Expose-IF** is a web-based image privacy checker that reveals the hidden metadata embedded in your photos. Every photo you take contains invisible "EXIF" data that can reveal:

- 📍 **GPS coordinates** (exact location where the photo was taken)
- 📷 **Camera details** (make, model, settings)
- 📅 **Timestamps** (when the photo was captured)
- 💻 **Device information** (software used to process the image)

This tool helps raise awareness about digital privacy by showing exactly what information is embedded in your images—all processed locally in your browser. **Nothing is uploaded to any server.**

## ✨ Features

- 🔍 **Comprehensive EXIF Analysis**: Extract GPS coordinates, camera settings, timestamps, and more
- 🗺️ **Interactive Map Display**: Visualize exact photo locations on Google Maps
- 🔒 **100% Private**: All processing happens locally in your browser—no data leaves your device
- 📱 **Multi-Format Support**: Works with JPEG, PNG, and HEIC/HEIF files
- ⚠️ **Privacy Warnings**: Clear indicators when location data is detected
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- ⚡ **Fast & Lightweight**: Built with Vite for optimal performance

## 🛡️ Privacy & Security

**Your privacy is our priority:**

- ✅ All image processing happens **locally in your browser**
- ✅ **No server uploads**—your photos never leave your device
- ✅ **No tracking** or analytics
- ✅ **No data storage**—everything is processed in real-time
- ✅ **Open source**—you can verify the code yourself

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher (20.19.0+ recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erohsikero/privacy-day-2026.git
   cd privacy-day-2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Upload an image to see its metadata

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

1. **Upload an Image**: Click "Check Your Photo" and select an image file (JPEG, PNG, or HEIC)
2. **View Results**: The tool will display:
   - Image preview
   - GPS location on an interactive map (if available)
   - Camera information (make, model, settings)
   - Timestamp data
   - Privacy warnings if location data is detected
3. **Learn More**: Scroll down to read about why metadata privacy matters

## 🏗️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Language**: TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **EXIF Parsing**: ExifReader
- **HEIC Support**: heic2any

## 📁 Project Structure

```
privacy-day-2026/
├── components/
│   ├── Layout.tsx          # Main layout with header and footer
│   └── MetadataResult.tsx   # Results display component
├── services/
│   └── exifService.ts       # EXIF metadata parsing logic
├── public/
│   └── logo.svg            # CCI logo
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
├── types.ts                # TypeScript type definitions
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Key Components

### EXIF Service (`services/exifService.ts`)
- Parses EXIF metadata from image files
- Extracts GPS coordinates with proper reference handling
- Retrieves camera settings and timestamps

### Metadata Result (`components/MetadataResult.tsx`)
- Displays parsed metadata in an organized layout
- Shows interactive map for GPS coordinates
- Provides privacy warnings and safety indicators

### Layout (`components/Layout.tsx`)
- Responsive header with navigation
- Footer with resources and information
- Consistent styling across the application

## 🔍 What is EXIF Data?

**EXIF** (Exchangeable Image File Format) is metadata automatically embedded in photos by digital cameras and smartphones. This data includes:

- **Location**: GPS coordinates (if location services are enabled)
- **Camera Settings**: ISO, aperture, shutter speed, focal length
- **Device Info**: Camera make and model
- **Timestamps**: Date and time the photo was taken
- **Software**: Editing software used (if applicable)

### Why Should You Care?

When you share photos online or send them via email, this metadata travels with the image. This can reveal:
- Your home address
- Places you frequently visit
- Your daily routine
- Device fingerprints that can link multiple photos

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Contributing

Contributions are welcome! This project was built for Data Privacy Day 2026 to raise awareness about image metadata privacy.

## 📚 Resources

- [Data Privacy Day Official](https://staysafeonline.org/data-privacy-day/)
- [EXIF Data Explained](https://en.wikipedia.org/wiki/Exif)
- [How to Remove Metadata from Photos](https://www.lifewire.com/how-to-remove-exif-data-from-photos-4587874)

## 📝 License

ISC License

## 🙏 Acknowledgments

Built for **Data Privacy Day 2026** to promote digital privacy awareness.

Inspired by Durham Cybersecurity Innovation and the importance of understanding what data we share.

---

<div align="center">
  <p><strong>🔒 Privacy First • 🚀 Built with React • ⚡ Powered by Vite</strong></p>
  <p>© 2026 Expose-IF Tooling. Built for Data Privacy Awareness.</p>
</div>
