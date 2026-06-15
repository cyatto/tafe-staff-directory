export interface Contact {
  id: number;
  name: string;
  phone: string;
  departmentId: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Department {
  id: number;
  name: string;
}

export const DEPARTMENTS: Department[] = [
  { id: 0, name: "General" },
  { id: 1, name: "Information Communications Technology" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Human Resources" },
];

export const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: "John Smith",  phone: "02 9988 2211", departmentId: 1, street: "1 Code Lane",             city: "Javaville",  state: "NSW", zip: "0100", country: "Australia" },
  { id: 2, name: "Sue White",   phone: "03 8899 2255", departmentId: 2, street: "16 Bit Way",              city: "Byte Cove",  state: "QLD", zip: "1101", country: "Australia" },
  { id: 3, name: "Bob O'Bits",  phone: "05 7788 2255", departmentId: 3, street: "8 Silicon Road",          city: "Cloud Hills", state: "VIC", zip: "1001", country: "Australia" },
  { id: 4, name: "Mary Blue",   phone: "06 4455 9988", departmentId: 2, street: "4 Processor Boulevard",   city: "Appletson", state: "NT",  zip: "1010", country: "Australia" },
  { id: 5, name: "Mick Green",  phone: "02 9988 1122", departmentId: 3, street: "700 Bandwidth Street",    city: "Bufferland", state: "NSW", zip: "0110", country: "Australia" },
];

export const AVATAR_PALETTE = [
  { bg: "#b8213a", fg: "#ffffff" },
  { bg: "#6b1527", fg: "#ffffff" },
  { bg: "#7a4a52", fg: "#ffffff" },
  { bg: "#1a0a0d", fg: "#ffffff" },
  { bg: "#d4698a", fg: "#ffffff" },
];

export function getAvatarStyle(name: string) {
  let hash = 0;
  for (const c of name) hash = (hash + c.charCodeAt(0)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[hash];
}

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getDepartmentName(id: number): string {
  return DEPARTMENTS.find((d) => d.id === id)?.name ?? "General";
}
