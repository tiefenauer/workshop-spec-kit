import React from 'react';

interface FiltersPanelProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export default function FiltersPanel({
  tags,
  selectedTags,
  onToggleTag,
}: FiltersPanelProps) {
  return (
    <div
      className="rounded-lg border border-gray-200 p-6"
      role="region"
      aria-label="Episode filters"
      aria-live="polite"
    >
      <h3 className="mb-4 text-lg font-semibold text-dark">Filter by Tags</h3>

      <div className="space-y-3">
        {tags.map((tag) => (
          <label key={tag} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onToggleTag(tag)}
              className="h-4 w-4 rounded border-gray-300 text-accent transition-colors"
              aria-label={`Filter by ${tag}`}
            />
            <span className="text-dark group-hover:text-accent transition-colors">{tag}</span>
            <span className="text-sm text-gray-400">({tag})</span>
          </label>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <button
          onClick={() => selectedTags.forEach(onToggleTag)}
          className="mt-4 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Clear all filters"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

