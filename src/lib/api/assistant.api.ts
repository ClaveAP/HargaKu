import { ApiResponse, Region } from '@/types';
import { AssistantChatRequest, AssistantChatResponse, AssistantMessage } from '@/types/assistant';
import { apiClient, IS_MOCK } from './client';
import { processAssistantMessage } from '@/lib/assistant/assistant-engine';

export async function sendAssistantMessage(
  userText: string,
  region: Region,
  conversationHistory: AssistantMessage[] = []
): Promise<AssistantMessage> {
  const timestamp = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (IS_MOCK) {
    return processAssistantMessage(userText, region);
  }

  try {
    const payload: AssistantChatRequest = {
      message: userText,
      regionId: region.id,
      conversationHistory: conversationHistory.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const res = await apiClient<ApiResponse<AssistantChatResponse>>('/assistant/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      id: `bot_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: res.data.reply,
      suggestedActions: res.data.suggestedActions,
      referencedCommodities: res.data.referencedCommodities,
    };
  } catch (error) {
    console.warn('Backend assistant API failed, falling back to local grounded engine:', error);
    return processAssistantMessage(userText, region);
  }
}
