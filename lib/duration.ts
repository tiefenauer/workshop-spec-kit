/**
 * Utility functions for formatting and parsing durations
 */

/**
 * Parse duration string in HH:MM:SS format to seconds
 * @param duration Duration string like "00:28:12"
 * @returns Duration in seconds
 */
export function parseDurationString(duration: string): number {
  if (typeof duration === 'number') {
    return duration;
  }

  if (!duration || typeof duration !== 'string') {
    console.warn('Invalid duration format:', duration);
    return 0;
  }

  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  console.warn('Could not parse duration:', duration);
  return 0;
}

/**
 * Format seconds to HH:MM:SS or MM:SS format
 * @param seconds Duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(String(hours).padStart(2, '0'));
  }
  parts.push(String(minutes).padStart(2, '0'));
  parts.push(String(secs).padStart(2, '0'));

  return parts.join(':');
}

