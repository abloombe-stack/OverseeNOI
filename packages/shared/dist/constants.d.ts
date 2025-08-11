export declare const API_ROUTES: {
    readonly AUTH: {
        readonly LOGIN: "/auth/login";
        readonly LOGOUT: "/auth/logout";
        readonly REFRESH: "/auth/refresh";
        readonly ME: "/auth/me";
    };
    readonly TASKS: {
        readonly LIST: "/tasks";
        readonly CREATE: "/tasks";
        readonly GET: (id: string) => string;
        readonly UPDATE: (id: string) => string;
        readonly DELETE: (id: string) => string;
        readonly COMPLETE: (id: string) => string;
    };
    readonly MESSAGES: {
        readonly LIST: "/messages";
        readonly CREATE: "/messages";
        readonly GET: (id: string) => string;
    };
    readonly PROPERTIES: {
        readonly LIST: "/properties";
        readonly GET: (id: string) => string;
        readonly RENT_ROLL: (id: string) => string;
        readonly UPLOAD_RENT_ROLL: (id: string) => string;
    };
    readonly FILES: {
        readonly UPLOAD: "/files/upload";
        readonly GET: (id: string) => string;
        readonly DELETE: (id: string) => string;
    };
    readonly INGEST: {
        readonly ACTIVITY: "/ingest/activity";
        readonly EVENTS: "/ingest/events";
    };
    readonly VENDOR: {
        readonly BID_REQUESTS: "/vendor/bid-requests";
        readonly BIDS: "/vendor/bids";
        readonly SUBMIT_BID: "/vendor/bids/submit";
    };
    readonly AP: {
        readonly INVOICES: "/ap/invoices";
        readonly UPLOAD: "/ap/invoices/upload";
        readonly APPROVE: (id: string) => string;
        readonly REJECT: (id: string) => string;
    };
};
export declare const WEBSOCKET_EVENTS: {
    readonly CONNECT: "connect";
    readonly DISCONNECT: "disconnect";
    readonly HEARTBEAT: "heartbeat";
    readonly HEARTBEAT_ACK: "heartbeat_ack";
    readonly JOIN_CHANNEL: "join_channel";
    readonly LEAVE_CHANNEL: "leave_channel";
    readonly CHANNEL_JOINED: "channel_joined";
    readonly CHANNEL_LEFT: "channel_left";
    readonly TYPING_START: "typing_start";
    readonly TYPING_STOP: "typing_stop";
    readonly USER_TYPING: "user_typing";
    readonly USER_STOPPED_TYPING: "user_stopped_typing";
    readonly TASK_CREATED: "task_created";
    readonly TASK_UPDATED: "task_updated";
    readonly TASK_COMPLETED: "task_completed";
    readonly MESSAGE_CREATED: "message_created";
    readonly NOTIFICATION: "notification";
    readonly NOTIFICATION_READ: "notification_read";
    readonly USER_PRESENCE_UPDATED: "user_presence_updated";
    readonly RENT_ROLL_ANOMALY: "rent_roll_anomaly";
    readonly COMPETITOR_ALERT: "competitor_alert";
    readonly SYSTEM_MAINTENANCE: "system_maintenance";
    readonly ERROR: "error";
};
export declare const NOTIFICATION_TYPES: {
    readonly TASK_ASSIGNED: "TASK_ASSIGNED";
    readonly TASK_DUE: "TASK_DUE";
    readonly TASK_OVERDUE: "TASK_OVERDUE";
    readonly MESSAGE_RECEIVED: "MESSAGE_RECEIVED";
    readonly RENT_ANOMALY: "RENT_ANOMALY";
    readonly COMPETITOR_ALERT: "COMPETITOR_ALERT";
    readonly BID_INVITATION: "BID_INVITATION";
    readonly BID_SUBMITTED: "BID_SUBMITTED";
    readonly BID_AWARDED: "BID_AWARDED";
    readonly BID_REJECTED: "BID_REJECTED";
    readonly INVOICE_APPROVAL_REQUIRED: "INVOICE_APPROVAL_REQUIRED";
    readonly INVOICE_APPROVED: "INVOICE_APPROVED";
    readonly INVOICE_REJECTED: "INVOICE_REJECTED";
    readonly SYSTEM_ALERT: "SYSTEM_ALERT";
};
export declare const FILE_TYPES: {
    readonly IMAGES: readonly ["image/jpeg", "image/png", "image/gif", "image/webp"];
    readonly DOCUMENTS: readonly ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    readonly SPREADSHEETS: readonly ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
};
export declare const MAX_FILE_SIZE: {
    readonly IMAGE: number;
    readonly DOCUMENT: number;
    readonly SPREADSHEET: number;
};
export declare const CACHE_KEYS: {
    readonly USER: (id: string) => string;
    readonly PROPERTY: (id: string) => string;
    readonly TASKS: (channelId: string) => string;
    readonly RENT_ROLL: (propertyId: string, date: string) => string;
    readonly COMPETITOR_DATA: (propertyId: string) => string;
};
export declare const CACHE_TTL: {
    readonly SHORT: number;
    readonly MEDIUM: number;
    readonly LONG: number;
    readonly VERY_LONG: number;
};
export declare const RATE_LIMITS: {
    readonly API: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 1000;
    };
    readonly AUTH: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    readonly UPLOAD: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
};
export declare const EXTENSION_CONFIG: {
    readonly SUPPORTED_SITES: readonly ["yardi.com", "realpage.com", "entrata.com", "appfolio.com"];
    readonly DEFAULT_THROTTLE_MS: 1000;
    readonly MAX_EVENTS_PER_BATCH: 50;
    readonly SYNC_INTERVAL_MS: 15000;
    readonly HEARTBEAT_INTERVAL_MS: 30000;
};
export declare const AI_CONFIG: {
    readonly MAX_TOKENS: 4000;
    readonly TEMPERATURE: 0.7;
    readonly MODEL: "gpt-4";
    readonly VISION_MODEL: "gpt-4-vision-preview";
    readonly WHISPER_MODEL: "whisper-1";
};
export declare const COMPETITOR_CONFIG: {
    readonly SCRAPE_INTERVAL_HOURS: 24;
    readonly MAX_PAGES_PER_SITE: 10;
    readonly REQUEST_DELAY_MS: 2000;
    readonly PRICE_CHANGE_THRESHOLD: 0.05;
};
//# sourceMappingURL=constants.d.ts.map