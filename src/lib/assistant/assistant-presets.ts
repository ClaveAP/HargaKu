import { AssistantPromptPreset } from '@/types/assistant';

export const DEFAULT_PROMPT_PRESETS: AssistantPromptPreset[] = [
  {
    id: 'p1',
    label: '🍲 Resep Sop Ayam Hemat 4 Porsi',
    prompt: 'Berapa estimasi belanja bahan sayur sop + ayam untuk 4 porsi hari ini?',
    category: 'recipe',
  },
  {
    id: 'p2',
    label: '🌶️ Cabai Rawit 25rb / 250g Wajar?',
    prompt: 'Tadi pedagang nawarin cabai rawit merah 25 ribu seperempat kilo, wajar gak?',
    category: 'price-check',
  },
  {
    id: 'p3',
    label: '📉 Belanja Apa yang Lagi Murah?',
    prompt: 'Bahan pangan apa saja yang harganya lagi turun atau murah hari ini?',
    category: 'cheap-deals',
  },
  {
    id: 'p4',
    label: '🧺 Belanja Lauk dengan Budget 50 Ribu',
    prompt: 'Punya budget 50 ribu, dapet bahan masakan apa aja di pasar?',
    category: 'recipe',
  },
];
