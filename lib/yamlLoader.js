// lib/yamlLoader.js - Simplified YAML loader for easy image management
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Cache for better performance
let cachedData = null;
let lastModified = null;

/**
 * Load gallery data from YAML file
 * Automatically handles caching and file watching
 */
export function loadGalleryData() {
  try {
    const yamlPath = path.join(process.cwd(), 'config/gallery.yml');
    
    // Check if file exists
    if (!fs.existsSync(yamlPath)) {
      console.error('Gallery YAML file not found:', yamlPath);
      return getDefaultGalleryData();
    }

    // Check file modification time for caching
    const stats = fs.statSync(yamlPath);
    const currentModified = stats.mtime.getTime();

    // Return cached data if file hasn't changed
    if (cachedData && lastModified === currentModified) {
      return cachedData;
    }

    // Read and parse YAML file
    const fileContent = fs.readFileSync(yamlPath, 'utf8');
    const yamlData = yaml.load(fileContent);

    // Transform data for gallery component
    const galleryData = transformYamlData(yamlData);

    // Cache the result
    cachedData = galleryData;
    lastModified = currentModified;

    console.log('Gallery data loaded successfully');
    return galleryData;

  } catch (error) {
    console.error('Error loading gallery YAML:', error);
    return getDefaultGalleryData();
  }
}

/**
 * Transform YAML data to gallery format
 * Adds auto-generated IDs and SEO-friendly alt text
 * Handles both uploaded images and URL images
 */
function transformYamlData(yamlData) {
  const transformed = {
    settings: yamlData.settings || getDefaultSettings(),
    galleryData: {},
    segments: [
      { id: 'college', name: 'College Gallery', icon: 'GraduationCap', color: 'from-blue-500 to-blue-600' },
      { id: 'lecture', name: 'Lectures', icon: 'BookOpen', color: 'from-green-500 to-green-600' },
      { id: 'activity', name: 'Activities', icon: 'Users', color: 'from-purple-500 to-purple-600' },
      { id: 'certificates', name: 'Certificates', icon: 'Award', color: 'from-orange-500 to-orange-600' }
    ]
  };

  // Process each segment
  ['college', 'lecture', 'activity', 'certificates'].forEach(segment => {
    const images = yamlData[segment] || [];
    
    transformed.galleryData[segment] = images
      .filter(image => {
        // Only include images that have either src or imageUrl, and a title
        return image.title && (image.src || image.imageUrl);
      })
      .map((image, index) => ({
        id: index + 1, // Auto-generate ID
        src: image.src || image.imageUrl, // Use uploaded image or URL
        alt: image.alt || generateAltText(image.title, image.description), // Auto-generate alt if missing
        title: image.title,
        description: image.description || image.title, // Fallback to title
        category: image.category || 'General',
        seoKeywords: generateSeoKeywords(image.title, image.description, image.category),
        metaTitle: image.metaTitle || `${image.title} - ${transformed.settings.seo.siteName}`,
        metaDescription: image.metaDescription || image.description || image.title
      }));
  });

  return transformed;
}

/**
 * Generate SEO-friendly alt text
 */
function generateAltText(title, description) {
  if (!title) return 'Gallery image';
  
  let alt = title;
  if (description && description !== title) {
    alt += ` - ${description.substring(0, 100)}`;
  }
  
  return alt;
}

/**
 * Generate SEO keywords from content
 */
function generateSeoKeywords(title, description, category) {
  const keywords = [];
  
  if (title) {
    keywords.push(...title.toLowerCase().split(' ').filter(word => word.length > 2));
  }
  
  if (category) {
    keywords.push(category.toLowerCase());
  }
  
  if (description) {
    const descWords = description.toLowerCase().split(' ').filter(word => word.length > 3);
    keywords.push(...descWords.slice(0, 3)); // Take first 3 meaningful words
  }
  
  // Remove duplicates and return unique keywords
  return [...new Set(keywords)].slice(0, 8); // Limit to 8 keywords
}

/**
 * Get default settings if not provided in YAML
 */
function getDefaultSettings() {
  return {
    autoScroll: {
      enabled: true,
      interval: 2000,
      distance: 200
    },
    seo: {
      siteName: "Your College Name",
      baseUrl: "https://yourwebsite.com",
      description: "Leading educational institution providing quality education"
    }
  };
}

/**
 * Get default gallery data if YAML file is missing
 */
function getDefaultGalleryData() {
  return {
    settings: getDefaultSettings(),
    galleryData: {
      college: [],
      lecture: [],
      activity: [],
      certificates: []
    },
    segments: [
      { id: 'college', name: 'College Gallery', icon: 'GraduationCap', color: 'from-blue-500 to-blue-600' },
      { id: 'lecture', name: 'Lectures', icon: 'BookOpen', color: 'from-green-500 to-green-600' },
      { id: 'activity', name: 'Activities', icon: 'Users', color: 'from-purple-500 to-purple-600' },
      { id: 'certificates', name: 'Certificates', icon: 'Award', color: 'from-orange-500 to-orange-600' }
    ]
  };
}

/**
 * Add new image to YAML file
 * This function allows programmatic addition of images
 */
export function addImageToYaml(segment, imageData) {
  try {
    const yamlPath = path.join(process.cwd(), 'config/gallery.yml');
    const fileContent = fs.readFileSync(yamlPath, 'utf8');
    const yamlData = yaml.load(fileContent);

    // Ensure segment exists
    if (!yamlData[segment]) {
      yamlData[segment] = [];
    }

    // Add new image (without ID - it will be auto-generated)
    const newImage = {
      src: imageData.src,
      title: imageData.title,
      description: imageData.description,
      category: imageData.category || 'General'
    };

    yamlData[segment].push(newImage);

    // Write back to file
    const updatedYaml = yaml.dump(yamlData, { 
      indent: 2,
      lineWidth: -1,
      noRefs: true 
    });
    
    fs.writeFileSync(yamlPath, updatedYaml, 'utf8');

    // Clear cache to force reload
    cachedData = null;
    lastModified = null;

    return true;
  } catch (error) {
    console.error('Error adding image to YAML:', error);
    return false;
  }
}

/**
 * Remove image from YAML file by index
 */
export function removeImageFromYaml(segment, index) {
  try {
    const yamlPath = path.join(process.cwd(), 'config/gallery.yml');
    const fileContent = fs.readFileSync(yamlPath, 'utf8');
    const yamlData = yaml.load(fileContent);

    if (yamlData[segment] && yamlData[segment][index]) {
      yamlData[segment].splice(index, 1);

      // Write back to file
      const updatedYaml = yaml.dump(yamlData, { 
        indent: 2,
        lineWidth: -1,
        noRefs: true 
      });
      
      fs.writeFileSync(yamlPath, updatedYaml, 'utf8');

      // Clear cache
      cachedData = null;
      lastModified = null;

      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error removing image from YAML:', error);
    return false;
  }
}

/**
 * Update image in YAML file by index
 */
export function updateImageInYaml(segment, index, imageData) {
  try {
    const yamlPath = path.join(process.cwd(), 'config/gallery.yml');
    const fileContent = fs.readFileSync(yamlPath, 'utf8');
    const yamlData = yaml.load(fileContent);

    if (yamlData[segment] && yamlData[segment][index]) {
      yamlData[segment][index] = {
        src: imageData.src,
        title: imageData.title,
        description: imageData.description,
        category: imageData.category || 'General'
      };

      // Write back to file
      const updatedYaml = yaml.dump(yamlData, { 
        indent: 2,
        lineWidth: -1,
        noRefs: true 
      });
      
      fs.writeFileSync(yamlPath, updatedYaml, 'utf8');

      // Clear cache
      cachedData = null;
      lastModified = null;

      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating image in YAML:', error);
    return false;
  }
}

/**
 * Get gallery statistics
 */
export function getGalleryStats() {
  const data = loadGalleryData();
  const stats = {};
  
  Object.keys(data.galleryData).forEach(segment => {
    stats[segment] = {
      count: data.galleryData[segment].length,
      lastImage: data.galleryData[segment].length > 0 ? 
        data.galleryData[segment][data.galleryData[segment].length - 1].title : 
        'No images'
    };
  });
  
  return stats;
}

/**
 * Validate YAML file structure
 */
export function validateGalleryYaml() {
  try {
    const data = loadGalleryData();
    const errors = [];
    
    // Check required segments
    ['college', 'lecture', 'activity', 'certificates'].forEach(segment => {
      if (!data.galleryData[segment]) {
        errors.push(`Missing segment: ${segment}`);
      } else {
        // Check each image in segment
        data.galleryData[segment].forEach((image, index) => {
          if (!image.src) errors.push(`${segment}[${index}]: Missing src`);
          if (!image.title) errors.push(`${segment}[${index}]: Missing title`);
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error.message]
    };
  }
}

/**
 * Clear cache - useful for development
 */
export function clearCache() {
  cachedData = null;
  lastModified = null;
}

// Export default object with all functions
export default {
  loadGalleryData,
  addImageToYaml,
  removeImageFromYaml,
  updateImageInYaml,
  getGalleryStats,
  validateGalleryYaml,
  clearCache
};