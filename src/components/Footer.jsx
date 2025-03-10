const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-4 text-center">
      <div className="flex items-center justify-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432...." />
        </svg>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
