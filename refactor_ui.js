const fs = require('fs');
const file = './src/app/(main)/[slug]/ProductDetailClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Chunk 1
const chunk1Target = `              // To support comma-separated string options on single products, we flatMap them
              const uniqueColors = Array.from(new Set(variantData.filter(v => (!currentVariantData.watt || v.watt === currentVariantData.watt) && (!currentVariantData.socket || v.socket === currentVariantData.socket)).flatMap(v => {
                if (!v.colorTemp) return [];
                return v.colorTemp.split(',').map((c: string) => c.trim());
              }).filter((c: string) => c && c !== "Standart")));

              const isCasingVariant = variantData.some(v => v.variant.variantOptions?.casing && !v.variant.variantOptions?.light);
              const colorSectionTitleTr = isCasingVariant ? "Kasa Rengi Seçenekleri" : "Renk Seçenekleri";
              const colorSectionTitleEn = isCasingVariant ? "Casing Options" : "Color Options";`;

const chunk1Replacement = `              const uniqueLights = Array.from(new Set(variantData.filter(v => (!currentVariantData.watt || v.watt === currentVariantData.watt) && (!currentVariantData.socket || v.socket === currentVariantData.socket)).flatMap(v => {
                const lightOpt = v.variant.variantOptions?.light;
                if (!lightOpt) return [];
                return lightOpt.split(',').map((c: string) => c.trim());
              }).filter((c: string) => c && c !== "Standart")));

              const uniqueCasings = Array.from(new Set(variantData.filter(v => (!currentVariantData.watt || v.watt === currentVariantData.watt) && (!currentVariantData.socket || v.socket === currentVariantData.socket)).flatMap(v => {
                const casingOpt = v.variant.variantOptions?.casing;
                if (!casingOpt) return [];
                return casingOpt.split(',').map((c: string) => c.trim());
              }).filter((c: string) => c && c !== "Standart")));`;

// Chunk 2
const chunk2Target = `              const getBestVariantMatch = (targetAttr: 'watt' | 'socket' | 'colorTemp', value: string) => {
                // For colorTemp, allow matching if the value is part of a comma-separated string
                const candidates = variantData.filter(v => targetAttr === 'colorTemp' ? v[targetAttr]?.includes(value) : v[targetAttr] === value);`;

const chunk2Replacement = `              const getBestVariantMatch = (targetAttr: 'watt' | 'socket' | 'light' | 'casing', value: string) => {
                const candidates = variantData.filter(v => targetAttr === 'light' || targetAttr === 'casing' ? v.variant.variantOptions?.[targetAttr]?.includes(value) : v[targetAttr] === value);`;

// Chunk 3
const chunk3Target = `                  if (targetAttr !== 'colorTemp') {
                    if (a.colorTemp === currentVariantData.colorTemp) aScore++;
                    if (b.colorTemp === currentVariantData.colorTemp) bScore++;
                  }`;

const chunk3Replacement = `                  if (targetAttr !== 'light') {
                    if (a.variant.variantOptions?.light === currentVariantData.variant.variantOptions?.light) aScore++;
                    if (b.variant.variantOptions?.light === currentVariantData.variant.variantOptions?.light) bScore++;
                  }
                  if (targetAttr !== 'casing') {
                    if (a.variant.variantOptions?.casing === currentVariantData.variant.variantOptions?.casing) aScore++;
                    if (b.variant.variantOptions?.casing === currentVariantData.variant.variantOptions?.casing) bScore++;
                  }`;

// Chunk 4
const chunk4Target = `                  {/* Renk Seçenekleri */}
                  {uniqueColors.length > 0 && (
                    <div className="flex flex-col items-center">
                      <SectionHeader
                        title={language === "tr" ? colorSectionTitleTr : colorSectionTitleEn}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        }
                      />
                      <div className="flex flex-wrap justify-center gap-2 -mt-4">
                        {uniqueColors.map(color => {
                          const match = getBestVariantMatch('colorTemp', color);
                          if (!match) return null;
                          return renderVariantLink(match, color, true);
                        })}
                      </div>
                    </div>
                  )}`;

const chunk4Replacement = `                  {/* Renk Seçenekleri (Light) */}
                  {uniqueLights.length > 0 && (
                    <div className="flex flex-col items-center">
                      <SectionHeader
                        title={language === "tr" ? "Renk Seçenekleri" : "Color Options"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        }
                      />
                      <div className="flex flex-wrap justify-center gap-2 -mt-4">
                        {uniqueLights.map(color => {
                          const match = getBestVariantMatch('light', color);
                          if (!match) return null;
                          return renderVariantLink(match, color, true);
                        })}
                      </div>
                    </div>
                  )}

                  {/* Kasa Rengi Seçenekleri (Casing) */}
                  {uniqueCasings.length > 0 && (
                    <div className="flex flex-col items-center">
                      <SectionHeader
                        title={language === "tr" ? "Kasa Rengi Seçenekleri" : "Casing Options"}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        }
                      />
                      <div className="flex flex-wrap justify-center gap-2 -mt-4">
                        {uniqueCasings.map(color => {
                          const match = getBestVariantMatch('casing', color);
                          if (!match) return null;
                          return renderVariantLink(match, color, true);
                        })}
                      </div>
                    </div>
                  )}`;

// Ensure replacements succeed
const replaceSafe = (str, target, replacement) => {
  if (!str.includes(target)) {
    console.error("COULD NOT FIND TARGET:\n", target);
    process.exit(1);
  }
  return str.replace(target, replacement);
};

content = replaceSafe(content, chunk1Target, chunk1Replacement);
content = replaceSafe(content, chunk2Target, chunk2Replacement);
content = replaceSafe(content, chunk3Target, chunk3Replacement);
content = replaceSafe(content, chunk4Target, chunk4Replacement);

// We should also replace the Link rendering to not use "isVirtual" that depends on colorTemp.
// Actually renderVariantLink expects 'match' and generates a <Link> if match.variant.id !== product.id.
// It also has an isVirtual check: const isVirtual = variations.length === 1 && match.variant.id === product.id;
// This is fine.

fs.writeFileSync(file, content, 'utf8');
console.log('Success!');
