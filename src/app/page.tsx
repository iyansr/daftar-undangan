'use client';

import { useCallback, useState } from 'react';

import { processTemplate } from '@/utils/processor';

export default function Home() {
  const [template, setTemplate] = useState(`Yth, {{nama}}
    
Tanpa mengurangi rasa hormat, 
perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami.  

https://url-undangan.com/?nama={{nama}}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu. 

Terima kasih banyak atas perhatiannya.`);

  const [listName, setListName] = useState(
    `Budi\nBambang Pamungkas\nMulyono\nKim Ji Soo`,
  );

  const handleSubmit = useCallback(() => {
    const names = listName.split('\n');

    let content = '';

    names.forEach(name => {
      const output = processTemplate(template, name);

      content += output;
    });

    // Create a Blob with the processed text
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invitation.txt`;

    // Append to the document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }, [template, listName]);

  return (
    <main className="max-w-screen-sm mx-auto px-4 py-8">
      <div className="w-full flex flex-col gap-2  mt-8">
        <label htmlFor="template">
          Masukkan template undangan (pisahkan dengan {`{{nama}}`} untuk
          placeholder nama):
        </label>
        <p></p>
        <textarea
          name="template"
          id="template"
          className="w-full border border-neutral-800 rounded-md min-h-96 p-4"
          value={template}
          onChange={e => setTemplate(e.target.value)}></textarea>
      </div>

      <div className="w-full flex flex-col gap-2  mt-8">
        <label htmlFor="list-name">
          Masukkan nama undangan (pisahkan dengan {`"enter"`}):
        </label>
        <p></p>
        <textarea
          name="list-name"
          id="list-name"
          className="w-full border border-neutral-800 rounded-md min-h-96 p-4"
          value={listName}
          onChange={e => setListName(e.target.value)}></textarea>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="w-full border border-neutral-800 px-4 py-2 mt-6 bg-neutral-50 rounded-md">
          Download Hasil
        </button>
      </div>
    </main>
  );
}
