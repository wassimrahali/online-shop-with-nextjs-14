// components/SuccessModal.tsx
import * as Dialog from '@radix-ui/react-dialog';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg p-6 bg-white  shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-50"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
            Successfully added to cart!
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
            Your item has been added to the cart successfully.
          </Dialog.Description>
          <div className="mt-4 flex justify-center gap-2">
            <Dialog.Close asChild>
              <button
                className="w-full p-2.5 text-white bg-primary  font-medium focus:bg-primary"
                onClick={onClose}
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SuccessModal;
