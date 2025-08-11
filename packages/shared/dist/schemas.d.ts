import { z } from 'zod';
import { TaskStatus, Priority } from './types';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    companyId: z.ZodString;
    status: z.ZodEnum<["ACTIVE", "INACTIVE"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    id: string;
    displayName: string;
    companyId: string;
    status: "ACTIVE" | "INACTIVE";
    avatar?: string | undefined;
}, {
    email: string;
    id: string;
    displayName: string;
    companyId: string;
    status: "ACTIVE" | "INACTIVE";
    avatar?: string | undefined;
}>;
export declare const CreateTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    channelId: z.ZodString;
    assigneeId: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodNativeEnum<typeof Priority>>;
    dueAt: z.ZodOptional<z.ZodDate>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    channelId: string;
    priority: Priority;
    tags: string[];
    description?: string | undefined;
    assigneeId?: string | undefined;
    dueAt?: Date | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    title: string;
    channelId: string;
    description?: string | undefined;
    assigneeId?: string | undefined;
    priority?: Priority | undefined;
    dueAt?: Date | undefined;
    tags?: string[] | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export declare const UpdateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof TaskStatus>>;
    priority: z.ZodOptional<z.ZodNativeEnum<typeof Priority>>;
    assigneeId: z.ZodOptional<z.ZodString>;
    dueAt: z.ZodOptional<z.ZodDate>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    status?: TaskStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    assigneeId?: string | undefined;
    priority?: Priority | undefined;
    dueAt?: Date | undefined;
    tags?: string[] | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    status?: TaskStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    assigneeId?: string | undefined;
    priority?: Priority | undefined;
    dueAt?: Date | undefined;
    tags?: string[] | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export declare const CreateMessageSchema: z.ZodObject<{
    content: z.ZodString;
    channelId: z.ZodOptional<z.ZodString>;
    taskId: z.ZodOptional<z.ZodString>;
    attachments: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    attachments: string[];
    channelId?: string | undefined;
    taskId?: string | undefined;
}, {
    content: string;
    channelId?: string | undefined;
    taskId?: string | undefined;
    attachments?: string[] | undefined;
}>;
export declare const RentRollUnitSchema: z.ZodObject<{
    unit_id: z.ZodString;
    unit_label: z.ZodString;
    bedrooms: z.ZodNumber;
    bathrooms: z.ZodNumber;
    sqft: z.ZodNumber;
    tenant_name_masked: z.ZodOptional<z.ZodString>;
    lease_start: z.ZodOptional<z.ZodDate>;
    lease_end: z.ZodOptional<z.ZodDate>;
    market_rent: z.ZodNumber;
    actual_rent: z.ZodNumber;
    balance: z.ZodNumber;
    status: z.ZodEnum<["occupied", "vacant", "notice", "unknown"]>;
    delinquency_bucket: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "occupied" | "vacant" | "notice" | "unknown";
    unit_id: string;
    unit_label: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    market_rent: number;
    actual_rent: number;
    balance: number;
    delinquency_bucket: string;
    tenant_name_masked?: string | undefined;
    lease_start?: Date | undefined;
    lease_end?: Date | undefined;
}, {
    status: "occupied" | "vacant" | "notice" | "unknown";
    unit_id: string;
    unit_label: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    market_rent: number;
    actual_rent: number;
    balance: number;
    delinquency_bucket: string;
    tenant_name_masked?: string | undefined;
    lease_start?: Date | undefined;
    lease_end?: Date | undefined;
}>;
export declare const ActivityEventSchema: z.ZodObject<{
    userId: z.ZodString;
    context: z.ZodRecord<z.ZodString, z.ZodAny>;
    action: z.ZodString;
    duration: z.ZodOptional<z.ZodNumber>;
    success: z.ZodDefault<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    context: Record<string, any>;
    action: string;
    success: boolean;
    metadata?: Record<string, any> | undefined;
    duration?: number | undefined;
}, {
    userId: string;
    context: Record<string, any>;
    action: string;
    metadata?: Record<string, any> | undefined;
    duration?: number | undefined;
    success?: boolean | undefined;
}>;
export declare const NotificationSchema: z.ZodObject<{
    userId: z.ZodString;
    type: z.ZodString;
    title: z.ZodString;
    message: z.ZodString;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["LOW", "MEDIUM", "HIGH", "CRITICAL"]>>;
    channels: z.ZodOptional<z.ZodArray<z.ZodEnum<["push", "email", "sms"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: string;
    title: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    userId: string;
    data?: Record<string, any> | undefined;
    channels?: ("push" | "email" | "sms")[] | undefined;
}, {
    message: string;
    type: string;
    title: string;
    userId: string;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | undefined;
    data?: Record<string, any> | undefined;
    channels?: ("push" | "email" | "sms")[] | undefined;
}>;
export declare const BidRequestSchema: z.ZodObject<{
    taskId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    scope: z.ZodString;
    requirements: z.ZodArray<z.ZodString, "many">;
    dueDate: z.ZodDate;
    budget: z.ZodOptional<z.ZodNumber>;
    propertyId: z.ZodString;
    categoryId: z.ZodString;
    attachments: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    taskId: string;
    attachments: string[];
    scope: string;
    requirements: string[];
    dueDate: Date;
    propertyId: string;
    categoryId: string;
    budget?: number | undefined;
}, {
    title: string;
    description: string;
    taskId: string;
    scope: string;
    requirements: string[];
    dueDate: Date;
    propertyId: string;
    categoryId: string;
    attachments?: string[] | undefined;
    budget?: number | undefined;
}>;
export declare const BidSubmissionSchema: z.ZodObject<{
    bidRequestId: z.ZodString;
    vendorId: z.ZodString;
    amount: z.ZodNumber;
    timeline: z.ZodString;
    proposal: z.ZodString;
    attachments: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    warranty: z.ZodOptional<z.ZodString>;
    insurance: z.ZodOptional<z.ZodObject<{
        liability: z.ZodNumber;
        workersComp: z.ZodBoolean;
        bondRequired: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        liability: number;
        workersComp: boolean;
        bondRequired: boolean;
    }, {
        liability: number;
        workersComp: boolean;
        bondRequired: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    attachments: string[];
    bidRequestId: string;
    vendorId: string;
    amount: number;
    timeline: string;
    proposal: string;
    warranty?: string | undefined;
    insurance?: {
        liability: number;
        workersComp: boolean;
        bondRequired: boolean;
    } | undefined;
}, {
    bidRequestId: string;
    vendorId: string;
    amount: number;
    timeline: string;
    proposal: string;
    attachments?: string[] | undefined;
    warranty?: string | undefined;
    insurance?: {
        liability: number;
        workersComp: boolean;
        bondRequired: boolean;
    } | undefined;
}>;
export declare const ExtensionConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    piiWhitelist: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    throttleMs: z.ZodDefault<z.ZodNumber>;
    siteConfigs: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        enabled: z.ZodBoolean;
        selectors: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        selectors: Record<string, any>;
    }, {
        enabled: boolean;
        selectors: Record<string, any>;
    }>>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    piiWhitelist: string[];
    throttleMs: number;
    siteConfigs: Record<string, {
        enabled: boolean;
        selectors: Record<string, any>;
    }>;
}, {
    enabled?: boolean | undefined;
    piiWhitelist?: string[] | undefined;
    throttleMs?: number | undefined;
    siteConfigs?: Record<string, {
        enabled: boolean;
        selectors: Record<string, any>;
    }> | undefined;
}>;
export declare const ExtensionEventSchema: z.ZodObject<{
    type: z.ZodString;
    action: z.ZodString;
    context: z.ZodRecord<z.ZodString, z.ZodAny>;
    duration: z.ZodOptional<z.ZodNumber>;
    success: z.ZodDefault<z.ZodBoolean>;
    timestamp: z.ZodNumber;
    tabId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: string;
    context: Record<string, any>;
    action: string;
    success: boolean;
    timestamp: number;
    duration?: number | undefined;
    tabId?: number | undefined;
}, {
    type: string;
    context: Record<string, any>;
    action: string;
    timestamp: number;
    duration?: number | undefined;
    success?: boolean | undefined;
    tabId?: number | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map