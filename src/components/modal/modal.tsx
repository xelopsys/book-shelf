import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NiceModalHandler } from '@ebay/nice-modal-react';

export interface ModalProperties {
  children: ReactNode;
  xBtnShown?: boolean;
  modal: NiceModalHandler | any;
}

function Modal({
  children,
  xBtnShown: xButtonShown = true,
  modal,
}: ModalProperties) {
  const { visible, hide } = modal;

  return (
    <Transition
      appear
      show={visible}
      as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto'
        onClose={hide}>
        <Dialog.Overlay className='fixed inset-0 bg-back-primary opacity-30' />
        <div className='min-h-screen px-4 text-center'>
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='my-8 inline-block w-full transform overflow-hidden rounded-2xl bg-back-secondary text-left align-middle shadow-xl transition-all sm:w-auto'>
              <div className='absolute right-0 top-0 text-right'>
                {xButtonShown && (
                  <button
                    onClick={hide}
                    type='button'
                    aria-label='close'
                    className='mt-4 mr-4 ml-auto inline-flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-transparent text-text-light text-sm hover:text-text-dark'>
                    <XMarkIcon className='w-[18px]' />
                  </button>
                )}
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
