import Head from 'next/head';

export default function TermsConditionsPage() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | ABS Educational Solution</title>
        <meta name="description" content="Terms and conditions for using the ABS Educational Solution website and services." />
      </Head>

      <main className="tc-main">
        {/* ── Hero ── */}
        <section className="tc-hero">
          <div className="tc-hero-pattern" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1>Terms &amp; Conditions</h1>
            <p>Please read these terms carefully before using our website and services.</p>
          </div>
        </section>

        {/* ── Content ── */}
        <div className="tc-wrap">
          <div className="tc-card">
            <p className="tc-updated">Last updated: 5 May 2026</p>

            <section className="tc-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>ABS Educational Solution</strong> (<a href="https://abseducationalsolution.com" target="_blank" rel="noopener noreferrer">abseducationalsolution.com</a>).
                By accessing or using our website and services, you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                ABS Educational Solution is an educational counselling and admission guidance platform that helps students and parents find the right college, course, and scholarship opportunities across Maharashtra and India.
              </p>
            </section>

            <section className="tc-section">
              <h2>2. Services We Provide</h2>
              <ul>
                <li>Admission guidance and counselling for pharmacy, nursing, engineering, medical, and other professional courses</li>
                <li>Scholarship discovery and eligibility matching tools</li>
                <li>College search and comparison features</li>
                <li>Educational blog content and exam preparation resources</li>
                <li>Entrance exam information</li>
              </ul>
            </section>

            <section className="tc-section">
              <h2>3. User Obligations</h2>
              <p>By using our website, you agree to:</p>
              <ul>
                <li>Provide accurate and truthful information when filling out forms or creating enquiries</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not attempt to interfere with or disrupt the website&apos;s functionality</li>
                <li>Not reproduce, distribute, or commercially exploit any content from this website without prior written consent</li>
              </ul>
            </section>

            <section className="tc-section">
              <h2>4. Information Collection &amp; Use</h2>
              <p>When you submit an enquiry or use our tools, we collect personal information including but not limited to:</p>
              <ul>
                <li>Name, phone number, and email address</li>
                <li>Educational background and course preferences</li>
                <li>Location and demographic information</li>
              </ul>
              <p>This information is used to:</p>
              <ul>
                <li>Contact you with relevant admission guidance</li>
                <li>Match you with suitable courses, colleges, and scholarships</li>
                <li>Improve our services and user experience</li>
                <li>Send notifications about deadlines, events, or relevant updates</li>
              </ul>
            </section>

            <section className="tc-section">
              <h2>5. Communication Consent</h2>
              <p>
                By submitting your contact details through any form on our website, you consent to receiving calls, SMS, WhatsApp messages, and emails from our counsellors regarding admission guidance and related services.
                You may opt out of promotional communications at any time by contacting us.
              </p>
            </section>

            <section className="tc-section">
              <h2>6. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and up-to-date information about courses, colleges, fees, scholarships, and admission processes, we do not guarantee the completeness or accuracy of all content.
                Information is subject to change without notice. Users are advised to verify details directly with the respective institutions and official portals.
              </p>
            </section>

            <section className="tc-section">
              <h2>7. Scholarship Tool Disclaimer</h2>
              <p>
                Our Scholarship Decision Tool provides indicative matches based on the information you provide. Results are for guidance purposes only and do not guarantee eligibility or approval.
                Actual eligibility, amounts, and deadlines are determined by the respective government departments and scholarship portals (MahaDBT, NSP, etc.).
              </p>
            </section>

            <section className="tc-section">
              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites including government portals, college websites, and scholarship platforms.
                We are not responsible for the content, privacy practices, or availability of these external sites.
              </p>
            </section>

            <section className="tc-section">
              <h2>9. Intellectual Property</h2>
              <p>
                All content on this website &mdash; including text, graphics, logos, tools, and software &mdash; is the property of ABS Educational Solution and is protected by applicable intellectual property laws.
                Unauthorized use or reproduction is strictly prohibited.
              </p>
            </section>

            <section className="tc-section">
              <h2>10. Limitation of Liability</h2>
              <p>
                ABS Educational Solution shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services.
                Our role is limited to providing guidance and information &mdash; we are not directly involved in the admission decisions made by colleges or universities.
              </p>
            </section>

            <section className="tc-section">
              <h2>11. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting on this page.
                Your continued use of the website after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="tc-section">
              <h2>12. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Palghar, Maharashtra.
              </p>
            </section>

            <section className="tc-section tc-contact">
              <h2>Contact Us</h2>
              <p>If you have any questions about these Terms &amp; Conditions, please reach out:</p>
              <div className="tc-contact-grid">
                <div className="tc-contact-item">
                  <div className="tc-contact-label">Email</div>
                  <a href="mailto:info@abseducationalsolution.com">info@abseducationalsolution.com</a>
                </div>
                <div className="tc-contact-item">
                  <div className="tc-contact-label">Phone</div>
                  <a href="tel:+919702836946">+91 97028 36946</a>
                </div>
                <div className="tc-contact-item">
                  <div className="tc-contact-label">Location</div>
                  <span>Nalasopara, Palghar, Maharashtra, India</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
