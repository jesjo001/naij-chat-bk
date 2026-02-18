/**
 * Temporary Email Detection Utility
 * Detects and blocks registration with temporary email services
 */

// Comprehensive list of temporary/disposable email domains
// Updated regularly with new services
const TEMPORARY_EMAIL_DOMAINS = new Set([
  // Popular temporary email services
  '10minutemail.com',
  '10minutesmail.com',
  'tempmail.com',
  'temp-mail.org',
  'throwaway.email',
  'maildrop.cc',
  'mailinator.com',
  'guerrillamail.com',
  'temp-mail.io',
  'tempmail.org',
  'sharklasers.com',
  'spam4.me',
  'temp-mail.net',
  'trash-mail.com',
  'trashmail.com',
  'yopmail.com',
  'e4ward.com',
  'mockemail.com',
  'fakeinbox.com',
  'mintemail.com',
  'temp-email.net',
  'emailondeck.com',
  'tempemailaddress.com',
  'dropmail.me',
  'mailvoid.com',
  'getinbox.com',
  'temp-sms.com',
  'dispostable.com',
  'temp-mail.cc',
  'throwawaymail.com',
  'maildome.com',
  'mytrashmail.com',
  'guerrillamail.info',
  'grr.la',
  'pokemail.net',
  'tempinbox.com',
  '1secmail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'protonmail.com', // Free service often used for temporary purposes
  '10minutemail.co.uk',
  'mailfreeonline.com',
  'fakeemail.com',
  'testmail.com',
  'temp-email.io',
  'tempmail.info',
  'throwaway.cc',
  'mail.tm',
  'mailtrap.io',
  'ethereal.email',
  'temp.email',
  'mailpoof.com',
  'spam.la',
  'emkei.cz',
  'mailnesia.com',
  'temp.sh',
  'moemail.com',
  'maildome.com',
  'inbox.difuse.io',
  'mail.difuse.io',
  'tagas.de',
  'no-reply.com',
  'noreply.com',
  'trashmail.ws',
  'spam.org',
  'spam.net',
  'spam.su',
  'spam.co.uk',
  'spam.de',
  'spam.fr',
  'spam.it',
  'spam.la',
  'spam.mx',
  'spam.com.br',
  'spam.ru',
  'spam.ua',
  'spam.cz',
  'spam.pl',
  'spam.sk',
  'spam.ch',
  'spam.at',
  'spam.be',
  'spam.nl',
  'spam.dk',
  'spam.se',
  'spam.no',
  'spam.fi',
  'spam.gr',
  'spam.pt',
  'spam.es',
]);

// Regex patterns for detecting temporary email-like addresses
const TEMPORARY_EMAIL_PATTERNS = [
  /test\d+@/i,
  /dummy\d+@/i,
  /temp\d+@/i,
  /fake\d+@/i,
  /spam\d+@/i,
  /trash\d+@/i,
  /throwaway\d+@/i,
  /anonymous\d+@/i,
];

/**
 * Check if an email address uses a temporary/disposable email service
 * @param email - The email address to check
 * @returns Object with isTemporary flag and reason
 */
export function isTemporaryEmail(email: string): {
  isTemporary: boolean;
  reason?: string;
} {
  if (!email) {
    return { isTemporary: false };
  }

  const emailLower = email.toLowerCase().trim();
  const domain = emailLower.split('@')[1];

  if (!domain) {
    return { isTemporary: false };
  }

  // Check against known temporary email domains
  if (TEMPORARY_EMAIL_DOMAINS.has(domain)) {
    return {
      isTemporary: true,
      reason: `Email domain ${domain} is a temporary email service. Please use a real email address.`,
    };
  }

  // Check against temporary email patterns
  for (const pattern of TEMPORARY_EMAIL_PATTERNS) {
    if (pattern.test(emailLower)) {
      return {
        isTemporary: true,
        reason: 'Email address appears to be temporary. Please use a real email address.',
      };
    }
  }

  return { isTemporary: false };
}

/**
 * Get a list of common temporary email domains for reference
 */
export function getTemporaryEmailDomains(): string[] {
  return Array.from(TEMPORARY_EMAIL_DOMAINS).sort();
}

/**
 * Add custom temporary email domains to the detection list
 * @param domains - Array of domains to add
 */
export function addTemporaryEmailDomains(domains: string[]): void {
  domains.forEach((domain) => {
    TEMPORARY_EMAIL_DOMAINS.add(domain.toLowerCase().trim());
  });
}
