import { FaLinkedin } from "react-icons/fa";
import BrandCatgContact from "../ui/brand-catg-contact";
import Newsletter from "../ui/news-letter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <BrandCatgContact />
      <Newsletter />

      <div className="border-t border-gray-700 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} QuirkCart. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/mrarmanalam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
