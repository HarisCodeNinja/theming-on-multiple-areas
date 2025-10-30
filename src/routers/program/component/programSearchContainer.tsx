import SearchInput from '@/components/Search';
import TableConfigurationDrawer from '@/components/TableConfiguration';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion, useAnimation } from 'framer-motion';
import { ListFilter, ListRestart, Search, Settings } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { programTableColumns } from '../hooks/useProgramTable';
import programTableConfigDefault from '../data/programTableConfigDefault';
import { useProgramSearch, SearchFormData } from '../hooks/useProgramSearch';
import { IProgramFilters } from '../interface';
import PROGRAM_CONSTANTS from '../constants';
import { Label, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

interface SearchContainerProps {
  openConfigDrawer?: boolean;
  setOpenConfigDrawer?: (open: boolean) => void;
  onFiltersChange?: (filters: IProgramFilters) => void;
  initialFilters?: SearchFormData;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ openConfigDrawer, setOpenConfigDrawer, onFiltersChange, initialFilters }) => {
  const controls = useAnimation();
  const [localConfigDrawerOpen, setLocalConfigDrawerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { form, autoSearch, multiSort, toggleAutoSearch, toggleMultiSort, triggerSearch, handleManualSearchAll, handleResetAllFilters, currentFilters } = useProgramSearch({
    onFiltersChange,
    initialFilters,
  });

  const isConfigDrawerOpen = openConfigDrawer !== undefined ? openConfigDrawer : localConfigDrawerOpen;
  const handleSetConfigDrawer = openConfigDrawer !== undefined && setOpenConfigDrawer ? setOpenConfigDrawer : setLocalConfigDrawerOpen;

  const handleClick = async () => {
    await controls.start({ rotate: 360, transition: { duration: 0.5, ease: 'easeInOut' } });
    controls.set({ rotate: 0 });
  };

  const createFieldHandler = useCallback(
    function <T>(fieldName: keyof SearchFormData) {
      return (value: T) => {
        if (autoSearch) {
          triggerSearch({ ...form.getValues(), [fieldName]: value });
        }
      };
    },
    [autoSearch, triggerSearch, form],
  );

  const handlers = useMemo(
    () => ({
      programName: createFieldHandler<string>('programName'),
      programType: createFieldHandler<string>('programType'),
    }),
    [triggerSearch, form, createFieldHandler],
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Form {...form}>
      {/* Controls */}
      <div className="flex flex-col gap-2  md:flex-row md:justify-between md:items-center ">
        <h3 className="text-base font-semibold">Search & Filters</h3>
        <div className="flex grow flex-wrap md:flex-nowrap gap-2 justify-end">
          <Button variant={'outline'} onClick={toggleExpanded}>
            <ListFilter />
            Filters
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" onClick={handleClick} className={`text-sm ${autoSearch ? 'bg-primary border-primary hover:bg-black' : ''}`}>
                <motion.div whileHover={{ rotate: 90 }} whileTap={{ rotate: 180 }} animate={controls} className="flex">
                  <Settings className={`size-4 ${autoSearch ? 'text-white' : ''}`} />
                </motion.div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Table Settings</h4>
                  <p className="text-muted-foreground text-sm">
                    {autoSearch ? 'Auto search is enabled. Results update as you type.' : 'Manual search is enabled. Click search button to get results.'}
                    {multiSort ? ' Multi-sort is enabled - click columns to build sort combinations.' : ' Single-sort mode - only latest column sort applies.'}
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="autoSearch">Auto Search</Label>
                    <Switch id="autoSearch" checked={autoSearch} onCheckedChange={toggleAutoSearch} />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="multiSort">Multi Sort</Label>
                    <Switch id="multiSort" checked={multiSort} onCheckedChange={toggleMultiSort} />
                  </div>
                  <div className="pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleSetConfigDrawer(true)}>
                      <Settings className="size-4 mr-2" />
                      Column Settings
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="grid items-start grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 border-t mt-5 pt-5">
            <FormField
              control={form.control}
              name="programName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchInput
                      placeholder="Search program name"
                      value={field.value?.toString() || ''}
                      onChange={field.onChange}
                      onSearch={handlers.programName}
                      autoSearch={autoSearch}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="programType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value || ''}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (autoSearch) {
                          handlers.programType(value);
                        }
                      }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Program Type</SelectItem>
                        <SelectItem key="PreReq" value="PreReq">
                          PreReq
                        </SelectItem>
                        <SelectItem key="PostReq" value="PostReq">
                          PostReq
                        </SelectItem>
                        <SelectItem key="Optional" value="Optional">
                          Optional
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 justify-end pt-5">
            {!autoSearch && isExpanded && (
              <Button onClick={handleManualSearchAll}>
                <Search />
                Search
              </Button>
            )}
            {isExpanded && (
              <Button variant="outline" onClick={handleResetAllFilters}>
                <ListRestart />
                Reset All
              </Button>
            )}
          </div>
        </>
      )}

      <TableConfigurationDrawer
        nameSpace={PROGRAM_CONSTANTS.ENTITY_KEY}
        tableConfigDefault={programTableConfigDefault}
        tableKey={PROGRAM_CONSTANTS.TABLE_CONFIG_KEY}
        title={`${PROGRAM_CONSTANTS.ENTITY_NAME} Table Configuration`}
        open={isConfigDrawerOpen}
        setOpen={handleSetConfigDrawer}
        columns={programTableColumns}
      />
    </Form>
  );
};

export default SearchContainer;
