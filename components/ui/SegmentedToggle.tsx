import {
  SEGMENTED_OPTION,
  SEGMENTED_SELECTED,
  SEGMENTED_TRACK,
} from '@/component/styles/buttons';

/**
 * A segmented toggle (pricing Monthly / Annually): one choice from a few
 * short options. The Secondary blue thumb slides to the selected option.
 * `fill` stretches it to its container, the options sharing the width.
 */
export const SegmentedToggle = <T extends string>({
  options,
  value,
  onChange,
  label,
  fill = false,
}: {
  options: { value: NoInfer<T>; label: string }[];
  value: T;
  onChange: (value: NoInfer<T>) => void;
  /** What the toggle chooses, for screen readers, e.g. “Billing period”. */
  label: string;
  /** Stretch to the container's width, options sharing it, with tighter side padding. */
  fill?: boolean;
}) => {
  const selected = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  return (
    // biome-ignore lint/a11y/useSemanticElements: a pressed-button group, not a fieldset of inputs
    <div
      role="group"
      aria-label={label}
      className={fill ? `${SEGMENTED_TRACK} w-full` : SEGMENTED_TRACK}
    >
      {/* Calculated, so set inline: the thumb is one option wide and
          slides by whole options to the selected one. */}
      <span
        aria-hidden="true"
        className={SEGMENTED_SELECTED}
        style={{
          width: `${100 / options.length}%`,
          transform: `translateX(${selected * 100}%)`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          className={fill ? `${SEGMENTED_OPTION} px-4` : SEGMENTED_OPTION}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
