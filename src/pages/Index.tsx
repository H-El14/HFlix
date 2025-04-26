
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ContentRow from '@/components/ContentRow';

const Index = () => {
  const [uploadedContent, setUploadedContent] = useState<any[]>([]);
  
  useEffect(() => {
    // Load uploaded content from localStorage
    const storedContent = localStorage.getItem('uploadedContent');
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setUploadedContent(parsedContent);
      } catch (e) {
        console.error('Error parsing uploaded content:', e);
      }
    }
  }, []);
  
  // Mock data for content rows
  const trendingNow = [
    { id: 1, title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2022", rating: "98%", duration: "1h 30m" },
    { id: 2, title: "Wednesday", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2023", rating: "95%", duration: "1h 42m" },
    { id: 3, title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2021", rating: "92%", duration: "1h 55m" },
    { id: 4, title: "Dark", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "97%", duration: "2h 10m" },
    { id: 5, title: "The Crown", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2023", rating: "94%", duration: "1h 48m" },
    { id: 6, title: "Ozark", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2022", rating: "91%", duration: "1h 37m" },
  ];
  
  const popularOnNetflix = [
    { id: 7, title: "Money Heist", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2021", rating: "96%", duration: "1h 52m" },
    { id: 8, title: "Breaking Bad", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2020", rating: "99%", duration: "2h 05m" },
    { id: 9, title: "Queen's Gambit", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "93%", duration: "1h 40m" },
    { id: 10, title: "Bridgerton", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2022", rating: "90%", duration: "1h 35m" },
    { id: 11, title: "Narcos", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2019", rating: "95%", duration: "1h 58m" },
    { id: 12, title: "The Last Kingdom", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2021", rating: "92%", duration: "1h 45m" },
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Content Rows */}
      <div className="mt-4">
        {/* Recently Uploaded Content */}
        {uploadedContent && uploadedContent.length > 0 && (
          <ContentRow 
            title="Recently Added" 
            movies={uploadedContent}
          />
        )}
      
        <ContentRow 
          title="Trending Now" 
          movies={trendingNow}
        />
        
        <ContentRow 
          title="Popular on Netflix" 
          movies={popularOnNetflix}
        />
      </div>
      
      {/* Footer */}
      <footer className="py-10 px-4 md:px-16 text-netflix-gray">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-4">Navigate</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/browse" className="hover:underline">Browse</Link></li>
                <li><Link to="/browse" className="hover:underline">My List</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/browse" className="hover:underline">TV Shows</Link></li>
                <li><Link to="/browse" className="hover:underline">Movies</Link></li>
                <li><Link to="/browse" className="hover:underline">New & Popular</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-sm">
            <p>© 2023 Stream-It-Yourself. This is a demo clone for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
