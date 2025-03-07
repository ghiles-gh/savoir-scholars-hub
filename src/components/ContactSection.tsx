
import React from 'react';
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-nobel-light-blue/30 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-nobel-gold/10 rounded-tr-full -z-10"></div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title animate-fade-in">Contact Us</h2>
          <p className="section-subtitle mx-auto animate-fade-in">
            We're here to answer your questions and provide more information about our school.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in-left">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 w-full h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047564456!2d2.2922926158821853!3d48.8583736092923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1645794875452!5m2!1sen!2sus" 
                  className="w-full h-full" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy"
                  title="School location map"
                ></iframe>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-nobel-navy mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-nobel-light-blue/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-nobel-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nobel-navy">Address</h4>
                      <p className="text-gray-600">123 Education Avenue, Paris, 75007, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-nobel-light-blue/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-nobel-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nobel-navy">Phone</h4>
                      <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-nobel-light-blue/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-nobel-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nobel-navy">Email</h4>
                      <p className="text-gray-600">info@ecole-savoir-nobel.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-nobel-light-blue/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-nobel-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-nobel-navy">Office Hours</h4>
                      <p className="text-gray-600">Monday-Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM (Admissions Only)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-right">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-nobel-navy mb-6">Send Us a Message</h3>
              
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="admissions">Admissions Information</option>
                    <option value="tour">Schedule a Tour</option>
                    <option value="programs">Academic Programs</option>
                    <option value="financial">Financial Aid</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nobel-blue/50"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    className="mt-1"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                    I consent to having this website store my submitted information so they can respond to my inquiry. *
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-nobel-blue text-white font-medium rounded-md hover:bg-nobel-navy transition-colors shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
