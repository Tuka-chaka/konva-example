import { useState } from "react";
import { PiShapesLight, PiHandPointingLight, PiSquareLight, PiCircleLight, PiTriangleLight, PiEyeLight, PiEyeClosedLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import { Tools } from '../enums';

interface SidebarProps {
    selectedTool: Tools | undefined
    onToolSelect: (tool:Tools) => void
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({selectedTool, onToolSelect}) => {

  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  return (
    <IconContext.Provider value={{ size: '3em', color: '#777777'}}>
    
    <div className='sidebar'>
    <div className='hideIcon' onClick={() => setIsVisible(prev => !prev)}>
    <IconContext.Provider value={{ size: '2.5em', color: '#d1d1d1'}}>
      {isVisible? <PiEyeLight/> : <PiEyeClosedLight/> }
    </IconContext.Provider>
    </div>
    <div className={`${isVisible ? 'sidebarContent': 'sidebarContent hidden'}`}>
      {dropdownIsOpen ? 
        <div className='dropdown'>
          <IconContext.Provider value={{ size: '2.5em', color: '#777777'}}>
            <div className='dropdownOption' onClick={() => setDropdownIsOpen(isOpen => !isOpen)}>
              <PiShapesLight/>
            </div>
            <div className={selectedTool === Tools.SQUARE ? 'dropdownOption selected': 'dropdownOption'}
            onClick={() => onToolSelect(Tools.SQUARE)}>
              <PiSquareLight/>
            </div>
            <div className={selectedTool === Tools.CIRCLE ? 'dropdownOption selected': 'dropdownOption'}
            onClick={() => onToolSelect(Tools.CIRCLE)}>
              <PiCircleLight/>
            </div>
            <div className={selectedTool === Tools.TRIANGLE ? 'dropdownOption selected': 'dropdownOption'}
            onClick={() => onToolSelect(Tools.TRIANGLE)}>
              <PiTriangleLight/>
            </div>
          </IconContext.Provider> 
        </div>: 
        <div className='toolOption' onClick={() => setDropdownIsOpen(isOpen => !isOpen)}>
          <PiShapesLight/>
        </div>
        }
        <div className={selectedTool === Tools.HAND ? 'toolOption selected': 'toolOption'}
        onClick={() => onToolSelect(Tools.HAND)}>
            <PiHandPointingLight/>
        </div>
    </div>
    </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
