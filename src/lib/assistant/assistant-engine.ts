import { AssistantMessage } from '@/types/assistant';
import { Region } from '@/types';
import { MOCK_COMMODITY_SUMMARIES } from '@/lib/mock/commodities.data';
import { evaluatePrice, formatRupiah } from '@/lib/price-logic';

export { DEFAULT_PROMPT_PRESETS } from './assistant-presets';

// Calculate regional price by adjusting baseline mock price with island logistics factor
function getRegionalPrice(basePrice: number, region: Region): number {
  if (!region.logisticsCostPct || region.logisticsCostPct === 0) return basePrice;
  return Math.round((basePrice * (1 + region.logisticsCostPct / 100)) / 100) * 100;
}

export async function processAssistantMessage(
  userText: string,
  region: Region
): Promise<AssistantMessage> {
  // Simulate natural typing/thinking latency
  await new Promise((resolve) => setTimeout(resolve, 350));

  const lower = userText.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // 1. Recipe / Budget Analysis: Sop Ayam / Sayur Sop
  if (lower.includes('sop') || lower.includes('sayur sop')) {
    const ayam = getRegionalPrice(36000, region); // 1 kg broiler
    const bawangMerah = getRegionalPrice(34000, region);
    const bawangPutih = getRegionalPrice(39000, region);
    const beras = getRegionalPrice(13500, region);

    const costAyam = Math.round(ayam * 0.5); // 0.5 kg
    const costBumbu = Math.round(bawangMerah * 0.1 + bawangPutih * 0.1); // 1 ons each
    const costBeras = beras; // 1 kg
    const costSayurPelengkap = 7000; // wortel, kentang, kol, seledri
    const total = costAyam + costBumbu + costBeras + costSayurPelengkap;

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: `Berikut estimasi belanja **Sayur Sop Ayam Gurih (Porsi 4 Orang)** di wilayah **${region.name}** mengacu pada acuan pasar hari ini:\n\n` +
        `• **Daging Ayam Broiler (0.5 kg)**: ${formatRupiah(costAyam)}\n` +
        `• **Bumbu Bawang Merah & Putih (2 ons)**: ${formatRupiah(costBumbu)}\n` +
        `• **Sayuran Pelengkap (Wortel, Kentang, Kol)**: ${formatRupiah(costSayurPelengkap)}\n` +
        `• **Beras Medium Pulen (1 kg)**: ${formatRupiah(costBeras)}\n\n` +
        `💵 **Total Estimasi Belanja**: **${formatRupiah(total)}**.\n\n` +
        `💡 *Tips Hemat*: Daging ayam paling segar dan hemat biasanya ada di pasar pukul 05:30 – 07:30 WIB sebelum pasokan pilihan habis.`,
      referencedCommodities: [
        { id: 'com_06', name: 'Daging Ayam Broiler', currentPrice: ayam, unit: 'kg' },
        { id: 'com_01', name: 'Beras Medium', currentPrice: beras, unit: 'kg' },
      ],
      suggestedActions: [
        { label: 'Simulasi di Keranjang', href: '/keranjang' },
        { label: 'Lihat Peta Pasar Terdekat', href: '/peta' },
      ],
    };
  }

  // 2. Budget Consultation: "50 ribu" / "budget 50" / "100 ribu"
  if (lower.includes('50') && (lower.includes('ribu') || lower.includes('budget') || lower.includes('50rb'))) {
    const telur = getRegionalPrice(28000, region);
    const cabai = getRegionalPrice(51000, region);
    const beras = getRegionalPrice(13500, region);
    const minyak = getRegionalPrice(16000, region);

    const pTelur = Math.round(telur * 0.5); // 14.000
    const pBeras = beras; // 13.500
    const pMinyak = Math.round(minyak * 0.5); // 8.000 (0.5L)
    const pCabai = Math.round(cabai * 0.25); // 12.750 (250g)
    const total = pTelur + pBeras + pMinyak + pCabai;

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: `Dengan **Budget Rp 50.000**, ini kombinasi lauk & pangan bergizi paling hemat di **${region.name}** hari ini:\n\n` +
        `1. **Telur Ayam Ras (0.5 kg ~ 8 butir)**: ${formatRupiah(pTelur)}\n` +
        `2. **Beras Medium (1 kg)**: ${formatRupiah(pBeras)}\n` +
        `3. **Minyak Goreng Curah (0.5 L)**: ${formatRupiah(pMinyak)}\n` +
        `4. **Cabai Merah Keriting (250 gr / 2.5 ons)**: ${formatRupiah(pCabai)}\n\n` +
        `💰 **Total Belanja**: **${formatRupiah(total)}** (Sisa kembalian: ${formatRupiah(50000 - total)}).\n\n` +
        `Menu ini cukup untuk lauk makan keluarga (telur balado / dadar + sambal) selama 2–3 hari!`,
      referencedCommodities: [
        { id: 'com_07', name: 'Telur Ayam Ras', currentPrice: telur, unit: 'kg' },
        { id: 'com_08', name: 'Cabai Merah Keriting', currentPrice: cabai, unit: 'kg' },
      ],
      suggestedActions: [
        { label: 'Buka Keranjang Belanja', href: '/keranjang' },
        { label: 'Cek Harga Wajar Telur', href: '/komoditas/telur-ayam-ras' },
      ],
    };
  }

  // 3. Conversational Mark-up / Price Check (e.g. "cabai rawit 25rb seperempat kilo")
  if (
    lower.includes('wajar') ||
    lower.includes('kemahalan') ||
    lower.includes('nawarin') ||
    lower.includes('mark-up') ||
    lower.includes('markup')
  ) {
    // Detect commodity
    let matchedCom = MOCK_COMMODITY_SUMMARIES.find((c) =>
      lower.includes(c.name.toLowerCase()) || lower.includes(c.slug.replace('-', ' '))
    );
    if (!matchedCom && lower.includes('cabai rawit')) {
      matchedCom = MOCK_COMMODITY_SUMMARIES.find((c) => c.slug === 'cabai-rawit-merah');
    }
    if (!matchedCom && lower.includes('bawang merah')) {
      matchedCom = MOCK_COMMODITY_SUMMARIES.find((c) => c.slug === 'bawang-merah');
    }
    if (!matchedCom && lower.includes('daging')) {
      matchedCom = MOCK_COMMODITY_SUMMARIES.find((c) => c.slug === 'daging-sapi-murni');
    }

    // Default to Cabai Rawit if unspecified
    const commodity = matchedCom || MOCK_COMMODITY_SUMMARIES[8]; // Cabai rawit
    const benchmarkPrice = getRegionalPrice(commodity.currentAvgPrice, region);

    // Extract offered price (look for 25rb, 25000, 40rb, etc.)
    let offeredPerKg = benchmarkPrice;
    const numMatch = lower.match(/(\d+[\.,]?\d*)\s*(rb|ribu|k)?/);
    if (numMatch) {
      let rawNum = parseFloat(numMatch[1].replace(',', '.'));
      if (rawNum < 500) rawNum *= 1000; // e.g. "25" -> 25000
      // Check weight
      if (lower.includes('seperempat') || lower.includes('1/4') || lower.includes('250')) {
        offeredPerKg = rawNum * 4;
      } else if (lower.includes('setengah') || lower.includes('1/2') || lower.includes('500')) {
        offeredPerKg = rawNum * 2;
      } else if (lower.includes('ons') || lower.includes('100g')) {
        offeredPerKg = rawNum * 10;
      } else {
        offeredPerKg = rawNum;
      }
    }

    const evalResult = evaluatePrice(
      offeredPerKg,
      benchmarkPrice,
      {
        lapis1HapHet: commodity.hapHetPrice,
        lapis2OfficialAvg: benchmarkPrice,
        lapis3CitizenMedian: benchmarkPrice,
      },
      'HIGH',
      undefined,
      region.name
    );

    const diffPct = (((offeredPerKg - benchmarkPrice) / benchmarkPrice) * 100).toFixed(1);
    const isOver = offeredPerKg > benchmarkPrice;

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: `Evaluasi Penawaran untuk **${commodity.name}** di **${region.name}**:\n\n` +
        `• **Harga Penawaran Disetarakan**: ${formatRupiah(offeredPerKg)} / kg\n` +
        `• **Acuan Rerata Pasar Wilayah**: ${formatRupiah(benchmarkPrice)} / kg\n` +
        `• **Status**: **${evalResult.statusLabel}** (${isOver ? `+${diffPct}%` : `${diffPct}%`} vs acuan)\n\n` +
        `📢 **Saran Belanja**: ${evalResult.advice}`,
      referencedCommodities: [
        {
          id: commodity.id,
          name: commodity.name,
          currentPrice: benchmarkPrice,
          unit: commodity.unit,
          status: evalResult.status,
          statusLabel: evalResult.statusLabel,
        },
      ],
      suggestedActions: [
        { label: 'Uji di Form Cek Harga Wajar', href: '/cek-harga' },
        { label: 'Bandingkan Antar Pasar', href: `/komoditas/${commodity.slug}` },
      ],
    };
  }

  // 4. Recommendation for Cheap / Falling Commodities
  if (lower.includes('murah') || lower.includes('turun') || lower.includes('hemat') || lower.includes('anjlok')) {
    const cheapItems = MOCK_COMMODITY_SUMMARIES.filter((c) => c.changePercentage <= 0).slice(0, 3);
    const itemsList = cheapItems
      .map((item) => {
        const p = getRegionalPrice(item.currentAvgPrice, region);
        return `• **${item.name}**: ${formatRupiah(p)} / ${item.unit} (Tren: ${item.changePercentage}%)`;
      })
      .join('\n');

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: `Berdasarkan pantauan harga terverifikasi di **${region.name}** hari ini, berikut komoditas yang **lagi murah atau stabil turun**:\n\n` +
        `${itemsList}\n\n` +
        `💡 *Rekomendasi Menu*: Jadikan bahan-bahan di atas sebagai menu utama belanja minggu ini untuk memangkas pengeluaran dapur hingga 15–20%.`,
      referencedCommodities: cheapItems.map((c) => ({
        id: c.id,
        name: c.name,
        currentPrice: getRegionalPrice(c.currentAvgPrice, region),
        unit: c.unit,
        status: 'MUCH_CHEAPER',
        statusLabel: 'Murah & Hemat',
      })),
      suggestedActions: [
        { label: 'Lihat Semua di Dashboard', href: '/dashboard' },
        { label: 'Simulasi Keranjang Belanja', href: '/keranjang' },
      ],
    };
  }

  // 5. Direct Commodity Price Queries (e.g. "harga cabai", "harga beras")
  const matchedAny = MOCK_COMMODITY_SUMMARIES.find((c) =>
    lower.includes(c.name.toLowerCase()) || lower.includes(c.slug.replace('-', ' '))
  );

  if (matchedAny) {
    const regionalPrice = getRegionalPrice(matchedAny.currentAvgPrice, region);
    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      timestamp,
      content: `Harga acuan **${matchedAny.name}** di wilayah **${region.name}** hari ini adalah **${formatRupiah(regionalPrice)} / ${matchedAny.unit}**.\n\n` +
        `• **Standar Regulasi HAP Bapanas**: ${formatRupiah(matchedAny.hapHetPrice)} / ${matchedAny.unit}\n` +
        `• **Tren 7 Hari**: ${matchedAny.changePercentage > 0 ? `▲ +${matchedAny.changePercentage}% (Sedang naik)` : `▼ ${matchedAny.changePercentage}% (Stabil/turun)`}\n` +
        `• **Sumber Verifikasi**: Survei Harian PIHPS Bank Indonesia & Bapanas (${region.islandName}).\n\n` +
        `Jika pedagang di pasar mematok harga lebih dari ${formatRupiah(Math.round(regionalPrice * 1.15))}/${matchedAny.unit}, kamu berhak menawar mendekati harga acuan ini!`,
      referencedCommodities: [
        {
          id: matchedAny.id,
          name: matchedAny.name,
          currentPrice: regionalPrice,
          unit: matchedAny.unit,
        },
      ],
      suggestedActions: [
        { label: `Detail Tren ${matchedAny.name}`, href: `/komoditas/${matchedAny.slug}` },
        { label: 'Uji Harga Wajar Lapak', href: '/cek-harga' },
      ],
    };
  }

  // 6. Helpful General Fallback
  return {
    id: `msg_${Date.now()}`,
    role: 'assistant',
    timestamp,
    content: `Halo! Saya **Asisten Pangan Cerdas HargaKu** untuk wilayah **${region.name}** (${region.islandName}).\n\n` +
      `Saya bisa bantu kamu:\n` +
      `1. **Cek Kewajaran Tawaran Pedagang**: Ketik nominal dan barang (contoh: *"Cabai rawit 25rb seperempat kilo wajar gak?"*)\n` +
      `2. **Hitung Estimasi Resep & Budget**: Ketik menu masakan (contoh: *"Bahan sayur sop ayam porsi 4 orang"* atau *"Budget 50 ribu"*)\n` +
      `3. **Rekomendasi Pangan Murah**: Tanya *"Apa yang lagi murah hari ini?"*\n\n` +
      `Ada yang mau kamu tanyakan seputar belanja pasar hari ini?`,
    suggestedActions: [
      { label: 'Buka Dashboard Harga', href: '/dashboard' },
      { label: 'Cek Harga Wajar Lapak', href: '/cek-harga' },
    ],
  };
}
