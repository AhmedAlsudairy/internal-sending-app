'use client';

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { Check, ChevronDown, X } from 'lucide-react';

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  emptyText?: string;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select options',
  emptyText = 'No options found.',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (selectedValue: string) => {
    const exists = value.includes(selectedValue);
    if (exists) {
      onValueChange(value.filter((v) => v !== selectedValue));
      return;
    }
    onValueChange([...value, selectedValue]);
  };

  const selectedOptions = options.filter((option) => value.includes(option.value));

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <span className="flex flex-wrap items-center gap-1.5">
            {selectedOptions.length === 0 ? (
              <span className="text-gray-400">{placeholder}</span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
                >
                  {option.label}
                </span>
              ))
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="start"
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
        >
          <Command className="w-full">
            <Command.Input
              placeholder="Search department..."
              className="mb-2 h-9 w-full rounded-md border border-gray-200 px-2 text-sm outline-none focus:border-blue-500"
            />

            <Command.List className="max-h-56 overflow-y-auto">
              <Command.Empty className="px-2 py-3 text-sm text-gray-500">
                {emptyText}
              </Command.Empty>

              {options.map((option) => {
                const checked = value.includes(option.value);
                return (
                  <Command.Item
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggleValue(option.value)}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 data-[selected=true]:bg-blue-50"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        checked
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{option.label}</span>
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>

          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <button
              type="button"
              onClick={() => onValueChange([])}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md bg-blue-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-800"
            >
              Done
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
