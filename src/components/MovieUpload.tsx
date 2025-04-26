
import { useState } from 'react';
import { Upload, X, Film, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

interface UploadedContentData {
  id: number;
  title: string;
  description: string;
  year: string;
  type: "movie" | "show";
  seasons?: number;
  rating: string;
  genre: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const ratings = ["G", "PG", "PG-13", "R", "NC-17", "TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Family", "Fantasy", "Horror", "Music", "Mystery", 
  "Romance", "Science Fiction", "Thriller", "War", "Western"
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  year: z.string().min(4, "Year is required"),
  type: z.enum(["movie", "show"]),
  seasons: z.number().optional(),
  rating: z.string().min(1, "Rating is required"),
  genre: z.string().min(1, "Genre is required"),
});

const MovieUpload = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      type: "movie",
      rating: "PG-13",
      genre: "Drama",
    },
  });

  const contentType = form.watch("type");
  
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
    form.reset();
    setThumbnailFile(null);
    setVideoFile(null);
    setThumbnailPreview(null);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
      const uploadedContent: UploadedContentData = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        year: data.year,
        type: data.type,
        ...(data.type === "show" && { seasons: data.seasons }),
        rating: data.rating,
        genre: data.genre,
        thumbnailUrl: URL.createObjectURL(thumbnailFile),
        videoUrl: URL.createObjectURL(videoFile),
      };
      
      console.log('Uploaded content:', uploadedContent);
      
      toast({
        title: "Upload successful!",
        description: `"${data.title}" has been uploaded successfully.`,
      });
      
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your content. Please try again.",
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
          <Upload className="mr-2" size={16} /> Upload Content
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-netflix-black border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload New Content</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title"
                          {...field}
                          className="bg-gray-800 border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Content Type</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="movie" id="movie" />
                            <Label htmlFor="movie" className="flex items-center">
                              <Film className="mr-1" size={16} /> Movie
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="show" id="show" />
                            <Label htmlFor="show" className="flex items-center">
                              <Tv className="mr-1" size={16} /> TV Show
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1900"
                            max={new Date().getFullYear() + 10}
                            {...field}
                            className="bg-gray-800 border-gray-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {contentType === "show" && (
                    <FormField
                      control={form.control}
                      name="seasons"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seasons</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              value={field.value}
                              className="bg-gray-800 border-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700">
                              <SelectValue placeholder="Select a rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {ratings.map(rating => (
                              <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-60">
                            {genres.map(genre => (
                              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="bg-gray-800 border-gray-700 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image</Label>
                  <div className="flex flex-col gap-2">
                    {thumbnailPreview ? (
                      <div className="relative rounded overflow-hidden">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail preview" 
                          className="w-full aspect-[2/3] object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                          onClick={() => {
                            setThumbnailFile(null);
                            setThumbnailPreview(null);
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center bg-gray-800 aspect-[2/3] flex flex-col items-center justify-center">
                        <Input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                        />
                        <Label htmlFor="thumbnail" className="cursor-pointer flex flex-col items-center">
                          <Upload className="mb-2" />
                          <span>Upload thumbnail</span>
                          <span className="text-xs text-gray-400 mt-1">Click to browse</span>
                        </Label>
                      </div>
                    )}
                    {!thumbnailPreview && (
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="bg-gray-800 border-gray-700"
                      />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video">Video File</Label>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="bg-gray-800 border-gray-700"
                  />
                  {videoFile && (
                    <div className="flex items-center mt-2 p-2 bg-gray-800 rounded">
                      <span className="text-sm text-gray-400 truncate flex-1">{videoFile.name}</span>
                      <button
                        type="button"
                        className="text-red-500 ml-2"
                        onClick={() => setVideoFile(null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
                disabled={isUploading || !form.formState.isValid || !thumbnailFile || !videoFile}
              >
                {isUploading ? "Uploading..." : "Upload Content"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieUpload;
