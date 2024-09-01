export function processTemplate(template: string, name: string) {
  // First, replace {{nama}} in the URL with the encoded name
  let processed = template.replace(
    /(https?:\/\/[^\s]+){{nama}}/g,
    (match, p1) => p1 + encodeURIComponent(name),
  );

  // Then, replace all other instances of {{nama}} with the unencoded name
  processed = processed.replace(/{{nama}}/g, name);

  return `
---
[Undangan ${name}]
  
${processed}

---
  `;
}
