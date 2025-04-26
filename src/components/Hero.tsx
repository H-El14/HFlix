
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&auto=format&fit=crop&w=1920"
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 netflix-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-4 md:px-16 z-10">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Matrix Resurrections</h1>
          <div className="flex space-x-2 mb-4">
            <span className="text-sm text-green-500 font-semibold">95% Match</span>
            <span className="text-sm">2021</span>
            <span className="border px-1 text-xs">HD</span>
          </div>
          <p className="text-sm md:text-base mb-6">
            Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, Neo must decide to follow the white rabbit once more.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-white hover:bg-white/90 text-black flex items-center px-6 py-2">
              <Play className="mr-2" size={20} /> Play
            </Button>
            <Button className="bg-gray-500/70 hover:bg-gray-500/50 text-white px-6 py-2">
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
