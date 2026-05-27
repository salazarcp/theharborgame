import { useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CheckCircle2, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

type ContactModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MIN_FORM_MS = 2000;

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — must stay empty
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setWebsite('');
    setSent(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(resetForm, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elapsed = Date.now() - openedAtRef.current;
    const looksLikeBot = website.trim() !== '' || elapsed < MIN_FORM_MS;

    if (looksLikeBot) {
      // Silently pretend success so bots don't learn what tripped them.
      setLoading(false);
      setSent(true);
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      website, // server does the same check
      openedAt: openedAtRef.current,
    };

    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    });

    if (error) {
      setLoading(false);
      toast.error('Could not send your message. Please try again.');
      console.error(error);
      return;
    }

    // Fire-and-forget notification email. If it fails, the message is still saved.
    supabase.functions.invoke('send-contact-notification', { body: payload }).catch((err) => {
      console.warn('Notification email failed:', err);
    });

    setLoading(false);
    toast.success('Message sent! We will get back to you soon.');
    setSent(true);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-pure-fade fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content className="modal-pure-fade fixed top-[50%] left-[50%] z-50 w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border border-amber-900/30 bg-[#1a1410] shadow-[0_0_60px_-15px_rgba(249,115,22,0.25)]">
          {/* Grid pattern background */}
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

          {/* Close button */}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-amber-100/50 hover:text-amber-100 hover:bg-amber-100/10 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </DialogPrimitive.Close>

          <div className="relative p-8">
            {sent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-orange-400" />
                </div>
                <DialogPrimitive.Title className="font-orbitron font-bold text-2xl text-amber-100 mb-3">
                  MESSAGE <span className="text-orange-500">SENT</span>
                </DialogPrimitive.Title>
                <p className="text-amber-100/60 text-sm leading-relaxed max-w-xs mx-auto">
                  Thanks for reaching out. Our team will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-500 text-amber-100 text-sm font-rajdhani font-semibold rounded-lg transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <DialogPrimitive.Title className="font-orbitron font-bold text-2xl md:text-3xl text-amber-100 mb-2">
                  CONTACT <span className="text-orange-500">SUPPORT</span>
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-amber-100/50 text-sm mb-6">
                  Send us a message and we'll get back to you as soon as possible.
                </DialogPrimitive.Description>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot — hidden from real users; bots that blindly fill every field trip it. */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-amber-100/70 text-xs font-rajdhani font-semibold uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-amber-100/5 border border-amber-900/30 rounded-lg px-3 py-2 text-amber-100 text-sm placeholder:text-amber-100/30 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-amber-100/70 text-xs font-rajdhani font-semibold uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-amber-100/5 border border-amber-900/30 rounded-lg px-3 py-2 text-amber-100 text-sm placeholder:text-amber-100/30 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-amber-100/70 text-xs font-rajdhani font-semibold uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-amber-100/5 border border-amber-900/30 rounded-lg px-3 py-2 text-amber-100 text-sm placeholder:text-amber-100/30 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-amber-100/70 text-xs font-rajdhani font-semibold uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-amber-100/5 border border-amber-900/30 rounded-lg px-3 py-2 text-amber-100 text-sm placeholder:text-amber-100/30 focus:outline-none focus:border-orange-500 transition-colors duration-300 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-amber-100 text-sm font-rajdhani font-semibold uppercase tracking-wider rounded-lg transition-colors duration-300"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ContactModal;
