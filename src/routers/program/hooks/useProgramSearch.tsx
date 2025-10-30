import { useEffect, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTableConfiguration } from '@/store/slice/tableConfigurationSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { IProgramFilters } from '../interface';
import PROGRAM_CONSTANTS from '../constants';
import { searchProgramSchema } from '../validation';
import { IProgramSearch } from '../interface';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import programTableConfigDefault from '../data/programTableConfigDefault';

interface UseProgramSearchProps {
  onFiltersChange?: (filters: IProgramFilters) => void;
  initialFilters?: IProgramSearch;
}

export const useProgramSearch = ({ onFiltersChange, initialFilters }: UseProgramSearchProps = {}) => {
  const dispatch = useAppDispatch();
  // Initialize table configuration
  useInitializeTableConfig(PROGRAM_CONSTANTS.TABLE_CONFIG_KEY, programTableConfigDefault);
  
  const tableConfiguration = useAppSelector((state) => state.tableConfiguration[PROGRAM_CONSTANTS.TABLE_CONFIG_KEY]);
  const autoSearch = tableConfiguration?.autoSearch ?? false;
  const multiSort = tableConfiguration?.multiSort ?? false;

  // Local state for current filters
  const [currentFilters, setCurrentFilters] = useState<IProgramFilters>({});

  // Form setup
  const form = useForm<IProgramSearch>({
    resolver: zodResolver(searchProgramSchema),
    defaultValues: initialFilters || getDefaultFormValues(searchProgramSchema),
  });

  const watchedValues = useWatch({ control: form.control });

  const addStringFilter = useCallback((filters: IProgramFilters, key: keyof IProgramFilters, value?: any) => {
    if (value !== undefined && value !== null && value !== '') {
      // Convert value to string for query parameters
      const stringValue = typeof value === 'string' ? value : String(value);
      if (stringValue.trim() !== '') {
        filters[key] = stringValue as never;
      }
    }
  }, []);

  const buildFilterKeys = useCallback(
    (data: IProgramSearch): IProgramFilters => {
      const filters: IProgramFilters = {};

      
      
      
      addStringFilter(filters, 'programName', data.programName);
      addStringFilter(filters, 'programType', data.programType);

      return filters;
    },
    [addStringFilter],
  );

  // Trigger search - uses local state and callback
  const triggerSearch = useCallback(
    (data: IProgramSearch) => {
      const filterKeys = buildFilterKeys(data);
      setCurrentFilters(filterKeys);
      onFiltersChange?.(filterKeys);
    },
    [buildFilterKeys, onFiltersChange],
  );

  // Auto search effect with debouncing
  useEffect(() => {
    if (!autoSearch) return;

    // Skip if all values are empty on initial load
    const hasAnyValue = (watchedValues.programName && watchedValues.programName !== '' || watchedValues.programType && watchedValues.programType !== '');
    if (!hasAnyValue) return;

    const timeoutId = setTimeout(() => {
      triggerSearch(watchedValues);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [watchedValues, autoSearch, triggerSearch]);

  // Reset functions
  const resetAllFilters = useCallback(() => {
    const emptyFilters: IProgramSearch = {
      programName: '',
      programType: ''
    };
    form.reset(emptyFilters);
    setCurrentFilters({});
    onFiltersChange?.({});
  }, [form, onFiltersChange]);

  // Search action handlers
  const handleManualSearchAll = useCallback(() => {
    const formData = form.getValues();
    triggerSearch(formData);
  }, [form, triggerSearch]);

  const handleResetAllFilters = useCallback(() => {
    resetAllFilters();
  }, [resetAllFilters]);

  // Table configuration toggles
  const toggleAutoSearch = useCallback(() => {
    dispatch(
      setTableConfiguration({
        name: PROGRAM_CONSTANTS.TABLE_CONFIG_KEY,
        data: { ...tableConfiguration, autoSearch: !autoSearch },
      }),
    );
  }, [dispatch, autoSearch, tableConfiguration]);

  const toggleMultiSort = useCallback(() => {
    dispatch(
      setTableConfiguration({
        name: PROGRAM_CONSTANTS.TABLE_CONFIG_KEY,
        data: { ...tableConfiguration, multiSort: !multiSort },
      }),
    );
  }, [dispatch, autoSearch, tableConfiguration]);

  return {
    // Form and values
    form,
    watchedValues,
    buildFilterKeys,
    currentFilters,

    // Table configuration
    autoSearch,
    multiSort,
    toggleAutoSearch,
    toggleMultiSort,

    // Search actions
    triggerSearch,
    handleManualSearchAll,
    handleResetAllFilters,

    // Reset function
    resetAllFilters,
  };
};
