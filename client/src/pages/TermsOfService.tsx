import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the website www.zer0point.io (the "Site"), operated by Zer0Point Tech Ltd ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site. These Terms are governed by the laws of the United Arab Emirates (UAE).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
              <p>
                Zer0Point Tech Ltd provides business development, consultancy, and digital transformation services. The content on this Site is for general information purposes only and does not constitute binding professional advice unless explicitly agreed upon in a separate written contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p>
                All content, trademarks, logos, and materials available on this Site are the property of Zer0Point Tech Ltd or its licensors and are protected by UAE and international intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Conduct</h2>
              <p>You agree to use the Site only for lawful purposes. You are prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Using the Site in any way that violates applicable UAE federal or local laws.</li>
                <li>Attempting to gain unauthorized access to our systems or networks.</li>
                <li>Transmitting any harmful code, viruses, or malware.</li>
                <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by UAE law, Zer0Point Tech Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the Site. We make no warranties regarding the accuracy, completeness, or reliability of the content provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. These links are provided for convenience only. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use of the Site following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at:
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
