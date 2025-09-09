
export const ChatButton = () => {
  return (
    <button
      className="fixed w-[52px] h-[52px] flex items-center justify-center shadow-[0_4px_6px_rgba(0,0,0,0.05),0_10px_15px_rgba(0,0,0,0.05)] cursor-pointer bg-purple rounded-[50%] right-6 bottom-6 hover:bg-purple-dark transition-colors"
      onClick={() => console.log("Chat button clicked")}
      aria-label="Open chat"
    >
      <i className="ti ti-messages text-white text-xl" />
    </button>
  );
};
