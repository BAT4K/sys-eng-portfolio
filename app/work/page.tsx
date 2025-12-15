// app/work/page.tsx
import Projects from '@/components/Projects';

export default function Work() {
  return (
    // Removed 'min-h-screen' to fix footer visibility
    <div className="w-full pt-6 md:pt-12">
      <Projects />
    </div>
  );
}