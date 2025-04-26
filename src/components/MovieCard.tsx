
import { useState } from 'react';
import { Play, Volume2, ThumbsUp, Plus } from 'lucide-react';

interface MovieCardProps {
  id: number;
  title: string;
  imageUrl: string;
  year: string;
  rating: string;
  duration: string;
}

const MovieCard = ({ id, title, imageUrl, year, rating, duration }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative netflix-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover rounded-md movie-card-shadow"
      />
      
      {/* Expanded Card (shown on hover) */}
      {isHovered && (
        <div className="absolute -bottom-[8rem] left-0 right-0 bg-netflix-dark p-3 rounded-b-md movie-card-shadow z-20">
          <div className="flex items-center space-x-2 mb-2">
            <button className="bg-white hover:bg-white/90 text-black rounded-full p-1">
              <Play size={16} />
            </button>
            <button className="border border-gray-400 hover:border-white rounded-full p-1">
              <Plus size={16} />
            </button>
            <button className="border border-gray-400 hover:border-white rounded-full p-1">
              <ThumbsUp size={16} />
            </button>
            <button className="border border-gray-400 hover:border-white rounded-full p-1 ml-auto">
              <Volume2 size={16} />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-green-500 font-semibold">{rating} Match</span>
            <span className="border border-gray-500 px-1">{rating}</span>
            <span>{duration}</span>
            <span className="border border-gray-500 px-1 text-[10px]">HD</span>
          </div>
          <div className="mt-2 text-xs">
            <span>{year}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
