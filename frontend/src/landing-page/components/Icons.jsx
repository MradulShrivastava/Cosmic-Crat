function Svg({ children, className, viewBox = "0 0 24 24" }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function Icon({ name, className }) {
  const icons = {
    search: (
      <Svg className={className}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </Svg>
    ),
    user: (
      <Svg className={className}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 19c1.7-3 4.1-4.5 6.5-4.5S16.8 16 18.5 19" />
      </Svg>
    ),
    bag: (
      <Svg className={className}>
        <path d="M7 9h10l-1 10H8L7 9Z" />
        <path d="M9.5 9V7.8A2.5 2.5 0 0 1 12 5.3a2.5 2.5 0 0 1 2.5 2.5V9" />
      </Svg>
    ),
    diamond: (
      <Svg className={className}>
        <path d="m12 3 6.7 7L12 21 5.3 10 12 3Z" />
        <path d="M7.8 7.6h8.4" />
      </Svg>
    ),
    heart: (
      <Svg className={className}>
        <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
      </Svg>
    ),
    delivery: (
      <Svg className={className}>
        <path d="M3.5 7.5h10v8h-10Z" />
        <path d="M13.5 10.5h3.2l2 2.3v2.7h-5.2" />
        <circle cx="8" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </Svg>
    ),
    "moon-stars": (
      <Svg className={className}>
        <path d="M15.5 4.5a7 7 0 1 0 4 12.8 7.5 7.5 0 0 1-4-12.8Z" />
        <path d="m17.3 5.7.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z" />
      </Svg>
    ),
    gift: (
      <Svg className={className}>
        <path d="M4 10h16v10H4Z" />
        <path d="M12 10v10" />
        <path d="M4 7.5h16V10H4Z" />
        <path d="M12 7.5c0-2-1.2-3.5-3-3.5-1.5 0-2.5 1-2.5 2.2 0 1.4 1.4 1.9 3.2 1.9H12Z" />
        <path d="M12 7.5c0-2 1.2-3.5 3-3.5 1.5 0 2.5 1 2.5 2.2 0 1.4-1.4 1.9-3.2 1.9H12Z" />
      </Svg>
    ),
    leaf: (
      <Svg className={className}>
        <path d="M18 5c-7.5.8-11.9 5.1-12.8 12.7 4.3 1.1 8.7-.1 11.6-3 2.9-2.9 4.1-7.3 3-11.7-.6.6-1.2 1.3-1.8 2Z" />
        <path d="M8 16c2.2-2.2 4.6-4 7.3-5.4" />
      </Svg>
    ),
    "zodiac-wheel": (
      <Svg className={className}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 4v16M4 12h16M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6" />
      </Svg>
    ),
    message: (
      <Svg className={className}>
        <path d="M4 6.5h16v11H8l-4 3v-14Z" />
        <path d="m7.5 9 4.5 3 4.5-3" />
      </Svg>
    ),
    "open-box": (
      <Svg className={className}>
        <path d="m4 9 8-4 8 4-8 4-8-4Z" />
        <path d="M4 9v7l8 4 8-4V9" />
        <path d="M12 13v7" />
      </Svg>
    ),
    lotus: (
      <Svg className={className}>
        <path d="M12 19c3.6 0 5.8-2.3 6.8-5.5-2 .2-3.7-.3-5-1.5-.7 1.2-1.2 2.2-1.8 3-.6-.8-1.1-1.8-1.8-3-1.3 1.2-3 1.7-5 1.5C6.2 16.7 8.4 19 12 19Z" />
        <path d="M12 6c1.6 1.4 2.5 3.4 2.6 5.6-1.3-.5-2.2-1.3-2.6-2.6-.4 1.3-1.3 2.1-2.6 2.6.1-2.2 1-4.2 2.6-5.6Z" />
      </Svg>
    ),
    sparkle: (
      <Svg className={className}>
        <path d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.4 9.3l6-.9L12 3Z" />
      </Svg>
    ),
    users: (
      <Svg className={className}>
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10.5" r="2.5" />
        <path d="M3.5 18c1.1-2.7 3.2-4 5.5-4s4.4 1.3 5.5 4" />
        <path d="M14 17.5c.8-1.6 2.2-2.4 3.8-2.4 1.2 0 2.3.5 3.2 1.6" />
      </Svg>
    ),
    star: (
      <Svg className={className}>
        <path d="m12 3 2.6 5.4 6 .9-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.4 9.3l6-.9L12 3Z" />
      </Svg>
    ),
    "chevron-left": (
      <Svg className={className}>
        <path d="m14.5 6.5-5 5 5 5" />
      </Svg>
    ),
    "chevron-right": (
      <Svg className={className}>
        <path d="m9.5 6.5 5 5-5 5" />
      </Svg>
    ),
  };

  return icons[name] ?? null;
}
