import './preview.css';
import React, { useEffect, useRef } from 'react'
interface PreviewProps {
    code: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        })

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;


const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
      if(!iframe.current) return;
      iframe.current.srcdoc = html;
      setTimeout(() => {
        if(!iframe.current) return;
        iframe.current.contentWindow?.postMessage(code, '*');
      }, 50);
    }, [code]);
    return (
      <div className='preview-wrapper'>
        <iframe
          style={{backgroundColor:"white"}}
          title="preview"
          ref={iframe}
          sandbox="allow-scripts"
          srcDoc={html}
        />
      </div>
  )
}

export default Preview