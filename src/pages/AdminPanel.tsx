
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2, Edit, UserCog } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface ContentItem {
  id: number;
  title: string;
  imageUrl: string;
  type: 'movie' | 'show';
  rating: string;
  duration?: string;
  seasons?: number;
  year: string;
  description?: string;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  
  // Mock content data - in a real app, this would come from a database
  useEffect(() => {
    // Check if user is admin
    const profileData = location.state?.profileName;
    if (profileData !== "Admin") {
      navigate('/home');
      return;
    }
    
    setIsAdmin(true);
    
    // Simulate fetching content
    const mockContent: ContentItem[] = [
      { id: 1, title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", type: "show", year: "2022", rating: "98%", seasons: 4 },
      { id: 2, title: "Wednesday", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", type: "show", year: "2023", rating: "95%", seasons: 1 },
      { id: 3, title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", type: "show", year: "2021", rating: "92%", seasons: 3 },
      { id: 4, title: "Matrix Resurrections", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", type: "movie", year: "2021", rating: "78%", duration: "2h 28m" },
      { id: 5, title: "Inception", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", type: "movie", year: "2010", rating: "94%", duration: "2h 28m" },
    ];
    
    // Check localStorage for any uploaded content
    const uploadedContent = localStorage.getItem('uploadedContent');
    if (uploadedContent) {
      try {
        const parsedContent = JSON.parse(uploadedContent);
        setContent([...mockContent, ...parsedContent]);
      } catch (e) {
        setContent(mockContent);
      }
    } else {
      setContent(mockContent);
    }
  }, [location, navigate]);
  
  const handleDeleteContent = (id: number) => {
    setContent(content.filter(item => item.id !== id));
    
    // Update localStorage
    const uploadedContent = localStorage.getItem('uploadedContent');
    if (uploadedContent) {
      try {
        const parsedContent = JSON.parse(uploadedContent);
        const updatedContent = parsedContent.filter((item: ContentItem) => item.id !== id);
        localStorage.setItem('uploadedContent', JSON.stringify(updatedContent));
      } catch (e) {
        // Handle error
      }
    }
    
    toast({
      title: "Content removed",
      description: "The content has been successfully deleted.",
    });
  };
  
  if (!isAdmin) {
    return <div>Checking credentials...</div>;
  }
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-16">
        <div className="flex items-center mb-8">
          <UserCog size={28} className="text-netflix-red mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
        </div>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="users">User Profiles</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map(item => (
                <Card key={item.id} className="bg-netflix-dark border-gray-800">
                  <div className="relative aspect-video">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <div className="flex space-x-2 text-sm text-gray-400 mt-1">
                          <span>{item.year}</span>
                          <span>•</span>
                          <span className="text-green-500">{item.rating}</span>
                          <span>•</span>
                          <span className="capitalize">{item.type}</span>
                          {item.type === 'show' ? 
                            <span>{item.seasons} {item.seasons === 1 ? 'Season' : 'Seasons'}</span> : 
                            <span>{item.duration}</span>
                          }
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteContent(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="text-center py-12">
              <p className="text-gray-400">User profile management coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="text-center py-12">
              <p className="text-gray-400">Admin settings coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
