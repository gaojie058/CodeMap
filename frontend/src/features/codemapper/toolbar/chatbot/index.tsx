// frontend/src/features/codemapper/toolbar/chatbot/index.tsx
import { FormEvent, useEffect, useRef, useState } from 'react';
import './style/chatbot.style.css';
import OpenAI from '@/assets/icons/openai.svg';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import IconButton from '@/components/Elements/Button/IconButton';
import chatService from '@gpt/chatService';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import useStore from '@/store/store';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  toggleChatbotContainer: () => void;
  context: 'BUSINESS' | 'FUNCTION_CALL';
}

const ChatWindow: React.FC<ChatWindowProps> = ({ toggleChatbotContainer, context }) => {
  const initialMessage: ChatMessage[] = [
    {
      role: 'assistant',
      content: 'Type your question here, what further details you want to understand?',
    },
  ];

  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<ChatMessage[]>(initialMessage);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const {fnCallDOT, fnCallSelectedNode, bizCompDOT, bizCompSelectedNode} = useStore();

  useEffect(() => {
    chatService.initializeThread();
  }, []);

  const customizeMessage = (message: string): string => {
    let customContent = '';
    if(context === 'FUNCTION_CALL') {
      customContent = `${fnCallDOT} selectedNode: ${fnCallSelectedNode}`
    } else if (context === 'BUSINESS') {
      customContent = `${bizCompDOT} selectedNode: ${bizCompSelectedNode}`
    }
    const customMessage = `${customContent} ${message}`;
    return customMessage;
  };

  const chat = async (e: FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
  
    if (!message) return;
  
    setIsTyping(true);
  
    const newChats: ChatMessage[] = [
      ...chats,
      { role: 'user', content: message },
    ];
    setChats(newChats);
    setMessage('');
  
    try {
      let messageToSend = message;
      messageToSend = customizeMessage(message);

      await chatService.sendMessage(messageToSend, (content) => {
        setChats(prevChats => {
          const updatedChats = [...prevChats];
          if (updatedChats[updatedChats.length - 1].role === 'assistant') {
            updatedChats[updatedChats.length - 1].content = content;
          } else {
            updatedChats.push({ role: 'assistant', content });
          }
          return updatedChats;
        });
      });
    } catch (error) {
      console.error(error);
      // 可以在这里添加错误处理逻辑，比如显示错误消息
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className='h-full w-full p-4'>
        <div className='absolute top-2 right-2 z-20 flex flex-row-reverse gap-4'>
          <IconButton icon={<XMarkIcon />} onClick={toggleChatbotContainer} />
        </div>

        {/* Chatbot Content */}
        <main className='flex flex-col h-full'>
          <ChatHistory chats={chats} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSubmit={(e) => chat(e, message)}
            isTyping={isTyping}
          />
        </main>
      </div>
    </>
  );
};

interface ChatbotProps {
  context: 'BUSINESS' | 'FUNCTION_CALL';
}
export const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbotContainer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={toggleChatbotContainer}
        className='inline-flex items-center justify-center p-4 text-center text-white bg-white rounded-full shadow-md ring-1 ring-zinc-100 hover:ring-zinc-200 ms-6 mb-8'
      >
        <img src={OpenAI} className='w-8 h-8' alt='OpenAI Icon' />
      </button>

      <div
        className={`chat-container ${
          isOpen ? 'open' : 'closed'
        } rounded-xl shadow-lg border border-gray-200`}
      >
        <ChatWindow toggleChatbotContainer={toggleChatbotContainer} context={context} />
      </div>
    </div>
  );
};

interface ChatHistoryProps {
  chats: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chats }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className='max-h-96 my-4 overflow-y-auto flex flex-col gap-2'>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.role === 'user'
                    ? 'ml-[30%]'
                    : 'flex-row-reverse mr-[25%]'
                }`}
              >
                <div
                  className={`bg-gray-100 p-2.5 rounded-md text-gray-800 text-sm flex-1 markdown-content`}
                >
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]} 
                    remarkPlugins={[remarkGfm]}
                  >
                    {chat.content}
                  </ReactMarkdown>
                </div>
                {chat.role === 'user' ? (
                  <div className='h-8 w-8 mx-2'>
                    <UserCircleIcon />
                  </div>
                ) : (
                  <span className='h-6 w-6 mr-2 mt-px'>
                    <img
                      src={OpenAI}
                      className='h-full w-full'
                      alt='OpenAI Icon'
                    />
                  </span>
                )}
              </div>
            ))
          : null}
      </section>
      <div ref={chatContainerRef} />
    </>
  );
};
interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isTyping: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  onSubmit,
  isTyping,
}) => {
  return (
    <form
      action=''
      onSubmit={onSubmit}
      className='flex items-center gap-2 mt-auto'
    >
      <input
        type='text'
        id='message'
        value={message}
        className='bg-white border border-zinc-200 text-gray-900 text-sm rounded-lg block w-full p-2.5'
        placeholder='Type your message here'
        required
        onChange={(e) => setMessage(e.target.value)}
        disabled={isTyping}
      />
      <button
        type='submit'
        className='bg-black hover:bg-gray-800 text-white text-sm rounded-lg px-4 py-2.5'
        disabled={isTyping}
      >
        {isTyping ? 'Typing...' : 'Send'}
      </button>
    </form>
  );
};

export default Chatbot;