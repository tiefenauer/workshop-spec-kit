#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Data validation script for episodes.json
 * Checks required fields and duration format
 */

const REQUIRED_FIELDS = ['id', 'title', 'description', 'publishDate', 'duration', 'tags', 'slug'];
const OPTIONAL_FIELDS = ['image', 'transcript', 'audioUrl', 'featured'];

function validateDuration(duration) {
  // Should be either a string in HH:MM:SS format or a number (seconds)
  if (typeof duration === 'number') {
    return true;
  }

  if (typeof duration !== 'string') {
    return false;
  }

  // Check HH:MM:SS or MM:SS format
  const parts = duration.split(':');
  if (parts.length < 2 || parts.length > 3) {
    return false;
  }

  return parts.every((part) => /^\d{1,2}$/.test(part));
}

function validateEpisodes(episodes) {
  let hasErrors = false;

  episodes.forEach((episode, index) => {
    // Check required fields
    REQUIRED_FIELDS.forEach((field) => {
      if (!(field in episode) || episode[field] === undefined) {
        console.error(`❌ Episode ${index + 1} (${episode.id || 'unknown'}): Missing required field "${field}"`);
        hasErrors = true;
      }
    });

    // Validate duration format
    if ('duration' in episode && !validateDuration(episode.duration)) {
      console.error(
        `❌ Episode ${index + 1} (${episode.id}): Invalid duration format "${episode.duration}". Expected HH:MM:SS or MM:SS format or a number.`
      );
      hasErrors = true;
    }

    // Validate tags is an array
    if ('tags' in episode && !Array.isArray(episode.tags)) {
      console.error(
        `❌ Episode ${index + 1} (${episode.id}): "tags" field must be an array, got ${typeof episode.tags}`
      );
      hasErrors = true;
    }

    // Validate publishDate is a valid date
    if ('publishDate' in episode) {
      const date = new Date(episode.publishDate);
      if (isNaN(date.getTime())) {
        console.error(
          `❌ Episode ${index + 1} (${episode.id}): Invalid publishDate "${episode.publishDate}". Expected ISO 8601 format.`
        );
        hasErrors = true;
      }
    }
  });

  return !hasErrors;
}

try {
  const filePath = path.resolve(process.cwd(), 'site/data/episodes.json');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Episodes file not found: ${filePath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const episodes = JSON.parse(fileContent);

  if (!Array.isArray(episodes)) {
    console.error('❌ Episodes data must be an array');
    process.exit(1);
  }

  console.log(`📋 Validating ${episodes.length} episodes...`);
  console.log('');

  const isValid = validateEpisodes(episodes);

  console.log('');

  if (isValid) {
    console.log('✅ All episodes are valid!');
    process.exit(0);
  } else {
    console.log('❌ Validation failed. Please fix the errors above.');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Validation error:', error.message);
  process.exit(1);
}

