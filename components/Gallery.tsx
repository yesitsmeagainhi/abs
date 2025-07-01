import React, {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  SyntheticEvent,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ZoomIn,
  Loader2,
} from 'lucide-react';

/* ---------- typing for the modal ---------- */
interface ImageModalProps {
  selectedImage: any;
  currentImages: any[];
  activeSegment: string;
  segments: any[];
  onClose: () => void;
  onNavigate: (dir: 'prev' | 'next') => void;
}

/* ---------- lazy-load the modal, but tell TS its prop type ---------- */
const ImageModal = lazy<React.ComponentType<ImageModalProps>>(() =>
  Promise.resolve({
    default: ({
      selectedImage,
      currentImages,
      activeSegment,
      segments,
      onClose,
      onNavigate,
    }: ImageModalProps) => (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-6xl max-h-[95vh] w-full">
          {/* close */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close image modal"
          >
            <X size={32} />
          </button>

          {/* prev / next */}
          <button
            onClick={() => onNavigate('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* picture + meta */}
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[75vh] object-contain"
              loading="eager"
            />
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 mb-2">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {segments.find((s: any) => s.id === activeSegment)?.name}
                </span>
                <span>
                  {currentImages.findIndex(
                    (img) => img.id === selectedImage.id,
                  ) + 1}{' '}
                  of {currentImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }),
);
const Gallery = ({
  apiEndpoint = '/api/gallery',
  useStaticData = true,
}) => {
  /* ---------- all of your state / data / helpers stay the same ---------- */
  const [activeSegment, setActiveSegment] = useState('college');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [galleryData, setGalleryData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const imgFallback = (
    e: SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    (e.currentTarget as HTMLImageElement).src = '/placeholder-image.jpg';
  };

  /* ---------- render ---------- */
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600">Loading gallery…</p>
        </div>
      </div>
    );
  }

  // Auto-scroll configuration
  const SCROLL_INTERVAL = 2000; // Time between scrolls (in milliseconds)
  const SCROLL_DISTANCE = 200; // Distance to scroll each time (in pixels)

  // Static gallery data - used when useStaticData is true or API fails
  const staticGalleryData = {
    college: [
      { 
        id: 1, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-26-at-8.12.11-PM.jpeg', 
        alt: 'Group of GNM students at akshaya college of nursing', 
        title: 'GNM Nursing College',
        description: 'Group of GNM students at akshaya college of nursing ',
        category: 'Infrastructure'
      },
      { 
        id: 2, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/Top-Ranked-Pharmacy-College-in-Banglore-Krupanidhi-college-of-pharmacy-1.png', 
        alt: 'D Pharma students at krupanidhi college of pharmacy', 
        title: 'Pharmacy College',
        description: 'D Pharma students at krupanidhi college of pharmacy',
        category: 'Pharmacy College'
      },
      { 
        id: 3, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/nip-2.jpg', 
        alt: 'Group of pharmacy students playing in a ground of NIP Pharmacy College', 
        title: 'NIP Pharmacy College Campus',
        description: 'Group of pharmacy students playing in a ground of NIP Pharmacy College',
        category: 'Campus area'
      },
      { 
        id: 4, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/Top-Ranked-Pharmacy-College-in-Banglore-Krupanidhi-college-of-pharmacy-1-scaled.jpeg', 
        alt: 'Group of pharmacy students going inside of College', 
        title: 'Pharmacy College Campus',
        description: 'Students Visiting the Krupanidhi College of Pharmacy campus',
        category: 'Campus area'
      },
      { 
        id: 5, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/MVM-college-of-pharmacy-1-scaled.jpg', 
        alt: 'Students studying in the library of MVM College of Pharmacy', 
        title: 'Pharmacy College Library',
        description: 'Pharmacy students library',
        category: 'College Library'
      },
      { 
        id: 6, 
        src: 'https://absadmission.com/wp-content/uploads/2025/04/Top-Ranked-Pharmacy-College-in-Banglore-Krupanidhi-college-of-pharmacy-scaled.jpeg', 
        alt: 'Students enjoying at krupanidhi college of pharmacy campus', 
        title: 'Pharmacy College Campus',
        description: 'Students at Pharmacy College enjoying at campus',
        category: 'Pharamcy College Campus'
      }
    ],
    lecture: [
      { 
        id: 7, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/Top-Ranked-Pharmacy-College-in-Banglore-Krupanidhi-college-of-pharmacy-3-scaled.jpeg', 
        alt: 'Pharmacy college classroom with students attentively listening to a teacher during lecture', 
        title: 'Classroom lectures at Pharmacy College',
        description: 'real-time learning environment with active participation and focused attention under faculty guidance.',
        category: 'Classrooms and Lecture Halls'
      },
      { 
        id: 8, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/Top-Ranked-Pharmacy-College-in-Banglore-Krupanidhi-college-of-pharmacy-5-scaled.jpeg', 
        alt: 'Pharmacy students performing practical experiments in a college laboratory', 
        title: 'Pharmacy Lab Session at Pharamacy College',
        description: 'Pharmacy students actively participating in hands-on experiments during a lab session at Pharmacy College.',
        category: 'Lab Practicals'
      },
      { 
        id: 9, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/Untitled-design-22.png', 
        alt: 'Pharmacy students attending a chemistry lecture in a traditional classroom setting', 
        title: 'Live Chemistry Lecture at Pharmacy College',
        description: 'A group of pharmacy students attentively attending a chemistry class led by a faculty member at Pharmacy College. ',
        category: 'Lecture Halls and Classrooms'
      },
      { 
        id: 10, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-26-at-8.11.59-PM-1-scaled.jpeg', 
        alt: 'Students conducting lab experiments in a pharmacy college laboratory wearing white coats', 
        title: 'Pharmacy Laboratory Practical',
        description: 'Students engaged in hands-on laboratory experiments at a pharmacy college.',
        category: 'Pharmacy Labs'
      },
      { 
        id: 11, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-26-at-8.12.08-PM-1-scaled.jpeg', 
        alt: 'Students observing a lab demonstration using a microscope at a pharmacy college', 
        title: 'Microscope Training Session',
        description: 'Students attending a hands-on training session focused on microscope usage at a pharmacy college laboratory.',
        category: 'Microscopy Lab'
      },
      { 
        id: 12, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/MVM-college-of-pharmacy-2-scaled.jpg', 
        alt: 'Students performing experiments in a physical pharmaceutics lab at a pharmacy college', 
        title: 'Physical Pharmaceutics Laboratory',
        description: 'Students participating in a physical pharmaceutics practical session inside a modern pharmacy college lab.',
        category: 'Pharmacy Labs'
      }
    ],
    activity: [
      { 
        id: 13, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/DSC8018-Enhanced-NR.jpg', 
        alt: 'Students performing a patriotic act holding the Indian national flag during Annual Day celebration', 
        title: 'Annual Day',
        description: 'Students showcasing a vibrant patriotic performance with the Indian national flag during the Annual Day celebration at the pharmacy college.',
        category: 'Annual Day'
      },
      { 
        id: 14, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/DSC7814-Enhanced-NR.jpg', 
        alt: 'Female students performing a traditional Garba dance in colorful costumes during Annual Day celebration', 
        title: 'Annual Day – Traditional Garba Dance',
        description: 'A vibrant stage performance by pharmacy college students showcasing a traditional Garba dance during the Annual Day event.',
        category: 'Annual Day'
      },
      { 
        id: 15, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/DSC7236-Enhanced-NR.jpg', 
        alt: 'Student portraying Goddess Durga with multiple arms during a cultural act on Annual Day', 
        title: 'Annual Day – Durga Act Performance',
        description: 'A powerful stage performance representing Goddess Durga during the Annual Day celebration at the pharmacy college. ',
        category: 'Annual Day'
      },
      { 
        id: 16, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/DSC02558-Enhanced-NR.jpg', 
        alt: 'Graduating students in convocation gowns posing for a group photo during pharmacy college Annual Day', 
        title: 'Annual Day – Graduation Ceremony',
        description: 'A proud moment as pharmacy college students celebrate their academic achievements during the Annual Day graduation ceremony.',
        category: 'Annual Day'
      },
      { 
        id: 17, 
        src: 'https://absadmission.com/wp-content/uploads/2025/06/DSC7961-Enhanced-NR.jpg', 
        alt: 'Annual Day', 
        title: 'Annual Day',
        description: '',
        category: 'Annual Day'
      },
      { 
        id: 18, 
        src: 'https://drive.google.com/file/d/1swvYkXnkhgyfbpbAhdKbhWrBqsvILNDI/view?usp=sharing', 
        alt: '', 
        title: '',
        description: '',
        category: ''
      }
    ],
    certificates: [
      { 
  id: 19, 
  src: 'https://absadmission.com/wp-content/uploads/2025/06/IMG20241206134104-1-768x1024.jpg', 
  alt: 'Student receiving official pharmacy course license during celebration ceremony', 
  title: 'Course Completion Celebration',
  description: 'Celebrating students who have successfully completed their pharmacy program and received their official license.',
  category: 'Completion Ceremony'
},
{ 
  id: 20, 
  src: 'https://absadmission.com/wp-content/uploads/2025/06/15_WhatsApp-Image-2024-12-15-at-4.57.44-PM-768x1024.jpeg', 
  alt: 'Pharmacy student proudly holding license after completing the course', 
  title: 'Licensed Pharmacist Recognition',
  description: 'A proud moment honoring students who have officially completed their course and earned pharmacy licensing.',
  category: 'Completion Ceremony'
},
{ 
  id: 21, 
  src: 'https://absadmission.com/wp-content/uploads/2025/06/19_IMG_20241228_151100-scaled-e1750235364836-768x921.jpg', 
  alt: 'Celebrating licensed graduates from pharmacy college', 
  title: 'Official Course Completion',
  description: 'Students recognized for completing their pharmacy education and earning their professional license.',
  category: 'Completion Ceremony'
},
{ 
  id: 22, 
  src: 'https://absadmission.com/wp-content/uploads/2025/06/1_IMG_20241207_134647-scaled-e1750235380331-768x919.jpg', 
  alt: 'Pharmacy graduate honored for successful completion and licensing', 
  title: 'Pharmacy Graduation Milestone',
  description: 'Special moments marking the successful course completion and official licensing of students.',
  category: 'Completion Ceremony'
},
{ 
  id: 23, 
  src: 'https://absadmission.com/wp-content/uploads/2025/04/21_WhatsApp-Image-2024-12-30-at-2.02.06-PM-scaled.jpeg', 
  alt: 'Student receiving pharmacy college license during official handover ceremony', 
  title: 'Licensing Celebration Event',
  description: 'A formal celebration for pharmacy students receiving their official license after course completion.',
  category: 'Completion Ceremony'
},
{ 
  id: 24, 
  src: 'https://absadmission.com/wp-content/uploads/2025/04/WhatsApp-Image-2024-11-30-at-1.19.13-PM-scaled.jpeg', 
  alt: 'Graduating pharmacy student acknowledged for completing course and receiving license', 
  title: 'Course Completion & License Distribution',
  description: 'Recognizing students who have successfully completed their program and earned their pharmacy license.',
  category: 'Completion Ceremony'
}

    ]
  };

  // Fetch gallery data from API or use static data
  const fetchGalleryData = async () => {
    // If useStaticData is true, use static data immediately
    if (useStaticData) {
      setGalleryData(staticGalleryData);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGalleryData(data.galleryData || data);
      
      // Set first available segment as active if current one doesn't exist
      if (data.galleryData || data) {
        const availableSegments = Object.keys(data.galleryData || data);
        if (availableSegments.length > 0 && !availableSegments.includes(activeSegment)) {
          setActiveSegment(availableSegments[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching gallery data:', err);
      console.log('Falling back to static data...');
      // Fallback to static data if API fails
      setGalleryData(staticGalleryData);
      setError(null); // Don't show error when fallback works
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchGalleryData();
  }, [apiEndpoint, useStaticData]);

  const segments = [
    { 
      id: 'college', 
      name: 'College Gallery', 
      icon: GraduationCap, 
      color: 'from-blue-500 to-blue-600',
      description: 'Explore our beautiful campus facilities and infrastructure'
    },
    { 
      id: 'lecture', 
      name: 'Lectures', 
      icon: BookOpen, 
      color: 'from-green-500 to-green-600',
      description: 'Modern classrooms and learning environments'
    },
    { 
      id: 'activity', 
      name: 'Activities', 
      icon: Users, 
      color: 'from-purple-500 to-purple-600',
      description: 'Student life, events, and extracurricular activities'
    },
    { 
      id: 'certificates', 
      name: 'Certificates', 
      icon: Award, 
      color: 'from-orange-500 to-orange-600',
      description: 'Academic achievements and recognition ceremonies'
    }
  ].filter(segment => galleryData[segment.id]); // Only show segments with data

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const currentImages = galleryData[activeSegment] || [];
  const currentIndex = selectedImage ? currentImages.findIndex(img => img.id === selectedImage.id) : -1;

  const navigateImage = (direction) => {
    if (!selectedImage || currentIndex === -1) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % currentImages.length
      : (currentIndex - 1 + currentImages.length) % currentImages.length;
    
    setSelectedImage(currentImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    
    autoScrollRef.current = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        if (currentScroll >= scrollWidth - clientWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
        }
      }
    }, SCROLL_INTERVAL);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    startAutoScroll();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      stopAutoScroll();
    };
  }, [selectedImage, currentIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [activeSegment, isPaused]);

  const currentSegmentData = segments.find(s => s.id === activeSegment);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Gallery</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchGalleryData}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!galleryData || Object.keys(galleryData).length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No gallery data available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sr-only">
        <h1>College Gallery - {currentSegmentData?.name}</h1>
        <p>{currentSegmentData?.description}</p>
      </div>

      <main className="bg-gradient-to-br from-gray-50 via-white to-gray-100  py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Our Gallery
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our educational journey through stunning visuals of campus life, 
              academic excellence, student activities, and achievements that define our institution.
            </p>
          </header>

          <nav className="mb-8 md:mb-12" role="navigation" aria-label="Gallery sections">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {segments.map((segment) => {
                const IconComponent = segment.icon;
                return (
                  <button
                    key={segment.id}
                    onClick={() => setActiveSegment(segment.id)}
                    className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm md:text-base ${
                      activeSegment === segment.id
                        ? `bg-gradient-to-r ${segment.color} text-white shadow-lg focus:ring-blue-500`
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 focus:ring-gray-300'
                    }`}
                    aria-label={`View ${segment.name}`}
                    aria-pressed={activeSegment === segment.id}
                  >
                    <IconComponent size={18} className="md:w-5 md:h-5" />
                    <span className="hidden sm:inline">{segment.name}</span>
                    <span className="sm:hidden">{segment.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <section className="relative" aria-label={`${currentSegmentData?.name} images`}>
            {/* Mobile Horizontal Scroll */}
            <div className="block md:hidden relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentSegmentData?.name}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={scrollLeft}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`p-2 rounded-full shadow-md hover:shadow-lg transition-all ${
                      isPaused ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
                    }`}
                    aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                  >
                    {isPaused ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {[...currentImages, ...currentImages].map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => openModal(image)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src || image.url || image.image}
                        alt={image.alt || image.description || image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = '/placeholder-image.jpg';
  }}
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                          <p className="text-white/80 text-xs">{image.category}</p>
                        </div>
                        <div className="absolute top-3 right-3">
                          <ZoomIn className="text-white/80" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentImages.map((image) => (
                <article
                  key={image.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
                  onClick={() => openModal(image)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src || image.url || image.image}
                      alt={image.alt || image.description || image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                     onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = '/placeholder-image.jpg';
  }}
/>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                      <p className="text-white/90 text-sm mb-2">{image.category}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="text-white/90" size={24} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="text-center mt-8 text-gray-600">
            <p className="text-sm">
              Showing {currentImages.length} images in {currentSegmentData?.name}
            </p>
          </div>
        </div>

        {selectedImage && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <ImageModal
              selectedImage={selectedImage}
              currentImages={currentImages}
              activeSegment={activeSegment}
              segments={segments}
              onClose={closeModal}
              onNavigate={navigateImage}
            />
          </Suspense>
        )}
      </main>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "College Gallery",
          "description": "Comprehensive gallery showcasing our educational institution's facilities, activities, and achievements",
          "url": typeof window !== 'undefined' ? window.location.href : '',
          "image": currentImages.map(img => ({
            "@type": "ImageObject",
            "url": img.src || img.url || img.image,
            "name": img.title,
            "description": img.alt || img.description || img.title,
            "caption": img.description
          }))
        })}
      </script>
    </>
  );
};

export default Gallery;