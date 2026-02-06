'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Data Collection and Storage</h2>
            <p className="mb-4">
              FORA does not store your personal data. We are committed to your privacy and do not collect, store, or retain any user data beyond what is necessary for the basic functionality of the platform.
            </p>
            <p>
              We do not track your browsing behavior, store your debate content permanently, or maintain databases of user information. Your interactions with the platform are processed in real-time and are not retained after your session ends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Zero Data Storage Policy</h2>
            <p className="mb-4">
              Our platform operates on a zero data storage principle. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We do not store your email address or personal information</li>
              <li>We do not store your debate content or arguments</li>
              <li>We do not store your browsing history or activity logs</li>
              <li>We do not use cookies or tracking technologies</li>
              <li>We do not share or sell any data because we do not collect it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Harassment and Abuse Policy</h2>
            <p className="mb-4">
              FORA has a zero-tolerance policy for harassment, abusive language, hate speech, or any form of discriminatory behavior. We are committed to maintaining a respectful and competitive environment for all users.
            </p>
            <p className="mb-4">
              Harassment includes, but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Threats, intimidation, or personal attacks</li>
              <li>Hate speech or discriminatory language</li>
              <li>Sexual harassment or inappropriate content</li>
              <li>Repeated unwanted contact or stalking behavior</li>
              <li>Any language intended to harm, degrade, or intimidate others</li>
            </ul>
            <p className="mt-4">
              Violations of this policy will result in immediate account suspension or termination. We reserve the right to take appropriate action against any user who engages in harassing behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Content Moderation</h2>
            <p>
              While we do not store your data, we do monitor debates in real-time to ensure compliance with our harassment policy. Content that violates our terms will be removed, and offending users will be subject to disciplinary action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p>
              FORA does not integrate with third-party services that collect or store user data. We do not use analytics platforms, advertising networks, or any services that would compromise your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of FORA after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us through the platform.
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
