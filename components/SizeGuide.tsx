'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function SizeGuide({ isOpen, closeModal }: SizeGuideProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-premium-charcoal p-6 text-left align-middle shadow-xl transition-all border border-premium-gold">
                                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                                    <Dialog.Title as="h3" className="text-2xl font-bold font-playfair text-white flex items-center gap-2">
                                        <Ruler className="h-6 w-6 text-premium-gold" />
                                        Size Guide
                                    </Dialog.Title>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-premium-gold uppercase bg-black">
                                            <tr>
                                                <th className="px-6 py-3 rounded-tl-lg">Size</th>
                                                <th className="px-6 py-3">Chest (in)</th>
                                                <th className="px-6 py-3">Waist (in)</th>
                                                <th className="px-6 py-3 rounded-tr-lg">Length (in)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-300">
                                            <tr className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800">
                                                <td className="px-6 py-4 font-bold text-white">S</td>
                                                <td className="px-6 py-4">36-38</td>
                                                <td className="px-6 py-4">28-30</td>
                                                <td className="px-6 py-4">27</td>
                                            </tr>
                                            <tr className="bg-gray-800 border-b border-gray-800 hover:bg-gray-700">
                                                <td className="px-6 py-4 font-bold text-white">M</td>
                                                <td className="px-6 py-4">38-40</td>
                                                <td className="px-6 py-4">30-32</td>
                                                <td className="px-6 py-4">28</td>
                                            </tr>
                                            <tr className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800">
                                                <td className="px-6 py-4 font-bold text-white">L</td>
                                                <td className="px-6 py-4">40-42</td>
                                                <td className="px-6 py-4">32-34</td>
                                                <td className="px-6 py-4">29</td>
                                            </tr>
                                            <tr className="bg-gray-800 border-b border-gray-800 hover:bg-gray-700">
                                                <td className="px-6 py-4 font-bold text-white">XL</td>
                                                <td className="px-6 py-4">42-44</td>
                                                <td className="px-6 py-4">34-36</td>
                                                <td className="px-6 py-4">30</td>
                                            </tr>
                                            <tr className="bg-gray-900 rounded-b-lg hover:bg-gray-800">
                                                <td className="px-6 py-4 font-bold text-white">XXL</td>
                                                <td className="px-6 py-4">44-46</td>
                                                <td className="px-6 py-4">36-38</td>
                                                <td className="px-6 py-4">31</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
