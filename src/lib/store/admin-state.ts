import type { AdminState, AdminAction } from '../types/admin.ts';
import { INITIAL_ADMIN_STATE } from './admin-seed.ts';

export {
  DEFAULT_ADMIN_USER,
  INITIAL_COMMODITIES,
  INITIAL_MARKETS,
  INITIAL_DAILY_PRICES,
  INITIAL_ADMIN_REPORTS,
  INITIAL_ADMIN_STATE,
} from './admin-seed.ts';

export function adminStoreReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_STATE': {
      const user = action.payload.currentUser;
      const isLegacyUser =
        user?.name?.toLowerCase().includes('hendra') ||
        user?.fullName?.toLowerCase().includes('hendra') ||
        user?.email?.toLowerCase().includes('hendra');

      return {
        ...INITIAL_ADMIN_STATE,
        ...action.payload,
        currentUser: !user || isLegacyUser ? INITIAL_ADMIN_STATE.currentUser : user,
      };
    }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
      };

    case 'ADD_COMMODITY':
      return {
        ...state,
        commodities: [action.payload, ...state.commodities],
      };

    case 'UPDATE_COMMODITY':
      return {
        ...state,
        commodities: state.commodities.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };

    case 'DELETE_COMMODITY':
      return {
        ...state,
        commodities: state.commodities.filter((item) => item.id !== action.payload),
      };

    case 'ADD_MARKET':
      return {
        ...state,
        markets: [...state.markets, action.payload],
      };

    case 'UPDATE_MARKET':
      return {
        ...state,
        markets: state.markets.map((m) =>
          m.id === action.payload.id ? { ...m, ...action.payload } : m
        ),
      };

    case 'DELETE_MARKET':
      return {
        ...state,
        markets: state.markets.filter((m) => m.id !== action.payload),
      };

    case 'UPDATE_DAILY_PRICES': {
      const nextDaily = { ...state.dailyPrices };
      for (const entry of action.payload.entries) {
        const key = `${action.payload.marketId}_${entry.commodityId}`;
        const prev = nextDaily[key]?.price;
        nextDaily[key] = {
          marketId: action.payload.marketId,
          commodityId: entry.commodityId,
          price: entry.price,
          recordedDate: action.payload.recordedDate,
          previousPrice: prev,
        };
      }
      return { ...state, dailyPrices: nextDaily };
    }

    case 'APPROVE_REPORT':
      return {
        ...state,
        reports: state.reports.map((r) =>
          r.id === action.payload ? { ...r, status: 'APPROVED' } : r
        ),
      };

    case 'REJECT_REPORT':
      return {
        ...state,
        reports: state.reports.map((r) =>
          r.id === action.payload.id
            ? {
                ...r,
                status: 'REJECTED',
                anomalyReason: action.payload.reason || r.anomalyReason,
              }
            : r
        ),
      };

    case 'REQUEST_REPORT_INFO':
      return {
        ...state,
        reports: state.reports.map((r) =>
          r.id === action.payload.id
            ? {
                ...r,
                citizenNotes: `${r.citizenNotes || ''} [Moderator: ${action.payload.note}]`,
              }
            : r
        ),
      };

    case 'RESET_DEFAULT':
      return INITIAL_ADMIN_STATE;

    default:
      return state;
  }
}
