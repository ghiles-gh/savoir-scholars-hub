
import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Students Win International Science Competition",
    excerpt: "Our team of high school scientists took top honors at the Global Youth Science Challenge with their innovative climate solution.",
    date: "June 15, 2023",
    category: "Achievement",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e7f4?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "New Arts Center Opening Ceremony",
    excerpt: "Join us for the grand opening of our state-of-the-art performance and visual arts facility, featuring guest artists and student exhibitions.",
    date: "May 28, 2023",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Alumni Spotlight: Dr. Sophia Chen",
    excerpt: "Former student Dr. Chen returns to campus to discuss her groundbreaking research in renewable energy and inspire current students.",
    date: "April 12, 2023",
    category: "Alumni",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Parent Information Night",
    date: "July 10, 2023",
    time: "6:30 PM - 8:00 PM",
    location: "Main Auditorium"
  },
  {
    id: 2,
    title: "Summer Innovation Camp",
    date: "July 15-28, 2023",
    time: "9:00 AM - 3:00 PM",
    location: "STEM Building"
  },
  {
    id: 3,
    title: "New Student Orientation",
    date: "August 25, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Student Center"
  }
];

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title animate-fade-in">News & Events</h2>
          <p className="section-subtitle mx-auto animate-fade-in">
            Stay updated with the latest happenings at École du Savoir Nobel.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {newsItems.map((item, index) => (
            <div 
              key={item.id}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in",
                "flex flex-col"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-nobel-blue text-white text-xs font-medium px-2 py-1 rounded">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-nobel-navy">{item.title}</h3>
                <p className="text-gray-600 flex-grow">{item.excerpt}</p>
                
                <a 
                  href="#"
                  className="mt-4 inline-flex items-center text-nobel-blue font-medium hover:text-nobel-navy transition-colors"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-left">
            <h3 className="text-2xl font-bold text-nobel-navy mb-6">Upcoming Events</h3>
            
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 group">
                  <div className="text-center flex-shrink-0">
                    <div className="w-14 bg-nobel-light-blue rounded-t-md p-1 text-nobel-blue font-medium">
                      {event.date.split(' ')[0]}
                    </div>
                    <div className="w-14 bg-nobel-blue rounded-b-md p-1 text-white font-bold text-xl">
                      {event.date.split(' ')[1].replace(',', '')}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg text-nobel-navy group-hover:text-nobel-blue transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {event.time} • {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <a 
              href="#"
              className="mt-8 inline-flex items-center text-nobel-blue font-medium hover:text-nobel-navy transition-colors"
            >
              View all events <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="bg-nobel-navy text-white p-6 rounded-xl shadow-sm animate-fade-in-right">
            <h3 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">
              Stay informed about school news, events, and important announcements by subscribing to our monthly newsletter.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-gray-300 block mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nobel-gold/50"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm text-gray-300 block mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nobel-gold/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-nobel-gold text-nobel-navy font-medium rounded-md hover:bg-nobel-gold/90 transition-colors"
              >
                Subscribe
              </button>
              
              <p className="text-xs text-gray-400">
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
