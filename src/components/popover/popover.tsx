'use client';

import { useState, ReactNode } from 'react';
// import { Popover } from '@headlessui/react';
import { Popover } from 'react-tiny-popover';

interface AppPopoverProperties {
  button: ReactNode;
  content: ReactNode;
  containerStyle?: string;
  open?: boolean;
  reposition?: boolean;
  align?: any;
  positions?: Array<any>;
  toggle?: ({ v }: { v?: boolean }) => void;
}

function AppPopover({
  button,
  content,
  containerStyle,
  open,
  toggle,
  align = 'center',
  reposition = true,
  positions = ['top', 'bottom', 'left', 'right'],
}: AppPopoverProperties) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClick = ({ v }: { v?: boolean }) => {
    setIsPopoverOpen(v!);
  };

  return (
    <Popover
      align={align}
      reposition={reposition}
      containerClassName={`z-50 ${containerStyle}`}
      onClickOutside={() =>
        toggle ? toggle({ v: false }) : handleClick({ v: false })
      }
      isOpen={open || isPopoverOpen}
      positions={positions}
      content={<div>{content}</div>}>
      <span
        onClick={() =>
          toggle ? toggle({}) : handleClick({ v: !isPopoverOpen })
        }
        role='button'
        aria-label='Popover'
        tabIndex={0}>
        {button}
      </span>
    </Popover>
  );
}

export default AppPopover;
