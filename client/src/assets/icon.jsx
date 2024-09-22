import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <div className="flex items-center justify-center">
    <Link to="/">
      <svg
        className="h-10 w-10"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m2 7 4.5-2.5 4 2.5 4.5-2.5 4 2.5" />
        <path d="M2 17c1.6-2 3.4-3 5.5-3 3.5 0 7 3 12.5 0" />
        <path d="M2 12c1.6-2 3.4-3 5.5-3 3.5 0 7 3 12.5 0" />
      </svg>
      <span className="sr-only">Logo Ecommerce</span>
    </Link>
  </div>
);
