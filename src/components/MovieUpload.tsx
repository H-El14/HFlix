
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface UploadedMovieData {
  id: number;
  title: string;
  description: string;
  year: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const MovieUpload = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
    });
    setThumbnailFile(null);
    setVideoFile(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!thumbnailFile || !videoFile) {
      toast({
        title: "Missing files",
        description: "Please select both a thumbnail image and video file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // This is a mock implementation - in a real app with Supabase, you'd upload files to storage
    // and save metadata to the database
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful upload
      const mockUploadedMovie: UploadedMovieData = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        year: formData.year,
        thumbnailUrl: URL.createObjectURL(thumbnailFile),
        videoUrl: URL.createObjectURL(videoFile),
      };
      
      console.log('Uploaded movie:', mockUploadedMovie);
      
      toast({
        title: "Upload successful!",
        description: `"${formData.title}" has been uploaded successfully.`,
      });
      
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Upload className="mr-2" size={16} /> Upload Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-netflix-black border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload New Movie</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Movie Title"
              required
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Movie description"
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 10}
              value={formData.year}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="bg-gray-800 border-gray-700"
              />
              {thumbnailPreview && (
                <div className="relative w-16 h-16">
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    onClick={() => {
                      setThumbnailFile(null);
                      setThumbnailPreview(null);
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video">Video File</Label>
            <Input
              id="video"
              name="video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="bg-gray-800 border-gray-700"
            />
            {videoFile && (
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-400 mr-2">{videoFile.name}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setVideoFile(null)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUploading || !formData.title || !thumbnailFile || !videoFile}
            >
              {isUploading ? "Uploading..." : "Upload Movie"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieUpload;
