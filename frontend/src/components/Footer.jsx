const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto">
        <p className="mb-2">© {new Date().getFullYear()} Property Connect. All rights reserved.</p>
        <nav className="flex justify-center space-x-4">
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
