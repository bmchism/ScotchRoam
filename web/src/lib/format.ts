// Format utilities for Bourbon Roam.

// Format an age statement for display (returns "NAS" — No Age Statement — when absent).
export function formatAge(age?: string): string {
  return age && age.trim() ? age.trim() : "NAS";
}

// Clean up a region string for display.
export function cleanRegion(region: string): string {
  return region.trim();
}
