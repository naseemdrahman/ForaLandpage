'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" className="text-white text-3xl lg:text-5xl font-bold tracking-tighter uppercase">
              FORA
            </Link>
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors text-base lg:text-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FORA, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Zero Tolerance for Harassment</h2>
            <p className="mb-4">
              FORA maintains a strict zero-tolerance policy for harassment, abusive language, hate speech, or any form of discriminatory behavior. All users are expected to engage in respectful, civil discourse.
            </p>
            <p className="mb-4">
              Prohibited conduct includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Threats, intimidation, or personal attacks directed at other users</li>
              <li>Hate speech, slurs, or discriminatory language based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic</li>
              <li>Sexual harassment or inappropriate sexual content</li>
              <li>Repeated unwanted contact, stalking, or harassment of other users</li>
              <li>Any language or behavior intended to harm, degrade, intimidate, or silence others</li>
              <li>Doxing or sharing private information about other users</li>
            </ul>
            <p className="mt-4">
              Violations of this policy will result in immediate account suspension or permanent termination. We reserve the right to take appropriate action, including legal action, against users who engage in harassing behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Conduct</h2>
            <p className="mb-4">
              Users are expected to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Engage in respectful, constructive debate</li>
              <li>Follow the rules and guidelines of each debate</li>
              <li>Respect other users' opinions and arguments</li>
              <li>Maintain civility even in disagreement</li>
              <li>Report harassment or abuse when encountered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Content and Intellectual Property</h2>
            <p className="mb-4">
              You retain ownership of the content you create on FORA. However, by using the platform, you grant FORA a license to use, display, and process your content solely for the purpose of operating the platform.
            </p>
            <p>
              You agree not to post content that infringes on the intellectual property rights of others, including copyrights, trademarks, or patents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service, including but not limited to harassment, abuse, or any conduct that we determine to be harmful to the community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Disclaimers</h2>
            <p className="mb-4">
              FORA is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Uninterrupted or error-free service</li>
              <li>The accuracy of debate scoring or rankings</li>
              <li>The availability of specific features or opponents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, FORA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Your continued use of FORA after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact</h2>
            <p>
              If you have questions about these Terms of Service, please contact us through the platform.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link
            href="/"
            className="text-violet-500 hover:text-violet-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
