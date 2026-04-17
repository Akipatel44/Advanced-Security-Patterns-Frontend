export default function IconKey({ className = 'w-8 h-8 text-primary-500' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11a4 4 0 1 1-7.874 1.416L7 19l-4-4 4.172-4.172A4 4 0 0 1 21 11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7l1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
