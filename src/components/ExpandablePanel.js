import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import classNames from 'classnames';

function ExpandablePanel({ header, children, className }) {
  const [expanded, setExpanded] = useState(false);

  const finalClassNames = classNames(
    'mb-2 border rounded',
    className
  );

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={finalClassNames}>
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div onClick={handleClick} className="cursor-pointer">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
