import React, { ReactNode } from 'react'
 interface MeetingModalProps {
   isOpen: boolean;
   onClose: () => void;
   className?: string;
   title: string;
   children?:ReactNode;
   handleClick?: () => void;
   buttonText?: string;
   image?: string;
   buttonIcon?: string;
 }
function MeetingModal({isOpen,onClose,className,title,children,handleClick,buttonText,image,buttonIcon}:MeetingModalProps) {
  return (
    <div>MeetingModal</div>
  )
}

export default MeetingModal