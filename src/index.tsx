import ReactDOM from 'react-dom/client';

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from "./components/code-cell";
import TextEditor from './components/text-editor';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <div>
      <TextEditor/>
      {/* <CodeCell/>       */}
    </div>
  );
};
root.render(<App />);

