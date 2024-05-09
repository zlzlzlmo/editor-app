import './preview.css';
import React, { useEffect, useRef } from 'react'
interface PreviewProps {
    code: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message',(event)=>{
          try {
              console.log(event.data);
            eval(event.data);
          } catch(err) {
            console.log(err);
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color : red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        },false)
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<HTMLIFrameElement | null>(null);

    useEffect(()=>{
        if (!iframe.current) return;
        iframe.current.srcdoc = html;
        if (!iframe.current) return;
        iframe.current.contentWindow?.postMessage(code, "*");
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