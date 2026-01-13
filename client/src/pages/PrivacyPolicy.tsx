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
          <p className="text-muted-foreground mb-8">Last Updated: January 13, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Zer0Point Tech Ltd ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.zer0point.io (the "Site") or engage with our services. This policy is drafted in compliance with the applicable federal laws of the United Arab Emirates (UAE), including the Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, and the EU General Data Protection Regulation (GDPR) where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p>We may collect and process the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Contact Form Information:</strong> Name, email address, phone number, subject, and message content when you voluntarily submit our contact form. This information is transmitted directly to our business email and is <strong>not stored in any database</strong> on our servers.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and usage patterns collected automatically via cookies and analytics tools to improve website performance and security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage and Retention</h2>
              <p>
                <strong>Important:</strong> We do not operate a database to store your personal information submitted through our contact form. When you submit a contact form inquiry:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your information is transmitted directly via email to our business team.</li>
                <li>No copy of your submission is retained on our website servers.</li>
                <li>Your data is stored only within our business email system (Google Workspace), subject to Google's privacy and security standards.</li>
                <li>We retain contact form emails for as long as necessary to respond to your inquiry and maintain business records, typically no longer than 3 years unless required for legal purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Your Information</h2>
              <p>We use the collected data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To respond to your inquiries and provide information about our consulting and business development services.</li>
                <li>To communicate with you regarding potential business opportunities.</li>
                <li>To improve our website functionality and user experience.</li>
                <li>To protect against spam and fraudulent submissions (via reCAPTCHA).</li>
                <li>To comply with legal obligations and regulatory requirements in the UAE.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Email Service Provider:</strong> Google Workspace for email transmission and storage, subject to Google's privacy policies.</li>
                <li><strong>Security Services:</strong> Google reCAPTCHA Enterprise for spam protection, which may collect technical data as described in Google's privacy policy.</li>
                <li><strong>Hosting Provider:</strong> Vercel for website hosting, which may process technical data as described in their privacy policy.</li>
                <li><strong>Legal Compliance:</strong> When required by UAE law, GDPR, or to protect our rights, safety, or property.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>SSL/TLS encryption for all data transmitted through our website.</li>
                <li>reCAPTCHA Enterprise to prevent automated spam submissions.</li>
                <li>Secure email transmission protocols.</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p>Under UAE data protection laws and GDPR (where applicable), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Access:</strong> Request information about what personal data we hold about you.</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data ("Right to be Forgotten"), subject to legal retention requirements.</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your personal data.</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a structured, commonly used format.</li>
                <li><strong>Objection:</strong> Object to processing of your personal data for direct marketing purposes.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time.</li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:info@zer0point.io" className="text-primary hover:underline">info@zer0point.io</a>. We will respond to your request within 30 days.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
              <p>
                Our website uses the following cookies and tracking technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
                <li><strong>reCAPTCHA:</strong> Google reCAPTCHA may set cookies to verify you are not a robot and protect against spam.</li>
                <li><strong>Analytics:</strong> We may use analytics tools to understand how visitors interact with our website.</li>
              </ul>
              <p className="mt-4">
                You can choose to disable cookies through your browser settings, though this may affect some website functionalities including the contact form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries outside the UAE, including the United States (for Google and Vercel services). These transfers are conducted in compliance with applicable data protection laws and appropriate safeguards are in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of the Site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, wish to exercise your data rights, or have concerns about how we handle your personal data, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Zer0Point Tech Ltd</strong><br />
                Level 3, Innovation Hub, DIFC<br />
                Dubai, United Arab Emirates<br />
                Email: <a href="mailto:info@zer0point.io" className="text-primary hover:underline">info@zer0point.io</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Legal Basis for Processing (GDPR)</h2>
              <p>
                For users in the European Economic Area (EEA), we process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Consent:</strong> When you submit the contact form, you consent to the processing of your data for the purpose of responding to your inquiry.</li>
                <li><strong>Legitimate Interests:</strong> We may process data for our legitimate business interests, such as improving our services and protecting against fraud.</li>
                <li><strong>Legal Obligation:</strong> We may process data to comply with legal requirements.</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
