import React from "react";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kendal Elektrik",
    url: "https://www.kendalelektrik.com.tr",
    logo: "https://www.kendalelektrik.com.tr/kendal-icon.png",
    foundingDate: "1997",
    description: "Innovative lighting and electrical equipment manufacturer.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Selimpaşa Org. San. Böl. 5008 Sokak No:6",
      addressLocality: "Silivri/İstanbul",
      addressCountry: "TR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+90-212-482-75-90",
        contactType: "customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: "+90-850-259-41-41",
        contactType: "sales",
      },
      {
        "@type": "ContactPoint",
        telephone: "+90-444-34-98",
        contactType: "technical support",
      }
    ],
    sameAs: [
      "https://www.facebook.com/kendalelektrik",
      "https://www.instagram.com/k2.ledsystem",
      "https://www.linkedin.com/company/kendal-elektrik-ayd%C4%B1nlatma-a-%C5%9F/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
