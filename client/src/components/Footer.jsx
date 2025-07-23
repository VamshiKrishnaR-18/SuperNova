const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Branding */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <img 
              src="/images/supernova-logo.png" 
              alt="SuperNova Logo" 
              className="w-28 mb-2 mx-auto md:mx-0"
            />
            <p className="text-xs">The Premium Shopping Destination</p>
          </div>

          {/* Contact Info */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <p className="text-xs">
              Email:
              <a 
                href="mailto:support@supernova.com" 
                className="text-blue-400 hover:underline ml-1"
              >
                support@supernova.com
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-3 justify-center md:justify-start mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-700" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs">&copy; 2025 SuperNova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
