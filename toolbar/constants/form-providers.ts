/**
 * This file contains constants for known form providers that should always
 * be detected as forms, regardless of the form detection score.
 */

/**
 * URL patterns that should be recognized as forms.
 * Each entry is a string that will be checked using startsWith against 
 * the current URL and iframe URLs.
 */
export const FORM_PROVIDER_URL_PATTERNS: string[] = [
    'https://form.typeform.com/'
];

/**
 * DOM patterns that indicate a form is present.
 * Each entry is a RegExp pattern that will be tested against the HTML content.
 */
export const FORM_PROVIDER_DOM_PATTERNS: RegExp[] = [
    /AstrodomeSurvey/i,
    /retypedots/i
];

/**
 * CSS selectors that, if found in the document, indicate a form is present.
 * Each entry is a CSS selector string.
 */
export const FORM_PROVIDER_SELECTORS: string[] = [
    '[id*="retype"]',
    '[class*="retype"]'
];