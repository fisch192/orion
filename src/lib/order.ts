export type OrderLead = {
  name: string;
  email: string;
  interest: string;
  quantity: string;
  message: string;
};

const contactEmail = 'hello@orion.pda';

export function buildOrderMailto(lead: OrderLead): string {
  const subject = `Orion PDA - ${lead.interest || 'order'} request`;
  const body = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Interest: ${lead.interest}`,
    `Quantity: ${lead.quantity}`,
    '',
    lead.message
  ].join('\n');

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
