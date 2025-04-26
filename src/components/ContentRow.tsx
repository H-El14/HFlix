
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  year: string;
  rating: string;
  duration: string;
}

interface ContentRowProps {
  title: string;
  movies: Movie[];
}

const ContentRow = ({ title, movies }: ContentRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="content-container">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-netflix-light-gray">{title}</h2>
      <div className="relative group">
        <div 
          className="absolute top-0 bottom-0 left-0 flex items-center bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="h-9 w-9" />
        </div>
        
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-none scroll-smooth pt-2 pb-8"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[180px] md:min-w-[200px]">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
        
        <div 
          className="absolute top-0 bottom-0 right-0 flex items-center bg-black/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
