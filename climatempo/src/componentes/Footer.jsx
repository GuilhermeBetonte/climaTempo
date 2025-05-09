const Footer = () => {
    return (
      <footer className="w-full h-20 bg-black/50 text-white py-3 fixed bottom-0 left-0 z-50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    {/* Texto principal */}
                    <p className="text-sm md:text-base font-mono flex items-center">
                        <i className="fa-solid fa-code text-blue-400 mr-2"></i>
                        Desenvolvido por/Developed by{' '}
                        <a
                            href="https://www.linkedin.com/in/guibetonte/"
                            className="underline text-blue-300 hover:text-blue-200 ml-1 transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Guilherme Okagawa
                        </a>
                    </p>
                    {/* Divisor */}
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-2"></div>
                    {/* Ícones de tecnologias */}
                    <div className="flex space-x-4 text-xl mt-1">
                        <i className="fab fa-html5 text-orange-500 hover:text-orange-400 transition-colors duration-200" title="HTML5"></i>
                        <i className="fab fa-css3-alt text-blue-400 hover:text-blue-300 transition-colors duration-200" title="CSS3"></i>
                        {/* <i className="fab fa-js-square text-yellow-400 hover:text-yellow-300 transition-colors duration-200" title="JavaScript"></i> */}
                        <i className="fab fa-react text-cyan-400 hover:text-cyan-300 transition-colors duration-200" title="React"></i>
                        <i className="fab fa-node-js text-green-500 hover:text-green-400 transition-colors duration-200" title="Node.js"></i>
                        <span className="relative w-5 h-5 mt-1" title="Tailwind CSS">
                            <svg viewBox="0 0 54 33" fill="currentColor" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                                <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;