'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import type {
  AdminCommodity,
  AdminMarket,
  DailyPriceRecord,
  AdminReport,
  AdminUserProfile,
  AdminState,
} from '../types/admin';
import {
  INITIAL_ADMIN_STATE,
  adminStoreReducer,
} from './admin-state';

interface AdminStoreContextType {
  isLoaded: boolean;
  currentUser: AdminUserProfile;
  commodities: AdminCommodity[];
  markets: AdminMarket[];
  dailyPrices: Record<string, DailyPriceRecord>;
  reports: AdminReport[];
  updateProfile: (patch: Partial<AdminUserProfile>) => void;
  addCommodity: (commodity: AdminCommodity) => void;
  updateCommodity: (id: string, patch: Partial<AdminCommodity>) => void;
  deleteCommodity: (id: string) => void;
  addMarket: (market: AdminMarket) => void;
  updateMarket: (id: string, patch: Partial<AdminMarket>) => void;
  deleteMarket: (id: string) => void;
  updateDailyPrices: (
    marketId: string,
    recordedDate: string,
    entries: Array<{ commodityId: string; price: number }>
  ) => void;
  addReport: (report: AdminReport) => void;
  approveReport: (id: string) => void;
  rejectReport: (id: string, reason?: string) => void;
  requestReportInfo: (id: string, note: string) => void;
  resetToDefaultData: () => void;
}

const STORAGE_KEY = 'hargaku_admin_store_v3';

const AdminStoreContext = createContext<AdminStoreContextType | null>(null);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminStoreReducer, INITIAL_ADMIN_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Synchronize from LocalStorage on initial client mount
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('hargaku_admin_store_v2') ||
        localStorage.getItem('hargaku_admin_store_v1');

      if (saved) {
        const parsed = JSON.parse(saved) as AdminState;
        if (parsed && Array.isArray(parsed.commodities) && Array.isArray(parsed.markets)) {
          const rawUser = parsed.currentUser;
          const isLegacy =
            rawUser?.name?.toLowerCase().includes('hendra') ||
            rawUser?.fullName?.toLowerCase().includes('hendra') ||
            rawUser?.email?.toLowerCase().includes('hendra');

          // If the cached store still has legacy 5-market Bogor pilot, upgrade to national dataset
          const isOldBogorOnly = parsed.markets.length <= 5;
          const markets = isOldBogorOnly ? INITIAL_ADMIN_STATE.markets : parsed.markets;
          const dailyPrices = isOldBogorOnly
            ? { ...INITIAL_ADMIN_STATE.dailyPrices, ...parsed.dailyPrices }
            : parsed.dailyPrices;

          dispatch({
            type: 'SET_STATE',
            payload: {
              ...INITIAL_ADMIN_STATE,
              ...parsed,
              markets,
              dailyPrices,
              currentUser: !rawUser || isLegacy ? INITIAL_ADMIN_STATE.currentUser : rawUser,
            },
          });
        }
      }

      // Cleanup legacy keys
      localStorage.removeItem('hargaku_admin_store_v1');
      localStorage.removeItem('hargaku_admin_store_v2');
    } catch {
      // Fallback silently to initial mock state if storage is inaccessible
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Handle private browsing or quota exceeded gracefully
      }
    }
  }, [state, isLoaded]);

  const updateProfile = useCallback((patch: Partial<AdminUserProfile>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: patch });
  }, []);

  const addCommodity = useCallback((commodity: AdminCommodity) => {
    dispatch({ type: 'ADD_COMMODITY', payload: commodity });
  }, []);

  const updateCommodity = useCallback((id: string, patch: Partial<AdminCommodity>) => {
    dispatch({ type: 'UPDATE_COMMODITY', payload: { ...patch, id } });
  }, []);

  const deleteCommodity = useCallback((id: string) => {
    dispatch({ type: 'DELETE_COMMODITY', payload: id });
  }, []);

  const addMarket = useCallback((market: AdminMarket) => {
    dispatch({ type: 'ADD_MARKET', payload: market });
  }, []);

  const updateMarket = useCallback((id: string, patch: Partial<AdminMarket>) => {
    dispatch({ type: 'UPDATE_MARKET', payload: { ...patch, id } });
  }, []);

  const deleteMarket = useCallback((id: string) => {
    dispatch({ type: 'DELETE_MARKET', payload: id });
  }, []);

  const updateDailyPrices = useCallback(
    (
      marketId: string,
      recordedDate: string,
      entries: Array<{ commodityId: string; price: number }>
    ) => {
      dispatch({
        type: 'UPDATE_DAILY_PRICES',
        payload: { marketId, recordedDate, entries },
      });
    },
    []
  );

  const addReport = useCallback((report: AdminReport) => {
    dispatch({ type: 'ADD_REPORT', payload: report });
  }, []);

  const approveReport = useCallback((id: string) => {
    dispatch({ type: 'APPROVE_REPORT', payload: id });
  }, []);

  const rejectReport = useCallback((id: string, reason?: string) => {
    dispatch({ type: 'REJECT_REPORT', payload: { id, reason } });
  }, []);

  const requestReportInfo = useCallback((id: string, note: string) => {
    dispatch({ type: 'REQUEST_REPORT_INFO', payload: { id, note } });
  }, []);

  const resetToDefaultData = useCallback(() => {
    dispatch({ type: 'RESET_DEFAULT' });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors on reset
    }
  }, []);

  return (
    <AdminStoreContext.Provider
      value={{
        isLoaded,
        currentUser: state.currentUser || INITIAL_ADMIN_STATE.currentUser,
        commodities: state.commodities,
        markets: state.markets,
        dailyPrices: state.dailyPrices,
        reports: state.reports,
        updateProfile,
        addCommodity,
        updateCommodity,
        deleteCommodity,
        addMarket,
        updateMarket,
        deleteMarket,
        updateDailyPrices,
        addReport,
        approveReport,
        rejectReport,
        requestReportInfo,
        resetToDefaultData,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore(): AdminStoreContextType {
  const context = useContext(AdminStoreContext);
  if (!context) {
    throw new Error('useAdminStore must be used within an AdminStoreProvider');
  }
  return context;
}
