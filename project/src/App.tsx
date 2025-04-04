import React, { useState } from 'react';
import { Book, Library, Moon, ScrollText, Sun, Users, Pen, MessageSquare, Heart, Share2, BookOpen, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

// Types
interface BookType {
  id: number;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  year: string;
  likes: number;
  comments: number;
  shares: number;
}

interface WriterType {
  id: number;
  name: string;
  avatar: string;
  followers: number;
  bio: string;
}

// Data
const books: BookType[] = [
  {
    id: 1,
    title: 'गोदान',
    author: 'मुंशी प्रेमचंद',
    genre: 'उपन्यास',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    year: '1936',
    likes: 2345,
    comments: 128,
    shares: 456
  },
  {
    id: 2,
    title: 'आंधायुग',
    author: 'धर्मवीर भारती',
    genre: 'नाटक',
    coverUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=400',
    year: '1954',
    likes: 1890,
    comments: 89,
    shares: 234
  },
  {
    id: 3,
    title: 'निर्मला',
    author: 'मुंशी प्रेमचंद',
    genre: 'उपन्यास',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400',
    year: '1925',
    likes: 2156,
    comments: 167,
    shares: 378
  }
];

const writers: WriterType[] = [
  {
    id: 1,
    name: 'राजेश कुमार',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    followers: 1234,
    bio: 'आधुनिक हिंदी कविता और कहानी के लेखक'
  },
  {
    id: 2,
    name: 'मीरा शर्मा',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    followers: 2345,
    bio: 'उपन्यासकार और समीक्षक'
  }
];

const genres = ['सभी', 'उपन्यास', 'नाटक', 'कहानी', 'कविता'];

const riddles = [
  'जो बोले वो खो जाए, जो मौन रहे वो पा जाए। क्या है वो?',
  'आँख से देखा न जाए, बिना आँख के पहचाना जाए। क्या है वो?',
  'जब तक जीवित था तब तक चला नहीं, मरने के बाद चलने लगा। क्या है वो?',
  'एक राजा की कोई रानी नहीं, फिर भी राजा के बेटे हैं। कैसे?',
  'जो है वो दिखता नहीं, जो दिखता है वो है नहीं। क्या है वो?'
];

type View = 'books' | 'writers' | 'community' | 'profile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full md:w-auto px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
      ${isActive 
        ? 'bg-orange-600 dark:bg-orange-500 text-white' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

function App() {
  const [selectedGenre, setSelectedGenre] = useState('सभी');
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [currentView, setCurrentView] = useState<View>('books');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const filteredBooks = selectedGenre === 'सभी' 
    ? books 
    : books.filter(book => book.genre === selectedGenre);

  // Auto-rotate riddles
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRiddle(prev => (prev + 1) % riddles.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'writers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writers.map(writer => (
              <div key={writer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <img src={writer.avatar} alt={writer.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{writer.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{writer.followers} अनुयायी</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">{writer.bio}</p>
                <button className="mt-4 w-full bg-orange-600 dark:bg-orange-500 text-white py-2 rounded-md hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors duration-200">
                  अनुसरण करें
                </button>
              </div>
            ))}
          </div>
        );
      
      case 'community':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">साहित्यिक समुदाय</h2>
            <div className="space-y-6">
              <div className="border-b dark:border-gray-700 pb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">आज की चर्चा</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  "क्या आधुनिक हिंदी साहित्य में प्रेमचंद की प्रासंगिकता कम हो रही है?"
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>टिप्पणी करें</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500">
                    <Share2 className="h-4 w-4" />
                    <span>साझा करें</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">मेरा प्रोफ़ाइल</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">पाठक</h3>
                  <p className="text-gray-600 dark:text-gray-400">2023 से सदस्य</p>
                </div>
              </div>
              <div className="border-t dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">मेरी पुस्तक सूची</h4>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">अभी तक कोई पुस्तक नहीं जोड़ी गई</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-200">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{book.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{book.author}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{book.year}</span>
                    <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 text-sm px-3 py-1 rounded-full">
                      {book.genre}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-orange-600 dark:hover:text-orange-500">
                      <Heart className="h-4 w-4" />
                      <span>{book.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-orange-600 dark:hover:text-orange-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>{book.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-orange-600 dark:hover:text-orange-500">
                      <Share2 className="h-4 w-4" />
                      <span>{book.shares}</span>
                    </button>
                  </div>
                  <button className="mt-4 w-full bg-orange-600 dark:bg-orange-500 text-white py-2 rounded-md hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>पढ़ें</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Library className="h-8 w-8 text-orange-600 dark:text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">हिंदी साहित्य पुस्तकालय</h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-4">
                <NavItem
                  icon={<Book className="h-4 w-4" />}
                  label="पुस्तकें"
                  isActive={currentView === 'books'}
                  onClick={() => setCurrentView('books')}
                />
                <NavItem
                  icon={<Pen className="h-4 w-4" />}
                  label="लेखक"
                  isActive={currentView === 'writers'}
                  onClick={() => setCurrentView('writers')}
                />
                <NavItem
                  icon={<Users className="h-4 w-4" />}
                  label="समुदाय"
                  isActive={currentView === 'community'}
                  onClick={() => setCurrentView('community')}
                />
                <NavItem
                  icon={<Users className="h-4 w-4" />}
                  label="प्रोफ़ाइल"
                  isActive={currentView === 'profile'}
                  onClick={() => setCurrentView('profile')}
                />
              </nav>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-300" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-4 space-y-2 z-50">
              <NavItem
                icon={<Book className="h-4 w-4" />}
                label="पुस्तकें"
                isActive={currentView === 'books'}
                onClick={() => {
                  setCurrentView('books');
                  setIsMenuOpen(false);
                }}
              />
              <NavItem
                icon={<Pen className="h-4 w-4" />}
                label="लेखक"
                isActive={currentView === 'writers'}
                onClick={() => {
                  setCurrentView('writers');
                  setIsMenuOpen(false);
                }}
              />
              <NavItem
                icon={<Users className="h-4 w-4" />}
                label="समुदाय"
                isActive={currentView === 'community'}
                onClick={() => {
                  setCurrentView('community');
                  setIsMenuOpen(false);
                }}
              />
              <NavItem
                icon={<Users className="h-4 w-4" />}
                label="प्रोफ़ाइल"
                isActive={currentView === 'profile'}
                onClick={() => {
                  setCurrentView('profile');
                  setIsMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Riddle Banner */}
      <div className="bg-orange-600 dark:bg-orange-700 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <ScrollText className="h-5 w-5" />
            <p className="text-lg font-medium">{riddles[currentRiddle]}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'books' && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                    selectedGenre === genre
                      ? 'bg-orange-600 dark:bg-orange-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 dark:text-gray-500">
              "जो धैर्य रखता है, वही ज्ञान प्राप्त करता है..."
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">© 2025 हिंदी साहित्य पुस्तकालय</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;