import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Zer0Point Tech Ltd ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.zer0point.io (the "Site") or engage with our services. This policy is drafted in compliance with the applicable federal laws of the United Arab Emirates (UAE), including the Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p>We may collect and process the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, job title, and company name when you voluntarily provide it through our contact forms.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and usage patterns collected automatically via cookies and analytics tools to improve website performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To provide and manage our consulting and business development services.</li>
                <li>To communicate with you regarding inquiries, updates, and service offerings.</li>
                <li>To improve our website functionality and user experience.</li>
                <li>To comply with legal obligations and regulatory requirements in the UAE.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and conducting our business, subject to confidentiality agreements.</li>
                <li><strong>Legal Compliance:</strong> When required by UAE law or to protect our rights, safety, or property.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p>Under UAE data protection laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your personal data ("Right to be Forgotten"), subject to legal retention requirements.</li>
                <li>Withdraw consent for data processing at any time.</li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:info@zer0point.io" className="text-primary hover:underline">info@zer0point.io</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some website functionalities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Zer0Point Tech Ltd</strong><br />
                Level 3, Innovation Hub, DIFC<br />
                Dubai, United Arab Emirates<br />
                Email: <a href="mailto:info@zer0point.io" className="text-primary hover:underline">info@zer0point.io</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
