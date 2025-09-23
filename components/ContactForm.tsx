import { useState } from 'react';
import { Phone, MessageCircle, GraduationCap, MapPin } from 'lucide-react';

export default function PharmacyContactForm() {
  const [formData, setFormData] = useState({
    name: '', 
    number: '', 
    course: '', 
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // Contact details - Update these with actual numbers
  const phoneNumber = '+919702836946';
  const whatsappNumber = '919702836946';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    // Client-side validation
    const { name, number, course, city } = formData;
    
    if (!name.trim() || !number.trim() || !course || !city.trim()) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(number.trim())) {
      setStatus({ type: 'error', msg: 'Please enter a valid 10-digit mobile number.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '1f193aea-e46c-406d-9b21-52ff22cf1925',
          name: name.trim(),
          phone: number.trim(),
          course: course,
          city: city.trim(),
          subject: `🎓 Pharmacy Form Submission - ${name.trim()}`,
          from_name: 'ABS Pharmacy Website',
          message: `New pharmacy course inquiry:
          
Name: ${name.trim()}
Phone: ${number.trim()}
Course: ${course}
City: ${city.trim()}
          
Please contact this student within 10 minutes as per our commitment.`
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setStatus({ 
          type: 'success', 
          msg: 'Thank you! We\'ve received your details. Our team will contact you within 10 minutes to discuss your pharmacy admission.' 
        });
        setFormData({ name: '', number: '', course: '', city: '' });
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ 
        type: 'error', 
        msg: 'Something went wrong while submitting your form. Please try again or contact us directly via call or WhatsApp.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('I want to know more about pharmacy courses');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    

    <div id="apply-form" className="bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 leading-snug">
          No NEET? No CET? No Problem.
        </h2>
        <p className="text-lg mt-4 text-gray-600 font-medium">
          Get Direct Admission in Top PCI-Approved Colleges @ ₹60,000/Year.
          <br />
          <span className="text-red-600 font-semibold">
            Only First 20 Students Get This Offer – Fill the Form & Book Your Seat Now!
          </span>
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-gray-50 shadow-lg rounded-xl p-6">
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="number" className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              required
              value={formData.number}
              onChange={handleChange}
              pattern="\d{10}"
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              placeholder="9876543210"
            />
          </div>

          {/* Course Selection */}
          <div>
            <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-1">
              Select Course *
            </label>
            <select
              id="course"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
            >
              <option value="">-- Choose Course --</option>
              <option value="D.Pharm (2 Years)">D.Pharm (2 Years)</option>
              <option value="B.Pharm (4 Years)">B.Pharm (4 Years)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              placeholder="Enter your city"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <GraduationCap size={18} />
                  Book My Seat Now
                </>
              )}
            </button>
          </div>
        </div>


        {/* Status Messages */}
        {status.msg && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <p className="text-sm font-medium">{status.msg}</p>
              
              {/* Contact buttons on error */}
              {status.type === 'error' && (
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCall}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <Phone size={16} />
                    Call Now
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Additional Info Section */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <GraduationCap size={16} className="text-blue-600" />
            80K+ Counselling
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <MapPin size={16} className="text-blue-600" />
            11K+ Admissions
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            💼 100% Placement Assistance
          </span>
        </div>
      </div>
    </div>
  );
}