
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';

const Browse = () => {
  // Mock data
  const [genres] = useState([
    { 
      id: 1, 
      title: "Trending Now", 
      movies: [
        { id: 1, title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2022", rating: "98%", duration: "1h 30m" },
        { id: 2, title: "Wednesday", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2023", rating: "95%", duration: "1h 42m" },
        { id: 3, title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2021", rating: "92%", duration: "1h 55m" },
        { id: 4, title: "Dark", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "97%", duration: "2h 10m" },
        { id: 5, title: "The Crown", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2023", rating: "94%", duration: "1h 48m" },
        { id: 6, title: "Ozark", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2022", rating: "91%", duration: "1h 37m" },
      ]
    },
    { 
      id: 2, 
      title: "Popular on Netflix", 
      movies: [
        { id: 7, title: "Money Heist", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2021", rating: "96%", duration: "1h 52m" },
        { id: 8, title: "Breaking Bad", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2020", rating: "99%", duration: "2h 05m" },
        { id: 9, title: "Queen's Gambit", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "93%", duration: "1h 40m" },
        { id: 10, title: "Bridgerton", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2022", rating: "90%", duration: "1h 35m" },
        { id: 11, title: "Narcos", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2019", rating: "95%", duration: "1h 58m" },
        { id: 12, title: "The Last Kingdom", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2021", rating: "92%", duration: "1h 45m" },
      ]
    },
    { 
      id: 3, 
      title: "Sci-Fi & Fantasy", 
      movies: [
        { id: 13, title: "Altered Carbon", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2020", rating: "91%", duration: "1h 50m" },
        { id: 14, title: "Black Mirror", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2021", rating: "97%", duration: "1h 33m" },
        { id: 15, title: "Lost in Space", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2019", rating: "89%", duration: "1h 47m" },
        { id: 16, title: "Starnger Things", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2022", rating: "96%", duration: "1h 52m" },
        { id: 17, title: "The OA", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2021", rating: "88%", duration: "1h 38m" },
        { id: 18, title: "Dark Matter", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2023", rating: "93%", duration: "1h 42m" },
      ]
    },
    { 
      id: 4, 
      title: "Action & Adventure", 
      movies: [
        { id: 19, title: "Extraction", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "94%", duration: "1h 56m" },
        { id: 20, title: "The Old Guard", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2021", rating: "90%", duration: "2h 03m" },
        { id: 21, title: "6 Underground", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2019", rating: "87%", duration: "2h 15m" },
        { id: 22, title: "Project Power", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?&w=300&h=180&fit=crop", year: "2020", rating: "92%", duration: "1h 48m" },
        { id: 23, title: "Triple Frontier", imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?&w=300&h=180&fit=crop", year: "2021", rating: "89%", duration: "2h 05m" },
        { id: 24, title: "Outside the Wire", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&w=300&h=180&fit=crop", year: "2022", rating: "86%", duration: "1h 59m" },
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="pt-16 pb-10">
        {genres.map((genre) => (
          <ContentRow 
            key={genre.id}
            title={genre.title}
            movies={genre.movies}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
