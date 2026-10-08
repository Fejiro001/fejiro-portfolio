import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "feather-icons-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Fejiro001",
    icon: Github
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oghenefejiro-abere-487b08161/",
    icon: Linkedin
  },
  {
    label: "Frontend Mentor",
    href: "https://www.frontendmentor.io/profile/Fejiro001",
    icon: ArrowUpRight
  }
];

export default function ContactFooter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data, null, 2)
    });
    const result = await response.json();

    if (result.success) {
      reset();
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      console.log(result);
    }
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-border px-6 md:px-10 pt-20 md:pt-32 pb-10 bg-accent text-accent-foreground overflow-hidden">
      <div className="section-width">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-foreground/70 mb-6">
          06 — Let's Work Together
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-light tracking-tight leading-[0.9]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}>
          Have a project
          <br />
          or opportunity?
        </motion.h2>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10">
          {/* Contact form */}
          <div className="md:col-span-7">
            {isSubmitSuccessful && isSuccess ? (
              <div className="border border-accent-foreground/20 bg-accent-foreground/5 p-10">
                <p className="font-mono text-xs uppercase tracking-[0.3em] mb-3 text-accent-foreground/70">
                  Confirmation
                </p>
                <p className="text-xl md:text-2xl font-light">
                  Your message has been sent successfully. I'll be in touch
                  shortly.
                </p>
                <button
                  onClick={() => reset()}
                  className="mt-6 font-mono text-xs uppercase tracking-[0.2em] underline underline-offset-4">
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-px bg-accent-foreground/15">
                <input
                  type="hidden"
                  value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}
                  {...register("access_key")}
                />
                <div className="flex items-center bg-accent">
                  <label className="font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground/60 w-28 md:w-36 px-4 md:px-6 shrink-0">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="flex-1 bg-accent h-14 px-4 py-3 text-lg font-light placeholder:text-accent-foreground/40 focus:outline-none focus:ring-0"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="font-mono text-xs text-accent-foreground/80 ml-4">
                      Name is required
                    </span>
                  )}
                </div>
                <div className="flex items-center bg-accent border-t border-accent-foreground/20">
                  <label className="font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground/60 w-28 md:w-36 px-4 md:px-6 shrink-0">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="flex-1 bg-accent h-14 px-4 py-3 text-lg font-light placeholder:text-accent-foreground/40 focus:outline-none focus:ring-0"
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <span className="font-mono text-xs text-accent-foreground/80 ml-4">
                      Email is required
                    </span>
                  )}
                </div>
                <div className="flex bg-accent border-t border-accent-foreground/20">
                  <label className="font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground/60 w-28 md:w-36 px-4 md:px-6 pt-4 shrink-0">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    {...register("message", { required: true })}
                    className="flex-1 bg-accent px-4 py-3 text-lg font-light placeholder:text-accent-foreground/40 focus:outline-none focus:ring-0 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <span className="font-mono text-xs bg-destructive-foreground text-destructive ml-4">
                      Message is required
                    </span>
                  )}
                </div>
                <div className="bg-accent border-t border-accent-foreground/20 p-4 md:p-6 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto inline-flex items-center gap-3 px-8 h-12 bg-accent-foreground text-accent font-mono text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct contact + socials */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/60 mb-3">
                Direct
              </p>
              <a
                href="mailto:fejiroabere@gmail.com"
                className="inline-flex items-center gap-2 text-lg md:text-xl font-light hover:opacity-80 transition-opacity">
                <Mail className="h-5 w-5" />
                aberefejiro@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground/50 mb-3">
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between border-b border-accent-foreground/20 py-3 group">
                    <span className="font-mono text-sm uppercase tracking-[0.2em]">
                      {s.label}
                    </span>
                    <s.icon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-accent-foreground/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground">
            ©{new Date().getFullYear()} Fejiro Abere
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground">
            Built with React · Tailwind CSS
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-foreground hover:text-accent-foreground">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
