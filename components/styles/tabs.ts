/**
 * Tabs on a dark code panel, specified as utilities in
 * styles/tailwind.css. Put them inside ON_DARK and give the row
 * role="tablist" and each tab role="tab" with aria-selected.
 */

/** A dark code panel (Night Owl) for code and its tabs. Text inside turns light. */
export const CODE_PANEL = 'code-panel';

/** The code panel's fill with no edge, for pieces inside a panel whose edge another element draws (the GraphQL tabs' code). */
export const CODE_PANEL_FILL = 'code-panel-fill';

/** The row of tabs, with a faint divider under it. */
export const TAB_LIST = 'tab-list';

/** A tab: 70% until selected; the selected tab gets a solid orange underline. */
export const TAB = 'tab';

/** The /design index's current section or group: a thin orange rule and the strong ink. Sides and width at the call site. */
export const INDEX_CURRENT = 'index-current';
