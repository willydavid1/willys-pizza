type MessageProps = {
  text: string;
  typeMessage: string;
};

const Message = ({ text, typeMessage }: MessageProps) => {
  const typesMessages: { [key: string]: string } = {
    error: "text-red-500",
    success: "text-green-600",
  };

  return <h4 className={`text-xs ${typesMessages[typeMessage]}`}>{text}</h4>;
};

Message.typeMessage = {
  text: "",
  typeMessage: "error",
};

export default Message;
