
import ExifReader from 'exifreader';
import { ExifData } from '../types';

export const parseExif = async (file: File): Promise<ExifData> => {
  try {
    const tags = await ExifReader.load(file);
    
    // helper to get string values
    const getVal = (tag: string) => tags[tag]?.description || tags[tag]?.value;

    /**
     * Robust decimal coordinate extraction.
     * ExifReader's 'description' for GPS tags is usually a string representing the decimal degree.
     * However, we must verify the sign against the Reference tags (N/S/E/W).
     */
    const getDecimal = (coordTag: any, refTag: any) => {
      if (!coordTag || !coordTag.description) return undefined;
      
      let val = parseFloat(coordTag.description);
      if (isNaN(val)) return undefined;

      // Normalize reference (e.g., "W", "West", "S", "South")
      const refStr = (refTag?.description || refTag?.value?.[0] || "").toString().toUpperCase();
      
      // Check if it's South or West. We check the first character to handle both 'W' and 'West'.
      const isNegativeRef = refStr.startsWith('S') || refStr.startsWith('W');
      const isPositiveRef = refStr.startsWith('N') || refStr.startsWith('E');

      if (isNegativeRef) {
        // Force negative
        return -Math.abs(val);
      } else if (isPositiveRef) {
        // Force positive
        return Math.abs(val);
      }

      return val;
    };

    const lat = getDecimal(tags['GPSLatitude'], tags['GPSLatitudeRef']);
    const lon = getDecimal(tags['GPSLongitude'], tags['GPSLongitudeRef']);

    const data: ExifData = {
      make: getVal('Make')?.toString(),
      model: getVal('Model')?.toString(),
      software: getVal('Software')?.toString(),
      dateTime: getVal('DateTime')?.toString() || getVal('DateTimeOriginal')?.toString(),
      exposureTime: getVal('ExposureTime')?.toString(),
      fNumber: getVal('FNumber')?.toString(),
      iso: getVal('ISOSpeedRatings')?.toString(),
      focalLength: getVal('FocalLength')?.toString(),
      latitude: lat,
      longitude: lon,
      altitude: getVal('GPSAltitude')?.toString(),
      allTags: tags
    };

    return data;
  } catch (error) {
    console.error("Exif parsing error:", error);
    return {};
  }
};
