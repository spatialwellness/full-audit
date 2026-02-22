import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Home Office Audit - Spatial Wellness",
  description:
    "A comprehensive spatial wellness audit for your home office. Understand how your workspace affects your wellbeing and get a detailed, personalised action plan.",
  openGraph: {
    title: "Full Home Office Audit",
    description: "Understand how your home office affects your wellbeing.",
    siteName: "Spatial Wellness",
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
              href="https://spatial-wellness.com"
              className="font-playfair text-lg font-medium hover:text-brand-rose transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spatial Wellness
            </a>
            <span className="text-brand-rose text-sm font-lora">
              Full Home Office Audit
            </span>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-brand-dark text-brand-cream py-10 px-6 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h3 className="font-playfair text-lg mb-2">Spatial Wellness</h3>
                <p className="text-brand-rose text-sm font-lora">
                  Home office wellness consultancy
                </p>
              </div>
              <div className="text-sm text-brand-rose font-lora">
                <p>
                  <a
                    href="https://spatial-wellness.com"
                    className="hover:text-brand-cream transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    spatial-wellness.com
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:hello@houseofreturn.nl"
                    className="hover:text-brand-cream transition-colors"
                  >
                    hello@houseofreturn.nl
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-brand-dark/30 text-xs text-brand-rose/70 font-lora">
              <p>
                Colour recommendations reference Farrow and Ball paints for illustrative purposes only. 
                Spatial Wellness has no commercial affiliation with Farrow and Ball. 
                RAL codes are approximate equivalents - always verify with physical samples before purchasing.
              </p>
              <p className="mt-2">
                Product recommendations on this page may include affiliate links. 
                Spatial Wellness may earn a commission on qualifying purchases at no extra cost to you.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
