import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

type ImageLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string | null;
  alt?: string;
};

const ImageLightbox = ({ open, onOpenChange, src, alt = '' }: ImageLightboxProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-pure-fade fixed inset-0 z-50 bg-black/80 backdrop-blur-md" />
        <DialogPrimitive.Content
          className="modal-pure-fade fixed top-[50%] left-[50%] z-50 w-[calc(100%-2rem)] max-w-[min(92vw,1400px)] max-h-[92vh] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-2xl border border-amber-900/30 bg-[#1a1410] shadow-[0_0_80px_-15px_rgba(249,115,22,0.35)]"
        >
          <DialogPrimitive.Title className="sr-only">Screenshot preview</DialogPrimitive.Title>

          {/* Close button */}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg flex items-center justify-center bg-black/50 backdrop-blur-sm text-amber-100/70 hover:text-amber-100 hover:bg-black/70 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </DialogPrimitive.Close>

          {src && (
            <img
              src={src}
              alt={alt}
              className="block w-full h-auto max-h-[92vh] object-contain"
            />
          )}

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-orange-500/50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ImageLightbox;
