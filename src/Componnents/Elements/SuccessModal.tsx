import * as Dialog from '@radix-ui/react-dialog';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 transition-opacity duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 bg-white shadow-lg rounded-lg transition-transform duration-300">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
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
          <Dialog.Title className="text-lg font-medium text-gray-800 text-center">
            Successfully added to cart!
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
            Your item has been added to the cart successfully.
          </Dialog.Description>
          <div className="mt-4 flex justify-center">
            <Dialog.Close asChild>
              <button
                className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300"
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
