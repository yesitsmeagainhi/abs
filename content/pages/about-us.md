---
title: About Us
slug: about-us
ptype: code
blocks:
  - type: courseOverviewTable
    heading: Who We are
    rows:
      - label: No1 ABS
        value: Pharmacy college
  - type: galleryCarousel
    heading: Look
    images:
      - image: /uploads/abs-logo.png
        alt: ABS
  - type: branchInfo
    branches:
      - name: BHY
        location: http://localhost:3000/
        phone: "88888888"
        maps: http://localhost:3000/
      - name: NSP
        location: http://localhost:3000/
        phone: http://localhost:3000/
        maps: http://localhost:3000/
      - name: Thane
        location: http://localhost:3000/
        phone: "8888888888"
        maps: http://localhost:3000/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ===== Basic SEO ===== -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About ABS Educational Solution | Pharmacy & Paramedical Admissions</title>
  <meta name="description"
        content="Since 2009 ABS Educational Solution has guided 80,000+ students into Pharmacy, Nursing & Paramedical careers through transparent counselling and direct admissions." />
  <link rel="canonical" href="https://absadmission.com/about" />

  <!-- ===== OpenGraph / Twitter (helps social + SEO) ===== -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="About ABS Educational Solution" />
  <meta property="og:description"
        content="80,000+ students counselled since 2009 • PCI & RGUHS-affiliated programmes • Direct admission & scholarship support." />
  <meta property="og:url" content="https://absadmission.com/about" />
  <meta property="og:image" content="https://absadmission.com/images/og-about.jpg" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- ===== Tailwind CSS (Play CDN for quick prototypes) ===== -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Optional: customise Tailwind primary colour to match brand -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0d6efd',               // Bootstrap-blue brand colour
          }
        }
      }
    }
  </script>
</head>

<body class="antialiased text-gray-900">

  <!-- ========== PAGE WRAPPER ========== -->
  <main>

    <!-- ===== About Us Section (responsive) ===== -->
    <section id="about" class="py-16 bg-gray-50">
      <div class="container mx-auto px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
        <!-- Text block -->
        <div>
          <h1 class="text-3xl/tight lg:text-4xl font-semibold mb-4">
            About <span class="text-primary">ABS Educational Solution</span>
          </h1>

          <p class="text-lg text-gray-700 mb-6">
            Since <strong>2009</strong> we’ve guided more than
            <strong>80&nbsp;000 students</strong> into Pharmacy, Nursing &amp; Paramedical
            careers through transparent counselling, direct college admissions and
            scholarship assistance of up to ₹25&nbsp;000.
          </p>

          <ul class="space-y-2 text-gray-800">
            <li class="flex gap-2">
              <span class="text-primary">✔</span>
              16&nbsp;+ years of healthcare-education expertise
            </li>
            <li class="flex gap-2">
              <span class="text-primary">✔</span>
              80&nbsp;000&nbsp;+ counselling sessions &amp; 12&nbsp;000&nbsp;+ successful admissions
            </li>
            <li class="flex gap-2">
              <span class="text-primary">✔</span>
              Official partner of NAAC-A, PCI &amp; RGUHS-affiliated colleges
            </li>
          </ul>
        </div>

        <!-- Image block -->
        <div class="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
          <!-- Replace src with a real campus photo -->
          <img src="/public/uploads/dsc02558-enhanced-nr.jpg"
               alt="ABS Institute campus – modern lab facilities"
               class="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      <!-- Local SEO: EducationalOrganization schema -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "ABS Educational Solution",
        "url": "https://absadmission.com/",
        "foundingDate": "2009",
        "telephone": "+91 98332 11999",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Head Office – Bhayandar (W)",
          "addressLocality": "Mumbai",
          "addressRegion": "MH",
          "postalCode": "401105",
          "addressCountry": "IN"
        },
        "description": "Guiding 80,000+ students into pharmacy, nursing and paramedical careers with counselling, admissions and scholarships."
      }
      </script>
    </section>
    <!-- ===== /About Us ===== -->

  </main>
  <!-- ========== /PAGE WRAPPER ========== -->

</body>
</html>
