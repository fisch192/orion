import { describe, expect, it } from 'vitest';
import { buildOrderMailto } from './order';

describe('buildOrderMailto', () => {
  it('creates an investor/order email with encoded fields', () => {
    const href = buildOrderMailto({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      interest: 'Investor access',
      quantity: '250 pilot units',
      message: 'Send me the deck & allocation terms.'
    });

    expect(href).toContain('mailto:hello@orion.pda');
    expect(href).toContain('subject=Orion%20PDA%20-%20Investor%20access%20request');
    expect(href).toContain('Name%3A%20Ada%20Lovelace');
    expect(href).toContain('Quantity%3A%20250%20pilot%20units');
    expect(href).toContain('Send%20me%20the%20deck%20%26%20allocation%20terms.');
  });
});
