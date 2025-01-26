import { Dialog, Transition } from '@headlessui/react'
import React, { Dispatch, Fragment, ReactNode, SetStateAction } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean,
    title: string,
    children: ReactNode,
    footer?: ReactNode
}

function Modal(props : Props) {
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="float-right mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 cursor-pointer" onClick={() => props.setOpen(false)}>
                                        <AiOutlineClose className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="pt-8 sm:mt-0 sm:ml-4 gird place-items-center">
                                        <>
                                            {props.title && props.title.length > 0 &&
                                                <Dialog.Title as="h3" className="text-center text-lg leading-6 font-medium text-gray-900">
                                                    {props.title}
                                                </Dialog.Title>
                                            }
                                            <div className="my-4 w-full">
                                                {props.children}
                                            </div>
                                        </>
                                    </div>
                                </div>
                                {props.footer &&
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        {props.footer}
                                    </div>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal