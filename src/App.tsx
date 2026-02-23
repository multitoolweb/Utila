import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Github, 
  ArrowLeft
} from 'lucide-react';
import { CATEGORIES } from './constants';
import { Category, Tool, StaticPageType } from './types';
import { cn } from './utils';

// Import Tools
import { ImageConverter } from './components/tools/ImageConverter';
import { ImageCompressor } from './components/tools/ImageCompressor';
import { ImageResizer } from './components/tools/ImageResizer';
import { ImageCropper } from './components/tools/ImageCropper';
import { ImageToText } from './components/tools/ImageToText';
import { PDFToWord } from './components/tools/PDFToWord';
import { PDFMerger } from './components/tools/PDFMerger';
import { CaseConverter } from './components/tools/CaseConverter';
import { WordCounter } from './components/tools/WordCounter';
import { RemoveDuplicates } from './components/tools/RemoveDuplicates';
import { TextSorter } from './components/tools/TextSorter';
import { BMICalculator } from './components/tools/BMICalculator';
import { AgeCalculator } from './components/tools/AgeCalculator';
import { LoanCalculator } from './components/tools/LoanCalculator';
import { QRCodeGenerator } from './components/tools/QRCodeGenerator';
import { JSONFormatter } from './components/tools/JSONFormatter';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { ColorPicker } from './components/tools/ColorPicker';
import { GradientGenerator } from './components/tools/GradientGenerator';
import { Base64Tool } from './components/tools/Base64Tool';
import { URLEncoder } from './components/tools/URLEncoder';
import { UUIDGenerator } from './components/tools/UUIDGenerator';
import { UnitConverter } from './components/tools/UnitConverter';

// Import Static Pages
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsConditions } from './components/pages/TermsConditions';
import { Disclaimer } from './components/pages/Disclaimer';
import { CookiePolicy } from './components/pages/CookiePolicy';
import { AboutUs } from './components/pages/AboutUs';
import { ContactUs } from './components/pages/ContactUs';
import { DMCAPolicy } from './components/pages/DMCAPolicy';

const ComingSoon = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mb-4">
      <Github size={32} className="text-black/20" />
    </div>
    <h3 className="text-xl font-bold">{name} is coming soon</h3>
    <p className="text-black/40 max-w-xs mx-auto mt-2">We are working hard to bring this tool to you. Stay tuned!</p>
  </div>
);

const TOOLS: Tool[] = [
  // Image Tools
  { id: 'img-conv', name: 'Image Converter', description: 'Convert images between PNG, JPG, and WebP formats.', category: 'Image', icon: CATEGORIES[0].icon, component: ImageConverter },
  { id: 'img-comp', name: 'Image Compressor', description: 'Reduce image file size while maintaining visual quality.', category: 'Image', icon: CATEGORIES[0].icon, component: ImageCompressor },
  { id: 'img-resize', name: 'Image Resizer', description: 'Change the dimensions of your images easily.', category: 'Image', icon: CATEGORIES[0].icon, component: ImageResizer },
  { id: 'img-crop', name: 'Image Cropper', description: 'Crop images to specific aspect ratios or custom sizes.', category: 'Image', icon: CATEGORIES[0].icon, component: ImageCropper },
  { id: 'img-ocr', name: 'Image to Text (OCR)', description: 'Extract text from images using optical character recognition.', category: 'Image', icon: CATEGORIES[0].icon, component: ImageToText },
  
  // Document Tools
  { id: 'doc-pdf-word', name: 'PDF to Word', description: 'Convert PDF documents to editable Word files.', category: 'Document', icon: CATEGORIES[1].icon, component: PDFToWord },
  { id: 'doc-pdf-merge', name: 'PDF Merger', description: 'Combine multiple PDF files into a single document.', category: 'Document', icon: CATEGORIES[1].icon, component: PDFMerger },
  
  // Calculator Tools
  { id: 'calc-bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index based on height and weight.', category: 'Calculator', icon: CATEGORIES[2].icon, component: BMICalculator },
  { id: 'calc-age', name: 'Age Calculator', description: 'Find out exactly how old you are in years, months, and days.', category: 'Calculator', icon: CATEGORIES[2].icon, component: AgeCalculator },
  { id: 'calc-loan', name: 'Loan EMI Calculator', description: 'Calculate monthly installments for your loans.', category: 'Calculator', icon: CATEGORIES[2].icon, component: LoanCalculator },
  
  // Text Tools
  { id: 'txt-case', name: 'Case Converter', description: 'Change text to UPPERCASE, lowercase, Title Case, etc.', category: 'Text', icon: CATEGORIES[3].icon, component: CaseConverter },
  { id: 'txt-count', name: 'Word Counter', description: 'Detailed statistics for words, characters, and reading time.', category: 'Text', icon: CATEGORIES[3].icon, component: WordCounter },
  { id: 'txt-dup', name: 'Remove Duplicates', description: 'Clean up your lists by removing duplicate lines.', category: 'Text', icon: CATEGORIES[3].icon, component: RemoveDuplicates },
  { id: 'txt-sort', name: 'Text Sorter', description: 'Sort lines of text alphabetically or in reverse.', category: 'Text', icon: CATEGORIES[3].icon, component: TextSorter },
  
  // Developer Tools
  { id: 'dev-json', name: 'JSON Formatter', description: 'Prettify, minify, and validate JSON data.', category: 'Developer', icon: CATEGORIES[4].icon, component: JSONFormatter },
  { id: 'dev-b64', name: 'Base64 Tool', description: 'Encode and decode text to/from Base64 format.', category: 'Developer', icon: CATEGORIES[4].icon, component: Base64Tool },
  { id: 'dev-url', name: 'URL Encoder', description: 'Encode and decode URLs safely for web transmission.', category: 'Developer', icon: CATEGORIES[4].icon, component: URLEncoder },
  
  // Color Tools
  { id: 'col-picker', name: 'Color Picker', description: 'Interactive color selection with HEX, RGB, and HSL outputs.', category: 'Color', icon: CATEGORIES[5].icon, component: ColorPicker },
  { id: 'col-grad', name: 'Gradient Generator', description: 'Create beautiful CSS gradients for your projects.', category: 'Color', icon: CATEGORIES[5].icon, component: GradientGenerator },
  
  // Utility Tools
  { id: 'util-qr', name: 'QR Code Generator', description: 'Generate high-quality QR codes for URLs or text.', category: 'Utility', icon: CATEGORIES[6].icon, component: QRCodeGenerator },
  { id: 'util-pass', name: 'Password Generator', description: 'Create secure, random passwords with custom rules.', category: 'Utility', icon: CATEGORIES[6].icon, component: PasswordGenerator },
  { id: 'util-uuid', name: 'UUID Generator', description: 'Generate universally unique identifiers (v4).', category: 'Utility', icon: CATEGORIES[6].icon, component: UUIDGenerator },
  { id: 'util-unit', name: 'Unit Converter', description: 'Convert between length, weight, and temperature units.', category: 'Utility', icon: CATEGORIES[6].icon, component: UnitConverter },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<StaticPageType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeTool = useMemo(() => 
    TOOLS.find(t => t.id === activeToolId), 
    [activeToolId]
  );

  const renderPage = () => {
    switch (activePage) {
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsConditions />;
      case 'disclaimer': return <Disclaimer />;
      case 'cookies': return <CookiePolicy />;
      case 'about': return <AboutUs />;
      case 'contact': return <ContactUs />;
      case 'dmca': return <DMCAPolicy />;
      default: return null;
    }
  };

  const handleNavigateHome = () => {
    setActiveToolId(null);
    setActivePage(null);
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#141414] font-sans selection:bg-emerald-200 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#141414]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-black/5 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleNavigateHome}
            >
              <div className="w-8 h-8 bg-[#141414] rounded-lg flex items-center justify-center text-white font-bold">
                O
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">UTILA</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={18} />
              <input 
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/5 border-transparent focus:bg-white focus:border-black/10 rounded-xl transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 rounded-lg text-black/60">
              <Github size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-1 w-full">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#141414]/5 transform transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}>
          <nav className="p-4 space-y-1 h-[calc(100vh-64px)] overflow-y-auto">
            <button
              onClick={() => {
                handleNavigateHome();
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                (selectedCategory === 'All' && !activeToolId && !activePage) ? "bg-black text-white" : "hover:bg-black/5 text-black/60"
              )}
            >
              <Menu size={18} />
              All Tools
            </button>
            <div className="h-px bg-black/5 my-4" />
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">Categories</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveToolId(null);
                  setActivePage(null);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  (selectedCategory === cat.id && !activePage) ? "bg-black text-white" : "hover:bg-black/5 text-black/60"
                )}
              >
                <cat.icon size={18} className={cn(selectedCategory === cat.id && !activePage ? "text-white" : cat.color)} />
                {cat.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            {activePage ? (
              <motion.div
                key="page"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-[40px] border border-black/5 shadow-sm"
              >
                <button 
                  onClick={() => setActivePage(null)}
                  className="flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black mb-8 group transition-colors"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Tools
                </button>
                {renderPage()}
              </motion.div>
            ) : activeTool ? (
              <motion.div
                key="tool"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <button 
                  onClick={() => setActiveToolId(null)}
                  className="flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black mb-6 group transition-colors"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to {selectedCategory === 'All' ? 'All Tools' : selectedCategory}
                </button>

                <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-black/5 bg-black/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-2xl bg-white shadow-sm", CATEGORIES.find(c => c.id === activeTool.category)?.color)}>
                        <activeTool.icon size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight">{activeTool.name}</h2>
                        <p className="text-sm text-black/60">{activeTool.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <activeTool.component />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight mb-2">
                    {selectedCategory === 'All' ? 'Explore All Tools' : `${selectedCategory} Tools`}
                  </h1>
                  <p className="text-black/60">
                    {filteredTools.length} tools available in this category
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool) => (
                    <motion.button
                      layoutId={tool.id}
                      key={tool.id}
                      onClick={() => setActiveToolId(tool.id)}
                      className="group text-left bg-white p-5 rounded-3xl border border-black/5 hover:border-black/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300",
                        "bg-black/[0.03]",
                        CATEGORIES.find(c => c.id === tool.category)?.color
                      )}>
                        <tool.icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">{tool.name}</h3>
                      <p className="text-sm text-black/50 leading-relaxed line-clamp-2">{tool.description}</p>
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={20} className="text-black/20" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-black/20" />
                    </div>
                    <h3 className="text-lg font-bold">No tools found</h3>
                    <p className="text-black/40">Try adjusting your search or category filter</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#141414] rounded-lg flex items-center justify-center text-white font-bold">O</div>
                <span className="font-bold text-xl tracking-tight">UTILA</span>
              </div>
              <p className="text-sm text-black/60 max-w-xs">
                Your one-stop destination for all web utility tools. Fast, secure, and always free.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActivePage('about')} className="text-sm text-black/40 hover:text-black transition-colors">About Us</button></li>
                <li><button onClick={() => setActivePage('contact')} className="text-sm text-black/40 hover:text-black transition-colors">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActivePage('privacy')} className="text-sm text-black/40 hover:text-black transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setActivePage('terms')} className="text-sm text-black/40 hover:text-black transition-colors">Terms & Conditions</button></li>
                <li><button onClick={() => setActivePage('disclaimer')} className="text-sm text-black/40 hover:text-black transition-colors">Disclaimer</button></li>
                <li><button onClick={() => setActivePage('cookies')} className="text-sm text-black/40 hover:text-black transition-colors">Cookie Policy</button></li>
                <li><button onClick={() => setActivePage('dmca')} className="text-sm text-black/40 hover:text-black transition-colors">DMCA Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-black/5 text-center">
            <p className="text-sm text-black/40">
              © {new Date().getFullYear()} UTILA. Built with precision for the modern web.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
