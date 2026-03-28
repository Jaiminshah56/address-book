/**
 * Simple loading spinner component.
 */
import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
      <p className="text-gray-400 font-medium">{text}</p>
    </div>
  );
}
