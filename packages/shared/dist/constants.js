export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },
    TASKS: {
        LIST: '/tasks',
        CREATE: '/tasks',
        GET: (id) => `/tasks/${id}`,
        UPDATE: (id) => `/tasks/${id}`,
        DELETE: (id) => `/tasks/${id}`,
        COMPLETE: (id) => `/tasks/${id}/complete`,
    },
    MESSAGES: {
        LIST: '/messages',
        CREATE: '/messages',
        GET: (id) => `/messages/${id}`,
    },
    PROPERTIES: {
        LIST: '/properties',
        GET: (id) => `/properties/${id}`,
        RENT_ROLL: (id) => `/properties/${id}/rent-roll`,
        UPLOAD_RENT_ROLL: (id) => `/properties/${id}/rent-roll/upload`,
    },
    FILES: {
        UPLOAD: '/files/upload',
        GET: (id) => `/files/${id}`,
        DELETE: (id) => `/files/${id}`,
    },
    INGEST: {
        ACTIVITY: '/ingest/activity',
        EVENTS: '/ingest/events',
    },
    VENDOR: {
        BID_REQUESTS: '/vendor/bid-requests',
        BIDS: '/vendor/bids',
        SUBMIT_BID: '/vendor/bids/submit',
    },
    AP: {
        INVOICES: '/ap/invoices',
        UPLOAD: '/ap/invoices/upload',
        APPROVE: (id) => `/ap/invoices/${id}/approve`,
        REJECT: (id) => `/ap/invoices/${id}/reject`,
    },
};
export const WEBSOCKET_EVENTS = {
    // Connection
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    HEARTBEAT: 'heartbeat',
    HEARTBEAT_ACK: 'heartbeat_ack',
    // Channels
    JOIN_CHANNEL: 'join_channel',
    LEAVE_CHANNEL: 'leave_channel',
    CHANNEL_JOINED: 'channel_joined',
    CHANNEL_LEFT: 'channel_left',
    // Typing
    TYPING_START: 'typing_start',
    TYPING_STOP: 'typing_stop',
    USER_TYPING: 'user_typing',
    USER_STOPPED_TYPING: 'user_stopped_typing',
    // Tasks
    TASK_CREATED: 'task_created',
    TASK_UPDATED: 'task_updated',
    TASK_COMPLETED: 'task_completed',
    // Messages
    MESSAGE_CREATED: 'message_created',
    // Notifications
    NOTIFICATION: 'notification',
    NOTIFICATION_READ: 'notification_read',
    // Presence
    USER_PRESENCE_UPDATED: 'user_presence_updated',
    // Property Events
    RENT_ROLL_ANOMALY: 'rent_roll_anomaly',
    COMPETITOR_ALERT: 'competitor_alert',
    // System
    SYSTEM_MAINTENANCE: 'system_maintenance',
    ERROR: 'error',
};
export const NOTIFICATION_TYPES = {
    TASK_ASSIGNED: 'TASK_ASSIGNED',
    TASK_DUE: 'TASK_DUE',
    TASK_OVERDUE: 'TASK_OVERDUE',
    MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
    RENT_ANOMALY: 'RENT_ANOMALY',
    COMPETITOR_ALERT: 'COMPETITOR_ALERT',
    BID_INVITATION: 'BID_INVITATION',
    BID_SUBMITTED: 'BID_SUBMITTED',
    BID_AWARDED: 'BID_AWARDED',
    BID_REJECTED: 'BID_REJECTED',
    INVOICE_APPROVAL_REQUIRED: 'INVOICE_APPROVAL_REQUIRED',
    INVOICE_APPROVED: 'INVOICE_APPROVED',
    INVOICE_REJECTED: 'INVOICE_REJECTED',
    SYSTEM_ALERT: 'SYSTEM_ALERT',
};
export const FILE_TYPES = {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    SPREADSHEETS: [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
};
export const MAX_FILE_SIZE = {
    IMAGE: 10 * 1024 * 1024, // 10MB
    DOCUMENT: 50 * 1024 * 1024, // 50MB
    SPREADSHEET: 25 * 1024 * 1024, // 25MB
};
export const CACHE_KEYS = {
    USER: (id) => `user:${id}`,
    PROPERTY: (id) => `property:${id}`,
    TASKS: (channelId) => `tasks:${channelId}`,
    RENT_ROLL: (propertyId, date) => `rentroll:${propertyId}:${date}`,
    COMPETITOR_DATA: (propertyId) => `competitor:${propertyId}`,
};
export const CACHE_TTL = {
    SHORT: 5 * 60, // 5 minutes
    MEDIUM: 30 * 60, // 30 minutes
    LONG: 2 * 60 * 60, // 2 hours
    VERY_LONG: 24 * 60 * 60, // 24 hours
};
export const RATE_LIMITS = {
    API: {
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        MAX_REQUESTS: 1000,
    },
    AUTH: {
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        MAX_REQUESTS: 5,
    },
    UPLOAD: {
        WINDOW_MS: 60 * 1000, // 1 minute
        MAX_REQUESTS: 10,
    },
};
export const EXTENSION_CONFIG = {
    SUPPORTED_SITES: [
        'yardi.com',
        'realpage.com',
        'entrata.com',
        'appfolio.com',
    ],
    DEFAULT_THROTTLE_MS: 1000,
    MAX_EVENTS_PER_BATCH: 50,
    SYNC_INTERVAL_MS: 15000,
    HEARTBEAT_INTERVAL_MS: 30000,
};
export const AI_CONFIG = {
    MAX_TOKENS: 4000,
    TEMPERATURE: 0.7,
    MODEL: 'gpt-4',
    VISION_MODEL: 'gpt-4-vision-preview',
    WHISPER_MODEL: 'whisper-1',
};
export const COMPETITOR_CONFIG = {
    SCRAPE_INTERVAL_HOURS: 24,
    MAX_PAGES_PER_SITE: 10,
    REQUEST_DELAY_MS: 2000,
    PRICE_CHANGE_THRESHOLD: 0.05, // 5%
};
//# sourceMappingURL=constants.js.map