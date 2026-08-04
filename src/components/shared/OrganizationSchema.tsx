import React from "react";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kendal Elektrik",
    url: "https://www.kendalelektrik.com.tr",
    logo: "https://www.kendalelektrik.com.tr/images/logo.png",
    foundingDate: "1997",
    description: "Innovative lighting and electrical equipment manufacturer.",
    sameAs: [
      "https://www.facebook.com/kendalelektrik",
      "https://www.instagram.com/k2.ledsystem",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
