import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/0197a179552571eba7bc6067839672db5b93/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    script.id = 'jotform-chatbot';

    // Avoid adding the script multiple times
    if (!document.getElementById('jotform-chatbot')) {
      document.body.appendChild(script);
    }

    return () => {
      // Optional: cleanup if needed
      // document.getElementById('jotform-chatbot')?.remove();
    };
  }, []);

  return null;
};

export default Chatbot;