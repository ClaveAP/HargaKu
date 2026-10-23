export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  referencedCommodities?: Array<{
    id: string;
    name: string;
    currentPrice: number;
    unit: string;
    status?: 'FAIR' | 'SLIGHTLY_EXPENSIVE' | 'OVERPRICED' | 'MUCH_CHEAPER';
    statusLabel?: string;
  }>;
  suggestedActions?: Array<{
    label: string;
    href: string;
  }>;
}

export interface AssistantPromptPreset {
  id: string;
  label: string;
  prompt: string;
  category: 'recipe' | 'price-check' | 'cheap-deals' | 'general';
}

export interface AssistantChatRequest {
  message: string;
  regionId: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface AssistantChatResponse {
  reply: string;
  intent?: 'RECIPE_BUDGET' | 'PRICE_CHECK' | 'CHEAP_DEALS' | 'GENERAL' | string;
  suggestedActions?: Array<{
    label: string;
    href: string;
  }>;
  referencedCommodities?: Array<{
    id: string;
    name: string;
    currentPrice: number;
    unit: string;
    status?: 'FAIR' | 'SLIGHTLY_EXPENSIVE' | 'OVERPRICED' | 'MUCH_CHEAPER';
    statusLabel?: string;
  }>;
}
