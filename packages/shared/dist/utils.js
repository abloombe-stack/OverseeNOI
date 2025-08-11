import { Role } from './types';
export function maskPII(value, type = 'name') {
    if (!value)
        return '';
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
            return value.split(' ').map(part => part.charAt(0) + '*'.repeat(Math.max(0, part.length - 1))).join(' ');
    }
}
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}
export function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
export function calculateOccupancyRate(occupied, total) {
    return total > 0 ? (occupied / total) * 100 : 0;
}
export function calculateDelinquencyRate(delinquent, total) {
    return total > 0 ? (delinquent / total) * 100 : 0;
}
export function getRoleHierarchy() {
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
export function canUserAccessRole(userRole, targetRole) {
    const hierarchy = getRoleHierarchy();
    return hierarchy[userRole] >= hierarchy[targetRole];
}
export function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}
export function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
export function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
export function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = key(item);
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function retry(fn, attempts = 3, delay = 1000) {
    return fn().catch(err => {
        if (attempts <= 1)
            throw err;
        return sleep(delay).then(() => retry(fn, attempts - 1, delay * 2));
    });
}
//# sourceMappingURL=utils.js.map