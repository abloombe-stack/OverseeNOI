import { Role } from './types';

export function maskPII(value: string, type: 'email' | 'phone' | 'ssn' | 'name' = 'name'): string {
  if (!value) return '';

  switch (type) {
    case 'email':
      const [local, domain] = value.split('@');
      return `${local.charAt(0)}***@${domain}`;
    case 'phone':
      return value.replace(/(\d{3})\d{3}(\d{4})/, '$1-***-$2');
    case 'ssn':
      return value.replace(/\d{5}(\d{4})/, '***-**-$1');
    case 'name':
    default:
      return value.split(' ').map(part => 
        part.charAt(0) + '*'.repeat(Math.max(0, part.length - 1))
      ).join(' ');
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculateOccupancyRate(occupied: number, total: number): number {
  return total > 0 ? (occupied / total) * 100 : 0;
}

export function calculateDelinquencyRate(delinquent: number, total: number): number {
  return total > 0 ? (delinquent / total) * 100 : 0;
}

export function getRoleHierarchy(): Record<Role, number> {
  return {
    [Role.VP]: 100,
    [Role.DIRECTOR]: 90,
    [Role.ASSET_MANAGER]: 80,
    [Role.SENIOR_ANALYST]: 70,
    [Role.CAPEX_PM]: 60,
    [Role.REGIONAL_PM]: 60,
    [Role.PROPERTY_MANAGER]: 50,
    [Role.ASSISTANT_PM_AR]: 40,
    [Role.LEASING_MANAGER]: 40,
    [Role.LEASING_AGENT]: 30,
    [Role.MAINTENANCE_SUPER]: 30,
    [Role.MAINTENANCE_TECH]: 20,
    [Role.VENDOR]: 10,
  };
}

export function canUserAccessRole(userRole: Role, targetRole: Role): boolean {
  const hierarchy = getRoleHierarchy();
  return hierarchy[userRole] >= hierarchy[targetRole];
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function groupBy<T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const group = key(item);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> {
  return fn().catch(err => {
    if (attempts <= 1) throw err;
    return sleep(delay).then(() => retry(fn, attempts - 1, delay * 2));
  });
}