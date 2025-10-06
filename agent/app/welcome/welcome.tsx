import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export function Welcome() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/chat' }),
    messages: [
      {
        id: 'msg-1',
        role: 'assistant',
        parts: [{ type: 'text', text: 'Hello! How can I help you today?' }]
      }
    ],
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (_options) => {
      // console.log('Chat finished:', options.message);
    }
  });

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
      <div className="w-full lg:w-1/2 min-h-0">
        <div className="h-full bg-gradient-to-br from-[#FFF9F5] via-[#FFEADB] to-[#FFD9C7] dark:from-[#0B1418] dark:via-[#15252D] dark:to-[#254250] rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 flex flex-col overflow-auto">
          <div className="mb-6 flex-shrink-0">
            <div className="inline-block bg-gradient-to-r from-[#943000] to-[#FC5200] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-lg">
              🚀 Hackathon 2025
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-[#C74100] via-[#FC5200] to-[#FF722E] bg-clip-text text-transparent break-words">
              GraphQL Summit
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#254250] dark:text-[#B4C0BF] mb-2 break-words">
              Agent Party Hackathon
            </h3>
            <p className="text-xs sm:text-sm text-[#365E72] dark:text-[#98A9A7] font-medium">
              Brought to you by Apollo GraphQL and Goose by Block
            </p>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-6 min-h-0">
            <div className="bg-white/80 dark:bg-[#15252D]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-[#FF9142]">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🎉</div>
                <div className="min-w-0">
                  <h4 className="font-bold text-base sm:text-lg text-[#254250] dark:text-[#CFD7D6] mb-1 sm:mb-2">Success!</h4>
                  <p className="text-sm sm:text-base text-[#365E72] dark:text-[#B4C0BF] leading-relaxed">
                    Congratulations! You have successfully run the example template. Now it's your turn to create an exciting multi-agent experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#15252D]/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-[#467B95]">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="text-2xl sm:text-3xl flex-shrink-0">📚</div>
                <div className="min-w-0">
                  <h4 className="font-bold text-base sm:text-lg text-[#254250] dark:text-[#CFD7D6] mb-1 sm:mb-2">Requirements</h4>
                  <p className="text-sm sm:text-base text-[#365E72] dark:text-[#B4C0BF] leading-relaxed">
                    All the requirements for this hack are in the readme. For any other questions, please visit our team in the Lounge.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#C74100] to-[#FC5200] rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <div className="text-2xl sm:text-3xl flex-shrink-0">✨</div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-bold">Happy hackathoning!</p>
                  <p className="text-[#FFD9C7] text-xs sm:text-sm mt-1">Let's build something amazing together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const hasToolResults = message.parts.some((part: any) => part.type === 'tool-result' || part.type === 'dynamic-tool');

            return (
              <div key={message.id} className={`${hasToolResults ? 'w-full' : `flex ${(message.role as string) === 'user' ? 'justify-end' : 'justify-start'}`}`}>
                <div className={`${hasToolResults ? 'w-full' : 'max-w-xs lg:max-w-md'} px-4 py-2 rounded-lg ${
                  (message.role as string) === 'user'
                    ? 'bg-[#FC5200] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {message.parts.map((part, i) => {
                    switch ((part as any).type) {
                      case 'text':
                        return <p key={`${message.id}-${i}`} className="text-sm whitespace-pre-wrap">{(part as any).text}</p>;
                      case 'tool-call':
                      return (
                        <div key={`${message.id}-${i}`} className="text-sm bg-blue-100 dark:bg-blue-900 p-2 rounded mt-2">
                          <div className="font-semibold text-blue-800 dark:text-blue-200">
                            🔧 Calling {(part as any).toolName}
                          </div>
                          <div className="text-blue-600 dark:text-blue-300 text-xs mt-1">
                            {JSON.stringify((part as any).args, null, 2)}
                          </div>
                        </div>
                      );
                    case 'tool-result':
                    case 'dynamic-tool':
                      const result = (part as any).result || (part as any).output;
                      let displayResult;

                      try {
                        // Handle different result formats
                        if (typeof result === 'string') {
                          displayResult = JSON.parse(result);
                        } else if (result?.structuredContent) {
                          displayResult = result.structuredContent;
                        } else if (result?.content?.[0]?.text) {
                          displayResult = JSON.parse(result.content[0].text);
                        } else {
                          displayResult = result;
                        }
                      } catch (e) {
                        displayResult = result;
                      }

                      // Render data in a structured, human-readable way
                      const renderData = (data: any): JSX.Element => {
                        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
                          return <div>{String(data)}</div>;
                        }

                        if (data === null || data === undefined) {
                          return <div className="text-gray-400">None</div>;
                        }

                        if (Array.isArray(data)) {
                          if (data.length === 0) return <div className="text-gray-400">Empty list</div>;

                          return (
                            <div className="space-y-3">
                              {data.map((item, idx) => (
                                <div key={idx} className="border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                                  {typeof item === 'object' && item !== null ? (
                                    <div className="space-y-1">
                                      {Object.entries(item).map(([k, v]) => (
                                        <div key={k}>
                                          <span className="font-semibold text-gray-600 dark:text-gray-400">{k}:</span>{' '}
                                          <span>{String(v)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div>• {String(item)}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        }

                        if (typeof data === 'object' && data !== null) {
                          return (
                            <div className="space-y-2">
                              {Object.entries(data).map(([key, value]) => (
                                <div key={key}>
                                  <div className="font-semibold text-gray-600 dark:text-gray-400 mb-1">{key}:</div>
                                  <div className="ml-3">{renderData(value)}</div>
                                </div>
                              ))}
                            </div>
                          );
                        }

                        return <div>{String(data)}</div>;
                      };

                      return (
                        <div key={`${message.id}-${i}`} className="text-sm mt-2">
                          <div className="font-semibold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 p-2 rounded inline-block">
                            ✅ Result from {(part as any).toolName}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300 text-sm mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                            {renderData(displayResult)}
                          </div>
                        </div>
                      );
                    default:
                      // Ignore unknown part types like step-start, step-end, etc.
                      return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage({ text: input });
            setInput('');
          }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC5200] dark:bg-gray-800 dark:text-gray-200"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-2 bg-[#FC5200] text-white rounded-lg hover:bg-[#C74100] focus:outline-none focus:ring-2 focus:ring-[#FC5200] disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

