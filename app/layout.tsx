import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Spatial Wellness Audit - House of Return",
  description:
    "A comprehensive spatial wellness audit for your workplace. Understand how your space affects your people and get a detailed, personalised action plan.",
  openGraph: {
    title: "Full Spatial Wellness Audit",
    description: "Understand how your workplace affects your people.",
    siteName: "House of Return",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navigation */}
        <header className="bg-brand-dark text-brand-cream py-4 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <a
              href="https://houseofreturn.nl"
              className="font-playfair text-lg font-medium hover:text-brand-rose transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              House of Return
            </a>
            <span className="text-brand-rose text-sm font-lora">
              Full Spatial Wellness Audit
            </span>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-brand-dark text-brand-cream py-10 px-6 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h3 className="font-playfair text-lg mb-2">House of Return</h3>
                <p className="text-brand-rose text-sm font-lora">
                  Spatial wellness consultancy
                </p>
              </div>
              <div className="text-sm text-brand-rose font-lora">
                <p>
                  <a
                    href="https://houseofreturn.nl"
                    className="hover:text-brand-cream transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    houseofreturn.nl
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:home@houseofreturn.nl"
                    className="hover:text-brand-cream transition-colors"
                  >
                    home@houseofreturn.nl
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-brand-dark/30 text-xs text-brand-rose/70 font-lora">
              <p>
                Colour recommendations reference Farrow and Ball paints for illustrative purposes only. 
                House of Return has no commercial affiliation with Farrow and Ball. 
                RAL codes are approximate equivalents - always verify with physical samples before purchasing.
              </p>
              <p className="mt-2">
                Product recommendations on this page may include affiliate links. 
                House of Return may earn a commission on qualifying purchases at no extra cost to you.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
