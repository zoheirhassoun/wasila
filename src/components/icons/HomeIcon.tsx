interface Props {
  className?: string;
  size?: number;
}

export default function HomeIcon({ className, size = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 12h3v10h6v-6h2v6h6V12h3L12 2zm0 2.5l6 5.5v7.5h-4v-5h-4v5H6v-7.5l6-5.5z" />
    </svg>
  );
}
