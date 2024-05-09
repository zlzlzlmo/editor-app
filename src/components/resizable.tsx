import './resizable.css';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    return (
        <ResizableBox width={300} height={300} resizeHandles={['s']}>
            {children}
        </ResizableBox>
    )
}

export default Resizable