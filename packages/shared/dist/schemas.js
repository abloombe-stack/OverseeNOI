import { z } from 'zod';
import { TaskStatus, Priority } from './types';
export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    displayName: z.string().min(1),
    avatar: z.string().url().optional(),
    companyId: z.string(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
});
export const CreateTaskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().optional(),
    channelId: z.string(),
    assigneeId: z.string().optional(),
    priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
    dueAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    metadata: z.record(z.any()).optional(),
});
export const UpdateTaskSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(Priority).optional(),
    assigneeId: z.string().optional(),
    dueAt: z.date().optional(),
    tags: z.array(z.string()).optional(),
    metadata: z.record(z.any()).optional(),
});
export const CreateMessageSchema = z.object({
    content: z.string().min(1),
    channelId: z.string().optional(),
    taskId: z.string().optional(),
    attachments: z.array(z.string()).default([]),
});
export const RentRollUnitSchema = z.object({
    unit_id: z.string(),
    unit_label: z.string(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(0),
    sqft: z.number().int().min(0),
    tenant_name_masked: z.string().optional(),
    lease_start: z.date().optional(),
    lease_end: z.date().optional(),
    market_rent: z.number().min(0),
    actual_rent: z.number().min(0),
    balance: z.number(),
    status: z.enum(['occupied', 'vacant', 'notice', 'unknown']),
    delinquency_bucket: z.string(),
});
export const ActivityEventSchema = z.object({
    userId: z.string(),
    context: z.record(z.any()),
    action: z.string(),
    duration: z.number().int().min(0).optional(),
    success: z.boolean().default(true),
    metadata: z.record(z.any()).optional(),
});
export const NotificationSchema = z.object({
    userId: z.string(),
    type: z.string(),
    title: z.string().min(1),
    message: z.string().min(1),
    data: z.record(z.any()).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
    channels: z.array(z.enum(['push', 'email', 'sms'])).optional(),
});
export const BidRequestSchema = z.object({
    taskId: z.string(),
    title: z.string().min(1),
    description: z.string(),
    scope: z.string(),
    requirements: z.array(z.string()),
    dueDate: z.date(),
    budget: z.number().min(0).optional(),
    propertyId: z.string(),
    categoryId: z.string(),
    attachments: z.array(z.string()).default([]),
});
export const BidSubmissionSchema = z.object({
    bidRequestId: z.string(),
    vendorId: z.string(),
    amount: z.number().min(0),
    timeline: z.string(),
    proposal: z.string(),
    attachments: z.array(z.string()).default([]),
    warranty: z.string().optional(),
    insurance: z.object({
        liability: z.number().min(0),
        workersComp: z.boolean(),
        bondRequired: z.boolean(),
    }).optional(),
});
// Extension schemas
export const ExtensionConfigSchema = z.object({
    enabled: z.boolean().default(false),
    piiWhitelist: z.array(z.string()).default([]),
    throttleMs: z.number().int().min(100).default(1000),
    siteConfigs: z.record(z.object({
        enabled: z.boolean(),
        selectors: z.record(z.any()),
    })).default({}),
});
export const ExtensionEventSchema = z.object({
    type: z.string(),
    action: z.string(),
    context: z.record(z.any()),
    duration: z.number().int().min(0).optional(),
    success: z.boolean().default(true),
    timestamp: z.number().int(),
    tabId: z.number().int().optional(),
});
//# sourceMappingURL=schemas.js.map